$.fn.extend({
	// 可重复调用
	pagination : function(opt) {
		var $container = this,
		opt = $.extend(true, {
			type : 'get',
			data : {
				pageSize : 10,
				currentPage : 1
			},
			// 默认是分页
			pagination : true,
			// 默认不支持row单击事件
			rowClick : false,
			// 每次点击.page-button触发
			beforeChangePage : $.noop,
			callback : $.noop
		}, opt),
		pagination = opt.pagination,
		rowClick = opt.rowClick,
		beforeChangePage = opt.beforeChangePage;
		
		$container.empty();
		
		generatePaginationBody();
		
		/**
		 * columns
		 * [
		 * 		{
		 * 			id : '',
		 * 			className : 'xxx',
		 * 			title : 'xxx',
		 * 			render : function(row, value) {
		 * 				return value;
		 * 			},
		 * 			checkbox : false,
		 * 			radio : false,
		 * 			width : '5% | 5px'
		 * 		}
		 * ]
		 */
		function generatePaginationBody() {
			var html = '<div class="page-bar">'
						+ '<div class="page-body">'
							+ '<div class="page-body-head-row">',
			columns = opt.columns || [];
			
			for(var i = 0, length = columns.length; i < length; i++) {
				var cell = columns[i],
				checkbox = cell.checkbox,
				radio = cell.radio,
				id = cell.id,
				className = cell.className || '',
				width = cell.width;
				
				// checkbox为主
				if(checkbox) {
					html += '<div class="page-head-cell page-cell ' + (className) + '" ' + (width ? 'style="width:' + width + '"' : '') + '>'
							+ '<input class="item-checkbox" type="checkbox" />'
						+ '</div>';
				} else {
					html += '<div class="page-head-cell page-cell ' + (className) + '" ' + (width ? 'style="width:' + width + '"' : '') + '>'
							+ (cell.title || '')
						+ '</div>';
				}
			}
			
			html += 			'</div>'
							+ '<div class="page-body-content"></div>'
						+ '</div>'
						+ '<div class="page-loading hide" data-msg="数据加载中"></div>'
						+ '<div class="page-tip hide"></div>'
						+ '<div class="mt10 clearfix page-footer"></div>'
					+ '</div>';
			
			$container.html(html);
			
			$container.off('click', '.page-button');
			$container.on('click', '.page-button', function() {
				var $this = $(this),
				index = $this.attr('data-index');
				if ($this.hasClass('active')) {
					return false;
				}
				beforeChangePage(index);
				load(index);
			});
		}
		
		function renderData(list) {
			var columns = opt.columns || [];
			$pageBodyContent = $container.find('.page-body-content');
			html = '';
			
			// 创建table
			for(i = 0, length = list.length; i < length; i++) {
				var item = list[i];
				html += '<div class="page-body-content-row">'
				for(var m = 0, len = columns.length; m < len; m++) {
					var cell = columns[m],
					id = cell.id,
					render = cell.render,
					className = cell.className || '',
					width = cell.width,
					flag = false,
					fragment;
					
					if(cell.checkbox) {
						// checkbox优先
						fragment = '<input class="item-checkbox" type="checkbox" value="' + (item[id] || '') + '" />';
					} else if (cell.radio) {
						// radio次之
						fragment = '<input type="radio" />';
					} else if(typeof render === 'function') {
						// function第三
						fragment = render(item, item[id] || '', i + 1);
					} else {
						// 最后才是通过id解析
						fragment = item[id] || '';
						flag = true;
					}
					
					html += '<div class="page-content-cell page-cell ' + (className) + '" ' + (width ? 'style="width:' + width + '"' : '') + (flag ? 'title="' + fragment + '"' : '') + '>'
							+ fragment
						+ '</div>';
				}
				html += '</div>';
			}
			
			$pageBodyContent.html(html || '');
			if(html) {
				$container.find('.page-tip').addClass('hide');
			} else {
				$container.find('.page-tip').removeClass('hide');
			}
		}
		
		function generatePaginationBar(data) {
			var page = data.data,
			totalPage = page.totalPage,
			totalCount = page.totalCount,
			currentPage = page.currentPage,
			html = '';
			
			// 没有数据 不显示
			if(!totalCount) {
				html = '';
			} else {
				html = generateButtons(data);
			}
			
			$container.find('.page-footer').html(html);
		}
		
		// 显示5个按钮
		function generateButtons(data) {
			var page = data.data,
			totalPage = page.totalPage,
			currentPage = page.currentPage,
			totalCount = page.totalCount,
			pageSize = page.pageSize,
			html = '<div class="pull-left">';
			
			if(totalPage <= 7) {
				for(var i = 1, length = totalPage; i <= length; i++) {
					if(currentPage == i) {
						html += '<button class="page-button active">' + i + '</button>';
					} else {
						html += '<button class="page-button" data-index="' + i + '">' + i + '</button>';
					}
				}
			} else {
				// 前后...
				var before = false,
				after = false;
				for(var i = 1, length = totalPage; i <= length; i++) {
					if([1, 2, 3, totalPage - 2, totalPage - 1, totalPage].indexOf(i) != -1) {
						if(currentPage == i) {
							html += '<button class="page-button active">' + i + '</button>';
						} else {
							html += '<button class="page-button" data-index="' + i + '">' + i + '</button>';
						}
					} else {
						var diff = i - currentPage;
						
						if(!diff) {
							html += '<button class="page-button active">' + i + '</button>';
							continue;
						}
						
						if(diff == -1) {
							html += '<button class="page-button" data-index="' + i + '">' + i + '</button>';
							continue;
						} else if (diff == 1) {
							html += '<button class="page-button" data-index="' + i + '">' + i + '</button>';
							continue;
						}
						
						if(diff < -1) {
							if(before) {
								continue;
							}
							html += '<button class="page-button disabled">...</button>';
							before = true;
						} else if (diff > 1) {
							if(after) {
								continue;
							}
							html += '<button class="page-button disabled">...</button>';
							after = true;
						}
					}
				}
			}
			
			html += '</div>' 	
					+ '<div class="pull-right pagination-description">'
						+ '共' + totalCount + '条数据，每页显示' + pageSize + '条数据'
					+ '</div>';
			
			return html;
		}
		
		function load(currentPage) {
			if(currentPage) {
				opt.data.currentPage = currentPage;
			} else {
				opt.data.currentPage = 1;
			}
			$.ajax({
				url : opt.url,
				data : opt.data,
				type : opt.type,
				beforeSend : function() {
					$container.find('.page-tip').addClass('hide');
					$container.find('.page-loading').removeClass('hide');
				},
				success : function(data) {
					$container.find('.page-loading').addClass('hide');
					// 分页
					if (pagination) {
						renderData(data.data.list || []);
						generatePaginationBar(data);
					} else {
						// list
						renderData(data.data);
					}
					// 执行回调
					opt.callback(data.data);
				},
				error : function() {
					$container.find('.page-loading').addClass('hide');
				}
			});
		}
		
		// checkbox全选事件
		$container.off('click', '.page-head-cell input[type="checkbox"]')
			.on('click', '.page-head-cell input[type="checkbox"]', function() {
				var $checkbox = $(this),
				$otherCheckboxs = $container.find('.page-content-cell input[type="checkbox"]');
				
				if($checkbox.prop('checked')) {
					$otherCheckboxs.prop('checked', true).closest('.page-body-content-row').addClass('active');
				} else {
					$otherCheckboxs.prop('checked', false).closest('.page-body-content-row').removeClass('active');
				}
		});
		
		$container.off('click', '.page-content-cell input[type="checkbox"]')
			.on('click', '.page-content-cell input[type="checkbox"]', function() {
				var $checkboxs = $container.find('.page-content-cell input[type="checkbox"]:checked'),
				$topCheckbox = $container.find('.page-head-cell input[type="checkbox"]'),
				$this = $(this);
				
				if ($this.prop('checked')) {
					$this.closest('.page-body-content-row').addClass('active');
				} else {
					$this.closest('.page-body-content-row').removeClass('active');
				}
				
				if(!$checkboxs.length) {
					$topCheckbox.prop('checked', false);
				}
		});
		
		// 是否支持点击.page-body-content-row
		if (rowClick) {
			$container.off('click', '.page-body-content-row').on('click', '.page-body-content-row', function(e) {
				var $target = $(e.target),
				$this = $(this);
				// 事件源不是checkbox
				if (!$target.hasClass('item-checkbox')) {
					var $checkbox = $this.find('.item-checkbox');
					if ($checkbox.prop('checked')) {
						$this.removeClass('active');
						$checkbox.prop('checked', false);
					} else {
						$this.addClass('active');
						$checkbox.prop('checked', true);
					}
				}
			});
		}
		
		$container.unbind('reload').bind('reload', function(e, param) {
			param = param || {};
			opt.data = $.extend(true, opt.data, param);
			load();
		});
		
		$container.bind('clear', function() {
			$container.empty();
		});
		
		load();
		
	}
});