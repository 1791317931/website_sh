$(function() {
	
	var $productList = $('.product-list'),
	$checkAll = $('.check-all'),
	$total = $('.total');
	
	function loadList() {
		$checkAll.prop('checked', false);
		$.ajax({
			url : base_url + 'shopcar/list/byUserId',
			success : function(result) {
				var html = '',
				list = result.data || [];
				
				for(var i = 0, length = list.length; i < length; i++) {
					var product = list[i],
					imgUrls = product.imgUrls || [],
					id = product.id;
					html += '<div class="table-row cg">'
							+ '<div class="w30 table-cell">'
								+ '<input type="checkbox" value="' + id + '" />'
							+ '</div>'
							+ '<div class="table-cell w250 pb5 f13">'
								+ '<a href="' + base_url + 'product/user/detail?id=' + id + '" target="_blank">'
									+ '<p class="product-name text-left p5">' + product.name + '</p>'
									+ '<img class="w220 h120" src="' + base_img + imgUrls[0] + '" />'
								+ '</a>'
							+ '</div>'
							+ '<div class="table-cell p10 text-break f13">'
								+ (product.description || '暂无描述')
							+ '</div>'
							+ '<div class="table-cell w130 cr product_price">' + product.price + '</div>'
							+ '<div class="table-cell w130">'
								+ '<div class="table w110 margin-auto">'
									+ '<div class="table-cell sub w20 btns">-</div>'
									+ '<div class="table-cell">'
										+ '<input class="product_count" type="text" value="' + product.count + '" />'
									+ '</div>'
									+ '<div class="table-cell add w20 btns">+</div>'
								+ '</div>' 
							+ '</div>'
							+ '<div class="table-cell w130 product_sum">' + (product.count * product.price) + '</div>'
							+ '<div class="table-cell w100">'
								+ '<span class="for-edit">删除</span>'
							+ '</div>'
						+ '</div>';
				}
				$productList.html(html);
				sum();
			}
		});
	}
	
	function sum() {
		var sum = 0;
		$productList.find('.table-row').each(function(index, row) {
			var $row = $(row);
			sum += $.trim($row.find('.product_price').html()) * $row.find('.product_count').val();
		});
		$total.html(sum);
	}
	
	(function() {
		loadList();
	})();
	
	(function() {
		var reg = /^[1-9]\d*/,
		MAX_VALUE = 9999,
		$deleteShopcar = $('#delete-shopcar');
		
		$checkAll.bind('click', function() {
			$productList.find('input[type="checkbox"]').prop('checked', $(this).prop('checked'));
		});
		
		function renderRow($row) {
			$row.find('.product_sum').html($.trim($row.find('.product_price').html()) * $row.find('.product_count').val());
		}
		
		$productList.on('blur', '.product_count', function() {
			var $input = $(this),
			value = $.trim($input.val());
			
			if (!reg.test(value)) {
				value = 1;
			}
			if (parseInt(value) > MAX_VALUE) {
				value = MAX_VALUE;
			}
			$input.val(value);
			renderRow($input.closest('.table-row'));
			sum();
		});
		
		$productList.on('click', '.sub', function() {
			var $input = $(this).closest('.table').find('.product_count'),
			value = $.trim($input.val());
			
			if (isNaN(value) || value < 2) {
				value = 1;
			} else {
				value = value - 1;
			}
			$input.val(value);
			renderRow($input.closest('.table-row'));
			sum();
		});
		
		$productList.on('click', '.add', function() {
			var $input = $(this).closest('.table').find('.product_count'),
			value = parseInt($.trim($input.val()));
			
			value = value + 1;
			if (value > MAX_VALUE) {
				value = MAX_VALUE;
			}
			$input.val(value);
			renderRow($input.closest('.table-row'));
			sum();
		});
		
		$deleteShopcar.bind('click', function() {
			var $checkboxs = $productList.find('input[type="checkbox"]:checked'),
			length = $checkboxs.length;
			if (!length) {
				ZUtil.error('请至少选择一个选项');
			} else {
				var arr = [];
				for (var i = 0; i < length; i++) {
					arr.push($checkboxs.eq(i).val());
				}
				
				$.ajax({
					url : base_url + 'shopcar/delete/byIds',
					data : {
						ids : arr
					},
					type : 'post',
					beforeSend : function() {
						$deleteShopcar.addClass('no-drop');
					},
					complete : function() {
						$deleteShopcar.removeClass('no-drop');
					},
					success : function(result) {
						ZUtil.success('数据删除成功');
						loadList();
					}
				});
			}
		});
		
	})();
	
});