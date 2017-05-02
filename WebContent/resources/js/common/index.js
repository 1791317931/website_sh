(function() {
	window.base_img = '/sharedisk/img/';
	window.base_file = '/sharedisk/file/';
	
	var ZUtil = {
		v : '0.0.3',
		/**
		 * 函数由start --> to，默认500ms
		 * @param start		初始值
		 * @param to		最终值
		 * @param callback
		 * @param time
		 */
		animationTo : function(start, to, callback, time) {
			// 默认500ms
			time = time || 500;
			var distance = Math.abs(to - start),
			unit = distance / time * 16,
			number = 0;
			requestAnimationFrame(function() {
				if(number < distance) {
					number += unit;
					if(number > distance) {
						number = distance;
					}
					callback(start - number);
					requestAnimationFrame(arguments.callee);
				}
			});
		},
		// 提示错误信息
		error : function(msg) {
			var _this = this,
			v = _this.getVersion(),
			$errorModal = $('.z-error-modal[data-version="' + v + '"]');
			if(!$errorModal.length) {
				// 偏移量
				var distance = 15 * Math.sqrt(2),
				// 中心点(200, 45)
				left = 200 - distance,
				right = 200 + distance,
				top = 45 - distance,
				bottom = 45 + distance;
				var html = '<div class="z-modal hide z-error-modal z-tip-modal pointer" data-version="' + v + '">'
							+ '<div class="z-modal-body">'
								+ '<div class="empty msg-body" data-empty="' + (msg || '操作失败') + '"></div>'
								+ '<svg>'
									+ '<circle r="30" cx="200" cy="45" fill="none" stroke-width="2" stroke="#ff7d00" />'
									+ '<line class="line1" x1="' + left + '" y1="' + bottom + '" x2="' + right + '" y2="' + top + '" />'
									+ '<line class="line2" x1="' + right + '" y1="' + bottom + '" x2="' + left + '" y2="' + top + '" />'
								+ '</svg>'
								+ '<div class="center mt10">'
									+ '<button class="z-close">确定</button>'
								+ '<div>'
							+ '</div>'
						+ '</div>',
				$body = $(document.body);
				$body.append(html);
				$errorModal = $('.z-error-modal[data-version="' + v + '"]');
				var $circle = $errorModal.find('circle'),
				circumference = Math.PI * 2 * 40,
				$line1 = $errorModal.find('.line1'),
				$line2 = $errorModal.find('.line2'),
				// line长度	直径
				diameter = 80,
				$close = $errorModal.find('.z-close');
				
				// TODO message-tip.css也要放开注释代码
				/*$circle.css({
					'stroke-dasharray' : circumference,
					'stroke-dashoffset' : circumference
				});*/
				
				$errorModal.ToggleModal(function() {
					_this.animationTo(circumference, 0, function(strokeDashOffset) {
						$circle.css({
							'stroke-dashoffset' : strokeDashOffset
						});
					});
					_this.animationTo(diameter, 0, function(strokeDashOffset) {
						$line1.css({
							'stroke-dashoffset' : strokeDashOffset
						});
					});
					_this.animationTo(diameter, 0, function(strokeDashOffset) {
						$line2.css({
							'stroke-dashoffset' : strokeDashOffset
						});
					});
				}, function() {
					$circle.css({
						'stroke-dashoffset' : circumference
					});
					$line1.css({
						'stroke-dashoffset' : diameter
					});
					$line2.css({
						'stroke-dashoffset' : diameter
					});
				}, false);
				
				$close.bind('click', function() {
					$errorModal.trigger('hide');
				});
			}
			$errorModal.find('.msg-body').attr('data-empty', msg);
			$errorModal.trigger('show');
		},
		// 禁用document	选中
		forbiddenSelect : function() {
			if(document.all) {
				// ie
				document.onselecstart = function() {
					return false;
				};
			} else {
				document.onmousedown = function() {
					return false;
				};
			}
			document.onselectstart = new Function('event.returnValue = false;');
		},
		// 获取当前document.hidden和document.visibilityState	兼容写法
		getDocumentState : (function() {
			var prefix = '',
			support = false;
			['webkit', 'moz', 'ms'].forEach(function(item, index) {
				if(!support && document[item + 'Hidden'] != undefined) {
					prefix = item;
					support = true;
				}
			});
			return function() {
				return {
					hidden : document[prefix + 'Hidden'],
					visibilityState : document[prefix + 'VisibilityState']
				};
			};
		})(),
		// window.localStorage.getItem
		getItem : function(key) {
			var storage = window.localStorage,
			obj;
			if(storage) {
				obj = storage.getItem('z-plugin-cache-' + key);
			}
			return obj;
		},
		// 获取png图片点
		getImagePoint : function() {
			return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC';
		},
		getMutationObserver : (function() {
			var MutationObserver;
			return function() {
				if(MutationObserver) {
					return MutationObserver;
				} else {
					return MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
				}
			};
		})(),
		// reference(dom) 参考点  默认body
		getOffset : function($target, reference) {
			if($target && $target.length) {
				var target = $target[0],
				offsetTop = target.offsetTop,
				offsetLeft = target.offsetLeft,
				renference = reference || document.body,
				offsetParent = target.offsetParent;
				while(offsetParent) {
					if(reference && offsetParent == reference) {
						break;
					}
					offsetTop += offsetParent.offsetTop;
					offsetLeft += offsetParent.offsetLeft;
					offsetParent = offsetParent.offsetParent;
				}
				return {
					offsetLeft : offsetLeft,
					offsetTop : offsetTop
				};
			}
		},
		getRect : function($target) {
			if($target && $target.length) {
				var rect = $target[0].getBoundingClientRect(),
				decorator = Math.round,
				width = decorator(rect.width),
				height = decorator(rect.height),
				top = decorator(rect.top),
				right = decorator(rect.right),
				bottom = decorator(rect.bottom),
				left = decorator(rect.left);
				// rect不可修改
				return {
					width : width,
					height : height,
					top : top,
					right : right,
					bottom : bottom,
					left : left
				};
			} else {
				return {
					width : 0,
					height : 0,
					top : 0,
					right : 0,
					bottom : 0,
					left : 0
				};
			}
		},
		getVersion : function(split) {
			return this.v.replace(/\./g, split || '-');
		},
		getXHR : function() {
			var xHR = null;
			try{
				xHR = new XMLHttpRequest();        
			} catch(e) {
				try {
					xHR = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
					xHR = new ActiveXObject("Msxml2.XMLHTTP");
				}
			}
			return xHR;
		},
		// 判断两个dom是否发生碰撞
		isCollision : function(dom1, dom2, direction) {
			var $dom1 = $(dom1),
			rect1 = this.getRect($dom1),
			$dom2 = $(dom2),
			rect2 = this.getRect($dom2),
			top1 = rect1.top,
			left1 = rect1.left,
			right1 = rect1.right,
			bottom1 = rect1.bottom,
			top2 = rect2.top,
			right2 = rect2.right,
			bottom2 = rect2.bottom,
			left2 = rect2.left,
			// 水平碰撞
			xCollision = (left1 <= left2 && right1 > left2) || (left1 >= left2 && left1 < right2),
			// 垂直碰撞
			yCollision = (top1 <= top2 && bottom1 > top2) || (top1 >= top2 && top1 < bottom2);
			if(direction == 'x') {
				return xCollision;
			} else if (direction == 'y') {
				// 判断在垂直方向是否发生碰撞
				return yCollision;
			} else {
				// 判断水平和垂直方向是否都发生碰撞
				return xCollision && yCollision;
				/*return(((left1 <= left2 && right1 > left2) || (left1 >= left2 && left1 < right2))
						&& ((top1 <= top2 && bottom1 > top2) || (top1 >= top2 && top1 < bottom2)))
						// 水平方向和垂直方向都包含
						|| (((left1 <= left2 && right1 >= right2) || (left1 >= left2 && right1 <= right2))
								&& ((top1 <= top2 && bottom1 >= bottom2) || (top1 >= top2 && bottom1 <= bottom2)));*/
			}
		},
		isFF : function() {
			return navigator.userAgent.indexOf('Firefox/') != -1;
		},
		// 判断时使用!+[1,]能判断是否是ie浏览器，和标准的toString不一样，转换!NaN,只适用于ie8或以下版本
		isIE : function() {
			var agent = navigator.userAgent.toUpperCase();
			return agent.indexOf('MSIE') != -1 || agent.indexOf('TRIDENT') != -1 || agent.indexOf('EDGE') != -1;
		},
		// 获取pagevisibilitychange事件回调
		pageVisibilityChangeCallback : function(hideCallback, showCallback) {
			var documentState = ZUtil.getDocumentState();
			if(documentState.hidden) {
				if(typeof hideCallback == 'function') {
					hideCallback();
				}
			} else {
				if(typeof showCallback == 'function') {
					showCallback();
				}
			}
		},
		// h5 localStorage
		setItem : function(key, value) {
			var storage = window.localStorage;
			if(storage) {
				storage.setItem('z-plugin-cache-' + key, value);
			}
		},
		// 提示成功信息
		success : function(msg) {
			var _this = this,
			v = _this.getVersion(),
			$successModal = $('.z-success-modal[data-version="' + v + '"]');
			if(!$successModal.length) {
				// 向下偏移量
				var distanceY = 15 * Math.sqrt(3),
				// strokeDashArray
				length = 71;
				var html = '<div class="z-modal hide z-success-modal z-tip-modal pointer" data-version="' + v + '">'
							+ '<div class="z-modal-body">'
								+ '<div class="empty msg-body" data-empty="' + (msg || '操作成功') + '"></div>'
								+ '<svg>'
									+ '<circle r="30" cx="200" cy="45" fill="none" stroke-width="2" stroke="#ff7d00" />'
									+ '<path d="M 180 50 l 15 ' + (distanceY - 7) + ' L 220 30" />'
								+ '</svg>'
								+ '<div class="center mt10">'
									+ '<button class="z-close">确定</button>'
								+ '<div>'
							+ '</div>'
						+ '</div>',
				$body = $(document.body);
				$body.append(html);
				$successModal = $('.z-success-modal[data-version="' + v + '"]');
				var $circle = $successModal.find('circle'),
				circumference = Math.PI * 2 * 40,
				$path = $successModal.find('path'),
				$close = $successModal.find('.z-close');
				
				// TODO
				/*$circle.css({
					'stroke-dasharray' : circumference,
					'stroke-dashoffset' : circumference
				});*/
				
				$successModal.ToggleModal(function() {
					_this.animationTo(circumference, 0, function(strokeDashOffset) {
						$circle.css({
							'stroke-dashoffset' : strokeDashOffset
						});
					});
					_this.animationTo(length, 0, function(strokeDashOffset) {
						$path.css({
							'stroke-dashoffset' : strokeDashOffset
						});
					});
				}, function() {
					$circle.css({
						'stroke-dashoffset' : circumference
					});
					$path.css({
						'stroke-dashoffset' : length
					});
				}, false);
				
				$close.bind('click', function() {
					$successModal.trigger('hide');
				});
			}
			$successModal.find('.msg-body').attr('data-empty', msg);
			$successModal.trigger('show');
		},
		// 字节转换为KB或MB或GB，保留整数
		translateByte : function(size) {
			var result = size / 1024 / 1024 / 1024;
			// GB
			if(result >= 1) {
				return parseInt(result) + 'GB';
			}
			result = size / 1024 / 1024;
			// MB
			if(result >= 1) {
				return parseInt(result) + 'MB';
			}
			// KB
			return parseInt(size / 1024) + 'KB';
		},
		// 开启document	选中
		validSelect : function() {
			if(document.all) {
				// ie
				document.onselecstart = function() {};
			} else {
				document.onmousedown = function() {};
			}
			document.onselectstart = new Function();
		}
	};
	// 返回一个递增的字符串
	ZUtil.generateId = (function() {
		var prefix = 'linked-' + ZUtil.getVersion() + '-',
		suffix = 0;
		return function() {
			return prefix + (++suffix);
		};
	})();
	window.ZUtil = ZUtil;
	
	// 兼容requestAnimationFrame
	(function() {
		var lastTime = 0,
		browserPrefixs = 'webkit moz ms'.split(' '),
		requestAnimationFrame = window.requestAnimationFrame,
		cancelAnimationFrame = window.cancelAnimationFrame,
		i = 0,
		length = browserPrefixs.length;
		
		// 兼容不同浏览器
		// 60帧每秒
		if(!requestAnimationFrame || !cancelAnimationFrame) {
			for(; i < length; i++) {
				var prefix = browserPrefixs[i];
				requestAnimationFrame = window[prefix + 'RequestAnimationFrame'];
				cancelAnimationFrame = window[prefix + 'CancelAnimationFrame'];
				if(requestAnimationFrame && !cancelAnimationFrame) {
					break;
				}
			}
		}
		
		// 兼容不支持requestAnimationFrame和cancelAnimationFrame的浏览器
		if(!requestAnimationFrame || !cancelAnimationFrame) {
			requestAnimationFrame = function(callback , element) {
				var currentTime = Date.now(),
				// 使setTimeout尽可能接近每秒60帧效果
				timeToCall = Math.max(0, 16 - (currentTime - lastTime)),
				id = setTimeout(function() {
					callback(currentTime + timeToCall);
				}, timeToCall),
				lastTime = currentTime + timeToCall;
				return id;
			}
			cancelAnimationFrame = function(id) {
				clearTimeout(id);
			}
		}
		
		window.requestAnimationFrame = requestAnimationFrame;
		window.cancelAnimationFrame = cancelAnimationFrame;
		
	})();
	
	window.eventObj = {};
	(function() {
		var a, element = document.createElement('div'),
		animations = {
			animation : {
				end : 'animationend'
			},
			WebkitAnimation : {
				end : 'webkitAnimationEnd'
			}
		},
		transitions = {
			transition : {
				end : 'transitionend'
			},
			WebkitTransition : {
				end : 'webkitTransitionEnd'
			}
		},
		style = element.style;
		for(a in animations) {
			if(style[a] != undefined) {
				eventObj.animationEvent = animations[a];
				break;
			}
		}
		for(var t in transitions) {
			if(style[t] != undefined) {
				eventObj.transitionEvent = transitions[t];
				break;
			}
		}
	})();
	
	$.fn.extend({
		/**
		 * 2016-9-25
		 * 圆环百分比
		 * circle-progress.css
		 * <div class="circle-progress"></div>
		 * $('.circle-progress').CircleProgress({
		 * 		value : 70,
		 * 		percentAfter : '分',
		 * 		callback : function() {}
		 * });
		 */
		CircleProgress : function(opt) {
			var $this = this,
			param = {
				// 边框宽度
				borderWidth : 10,
				// 动画时间ms
				duration : 1000,
				// 百分比.progress-percent前文本内容
				percentBefore : '',
				// 百分比.progress-percent后文本内容
				percentAfter : '',
				// 0--100(percent)
				value : 0,
				callback : $.noop
			};
			
			param = $.extend(true, param, opt);
			var borderWidth = param.borderWidth,
			duration = param.duration,
			percentBefore = param.percentBefore,
			percentAfter = param.percentAfter,
			value = param.value > 100 ? 100 : (param.value < 0 ? 0 : param.value),
			callback = param.callback,
			v = ZUtil.getVersion();
			$this.each(function(index, item) {
				var $item = $(item),
				$progressContainer = $item.find('.circle-progress-container'),
				$circle = $progressContainer.find('.circle-progress-foreground'),
				$percent = $progressContainer.find('.progress-percent');
				if(!$progressContainer.length) {
					(function($item) {
						var diameter = Math.min($item.width(), $item.height()),
						radius = diameter / 2,
						html = '<div class="circle-progress-container">'
									+ '<svg width="' + diameter + '" height="' + diameter + '">'
										+ '<circle r="' + (radius - borderWidth / 2) + '" cx="' + radius + '" cy="' + radius + '" fill="none" stroke-width="' + borderWidth + '" class="circle-progress-background" />'
										+ '<circle r="' + (radius - borderWidth / 2) + '" cx="' + radius + '" cy="' + radius + '" fill="none" stroke-width="' + borderWidth + '" class="circle-progress-foreground" />'
									+ '</svg>'
									+ '<div class="progress-percent-container" style="width: ' + diameter + 'px; height: ' + diameter + 'px; line-height: ' + diameter + 'px;">'
										+ '<span class="progress-percent-before">' + percentBefore + '</span>'
										+ '<span class="progress-percent"></span>'
										+ '<span class="progress-percent-after">' + percentAfter + '</span>'
									+ '</div>'
								+ '</div>';
						$item.html(html);
						$progressContainer = $item.find('.circle-progress-container'),
						$circle = $progressContainer.find('.circle-progress-foreground');
						$percent = $progressContainer.find('.progress-percent');
					})($item);
				}
				changeValue($circle, $percent, value);
			});
			
			// 重绘circle
			function changeValue($circle, $percent, value) {
				var $progressContainer = $circle.closest('.circle-progress-container'),
				circle = $circle[0],
				// 周长
				circumference = 2 * Math.PI * circle.getAttribute('r'),
				realLength = (value / 100) * circumference,
				offset = 0,
				percent = 0,
				tmpPercent = 0,
				// 每帧变化的长度, 每秒变化60次，*60
				lengthUnit = realLength / (60 * duration / 1000),
				valueUnit = value / (60 * duration / 1000);
				$progressContainer.attr('data-percent', value);
				if(value == 0) {
					$percent.html(0);
					circle.style.strokeDasharray = 0 + ' ' + circumference;
					callback();
					return;
				}
				// IE和chrome、ff表现不一致，需要调整transform: rotate(-90deg)，并且只能针对svg调整，对circle标签无效
				if(ZUtil.isIE()) {
					$circle.closest('svg').css({
						transform : 'rotate(-90deg)'
					});
				}
				// 画圆
				(function() {
					offset += lengthUnit;
					circle.style.strokeDasharray = offset + ' ' + circumference;
					if(offset < realLength) {
						requestAnimationFrame(arguments.callee);
					}
				})();
				
				// 修改percent
				(function() {
					tmpPercent = percent += valueUnit;
					// 取整
					tmpPercent = parseInt(tmpPercent);
					$percent.html(tmpPercent);
					if(percent < value) {
						requestAnimationFrame(arguments.callee);
					} else {
						callback();
					}
				})();
			}
		},
		/**
		 * 2016-10-20
		 * ClipImage	裁剪图片
		 * 后端可以接受accept参数，检测真实图片类型
		 * 原则上body上只能同时显示一个裁剪区域
		 * form ==> input	含有data-name都会在取值的时候调用parseInt
		 * ie10+
		 * $('.clip-image-container').ClipImage({
				url : 'xxx',
				mode : 'circle'
		   });
		   
		   新增特性:
		   2016-12-29
		   1、支持从服务器获取图片并进行处理，此时需要updateUrl
		 */
		ClipImage : function(opt) {
			var param = {
				// 模式	支持normal、circle
				mode : 'normal',
				// 是否可以缩放裁剪框大小
				fixed : false,
				// 是否缩放图片
				resizable : true,
				// 是否裁剪图片
				cutable : true,
				fileName : 'file',
				// 全屏事件对象，如果是弹出层上传图片，最好设置modal层，这样不用将mouse事件绑定到body上
				fullscreenContainer : $(document.body),
				// 文件添加按钮
				uploadSelector : '.add-btn',
				// 保存按钮
				saveSelector : '.save-btn',
				// 直接更新.source-image的src，提交图片裁剪参数以及服务器图片路径进行处理
				updateSelector : '.update-btn',
				sourceContainerSelector : '.source-container',
				previewContainerSelector : '.preview-container',
				// 原图
				sourceImageSelector : '.source-image',
				// 预览图片
				previewImageSelector : '.preview-image',
				// 上传路径
				url : base_url + 'upload/save_cut',
				// 从服务器获取图片并处理时的url
				updateUrl : base_url + 'upload/save_cut_from_server',
				// 检测图片类型是否合法
				imageTypeCheckUrl : base_url + 'upload/check',
				// 检测图片路径不能为空
				emptyCheckUrl : function(msg) {
					ZUtil.error(msg);
				},
				// 不能设置为image/*	否则个别电脑上chrome上传文件特别慢
				accept : 'image/jpg,image/jpeg,image/png',
				// 默认1M
				size : 1,
				// 图片超出最大尺寸后，由于提示信息可能不同，所以调用外部方法
				sizeOver : function(maxSize, realSize) {
					ZUtil.error('允许上传的文件最大为[' + maxSize + ']，实际上传大小为[' + realSize + ']');
				},
				// 插件初始化完成后回调
				renderCallback : $.noop,
				// 没有图片回调
				emptyFileCallback : function() {
					ZUtil.error('请上传图片');
				},
				// 错误类型文件
				errorTypeCallback : function(msg) {
					ZUtil.error(msg);
				},
				// ajax beforeSend
				beforeSend : $.noop,
				// ajax complete
				complete : $.noop,
				// change事件回调
				changeCallback : $.noop,
				// 图片上传之前校验，如果返回false阻止ajax	$form	$files	$sourceImage
				beforeCheck : $.noop,
				/**
				 * 通过该方法获取ajax data数据	$form	file
				 * 这里type=file取值时最好直接用file,否则上传的图片过大时会有bug
				 * $files	如果为null或者undefined，那么是从服务器获取源图片进行处理，只需要校验图片路径是否存在
				 */
				getFormData : function($form, $files, $sourceImage) {
					var formData = new FormData();
					
					if($files) {
						// 上传图片，先校验文件
						var file = $files[0].files[0] || $files[1].files[0];
						
						if(file) {
							formData.append(fileName, file);
						} else {
							// 没有找到文件，返回false
							emptyFileCallback();
							return false;
						}
					} else {
						// 从服务器获取图片，并且进行处理，校验图片路径是否存在
						var src = $sourceImage.attr('data-src');
						if(!src) {
							// 没有找到图片路径，返回false
							emptyFileCallback();
							return false;
						}
						formData.append('imgPath', src);
					}
					
					var $inputs = $form.find('input'),
					length = $inputs.length;
					for(var i = 0; i < length; i++) {
						var $input = $inputs.eq(i),
						name = $input.attr('name'),
						dataName = $input.attr('data-name');
						if($input.attr('type') != 'file') {
							var value = $input.val();
							if(dataName) {
								value = parseInt(value);
							}
							formData.append(name, value);
						}
					}
					return formData;
				},
				// 保存图片回调	data
				saveCallback : $.noop
			},
			v = ZUtil.getVersion();
			
			param = $.extend(true, param, opt);
			var mode = param.mode,
			fixed = param.fixed,
			fileName = param.fileName,
			fullscreenContainer = param.fullscreenContainer,
			uploadSelector = param.uploadSelector,
			saveSelector = param.saveSelector,
			updateSelector = param.updateSelector,
			sourceContainerSelector = param.sourceContainerSelector,
			previewContainerSelector = param.previewContainerSelector,
			sourceImageSelector = param.sourceImageSelector,
			previewImageSelector = param.previewImageSelector,
			url = param.url,
			updateUrl = param.updateUrl,
			imageTypeCheckUrl = param.imageTypeCheckUrl,
			resizable = param.resizable,
			cutable = param.cutable,
			accept = param.accept.toLowerCase(),
			size = param.size,
			sizeOver = param.sizeOver,
			renderCallback = param.renderCallback,
			emptyFileCallback = param.emptyFileCallback,
			errorTypeCallback = param.errorTypeCallback,
			changeCallback = param.changeCallback,
			beforeCheck = param.beforeCheck,
			beforeSend = param.beforeSend,
			complete = param.complete,
			getFormData = param.getFormData,
			saveCallback = param.saveCallback;
			
			this.each(function(index, item) {
				var $container = $(item);
				if($container.attr('data-inited') != 'Y') {
					$container.attr('data-inited', 'Y');
					var $upload = $container.find(uploadSelector),
					$save = $container.find(saveSelector),
					$update = $container.find(updateSelector),
					$sourceContainer = $container.find(sourceContainerSelector),
					$previewContainer = $container.find(previewContainerSelector),
					$sourceImage = $container.find(sourceImageSelector),
					$previewImage = $container.find(previewImageSelector),
					$form = $container.find('.data-form'),
					// 文件表单
					$fileForms,
					$files,
					$x = $form.find('input[data-name="x"]'),
					$y = $form.find('input[data-name="y"]'),
					// 裁剪区域	宽高
					$w = $form.find('input[data-name="w"]'),
					$h = $form.find('input[data-name="h"]'),
					// 图片压缩后	宽高
					$fw = $form.find('input[data-name="fw"]'),
					$fh = $form.find('input[data-name="fh"]'),
					$clipContainer,
					$clipRect,
					$pointContainer,
					$points,
					$circle,
					$target,
					$clipModal,
					x,
					y,
					originX,
					originY;
					
					if(!$form.length) {
						$container.append('<form class="hide data-form"></form>');
						$form = $container.find('.data-form');
					}
					
					var fragment = '<form class="hide file-form">'
									+ '<input type="file" accept="' + accept + '" />'
								+ '</form>'
								+ '<form class="hide file-form">'
									+ '<input type="file" accept="' + accept + '" />'
								+ '</form>';
					$container.append(fragment);
					$fileForms = $container.find('.file-form');
					$files = $fileForms.find('input[type="file"]');
						
					if(!$x.length) {
						$form.append('<input type="hidden" name="x" data-name="x"/>');
						$x = $form.find('input[data-name="x"]');
					}
					if(!$y.length) {
						$form.append('<input type="hidden" name="y" data-name="y"/>');
						$y = $form.find('input[data-name="y"]');
					}
					if(!$w.length) {
						$form.append('<input type="hidden" name="w" data-name="w"/>');
						$w = $form.find('input[data-name="w"]');
					}
					if(!$h.length) {
						$form.append('<input type="hidden" name="h" data-name="h"/>');
						$h = $form.find('input[data-name="h"]');
					}
					if(!$fw.length) {
						$form.append('<input type="hidden" name="fw" data-name="fw"/>');
						$fw = $form.find('input[data-name="fw"]');
					}
					if(!$fh.length) {
						$form.append('<input type="hidden" name="fh" data-name="fh"/>');
						$fh = $form.find('input[data-name="fh"]');
					}
					
					var html = '<div class="clip-container hide">'
								+ '<div class="clip-rect" data-version="' + v + '">'
									+ '<div class="point-container" data-version="' + v + '">'
										+ '<div class="circle hide" data-version="' + v + '"></div>'
										+ '<div class="left-top-point point" data-version="' + v + '"></div>'
										+ '<div class="top-point point" data-version="' + v + '"></div>'
										+ '<div class="right-top-point point" data-version="' + v + '"></div>'
										+ '<div class="right-point point" data-version="' + v + '"></div>'
										+ '<div class="right-bottom-point point" data-version="' + v + '"></div>'
										+ '<div class="bottom-point point" data-version="' + v + '"></div>'
										+ '<div class="left-bottom-point point" data-version="' + v + '"></div>'
										+ '<div class="left-point point" data-version="' + v + '"></div>'
									+ '</div>'
								+ '</div>'
							+ '</div>';
					$sourceContainer.append(html);
					renderCallback();
					
					
					$clipContainer = $sourceContainer.find('.clip-container');
					$clipRect = $clipContainer.find('.clip-rect');
					$pointContainer = $clipContainer.find('.point-container');
					$points = $pointContainer.find('.point');
					$circle = $pointContainer.find('.circle');
					
					if(mode == 'circle') {
						$circle.removeClass('hide');
					}
					if(fixed) {
						$points.remove();
					}
					
					// 本次move事件和上次move事件在x、y轴平移距离
					function getDiff(e) {
						var curX = e.clientX,
						curY = e.clientY,
						rect = ZUtil.getRect($sourceImage);
						// 超出.clip-container范围无效
						if(curY < rect.top) {
							curY = rect.top;
						}
						if(curY > rect.bottom) {
							curY = rect.bottom;
						}
						if(curX < rect.left) {
							curX = rect.left;
						}
						if(curX > rect.right) {
							curX = rect.right;
						}
						x = x || curX,
						y = y || curY;
						var diff = {
							x : curX - x,
							y : curY - y
						};
						x = curX;
						y = curY;
						return diff;
					}
					
					function moveClipRect(e) {
						var x = e.clientX,
						y = e.clientY,
						width,
						height;
						// 保证宽高不能为0
						if(Math.abs(x - originX) > 0 && Math.abs(y - originY) > 0) {
							var rect = ZUtil.getRect($sourceImage),
							imageWidth = $sourceImage.width(),
							imageHeight = $sourceImage.height(),
							previewWidth = $previewContainer.width(),
							previewHeight = $previewContainer.height(),
							rectWidth = $clipRect.width(),
							rectHeight = $clipRect.height();
							if(x < rect.left) {
								x = rect.left;
							}
							if(x > rect.right) {
								x = rect.right;
							}
							if(y < rect.top) {
								y = rect.top;
							}
							if(y > rect.bottom) {
								y = rect.bottom;
							}
							width = Math.abs(x - originX);
							height = Math.abs(y - originY);
							/**
							 * const percent = width / previewWidth = height / previewHeight 
							 */
							var percentW = width / previewWidth,
							percentH = height / previewHeight;
							// 先确定最后的宽高，以小的为标准
							if(percentW < percentH) {
								height = previewHeight * (width / previewWidth);
							} else {
								width = previewWidth * (height / previewHeight);
							}
							
							// 这里x、y可能有变化，因为上面已经调整了宽高
							if(x < originX) {
								x = originX - width;
							} else {
								x = originX + width;
							}
							if(y < originY) {
								y = originY - height;
							} else {
								y = originY + height;
							}
							
							var clipContainerRect = ZUtil.getRect($clipContainer),
							offsetLeft = Math.min(x, originX) - clipContainerRect.left,
							offsetTop = Math.min(y, originY) - clipContainerRect.top;
							$clipRect.css({
								width : width,
								height : height,
								'border-width' : offsetTop + 'px ' + (imageWidth - offsetLeft - width) + 'px ' + (imageHeight - offsetTop - height) + 'px ' + offsetLeft + 'px'
							});
							showClipImage();
							mode == 'circle' && moveCircle();
						}
					}
					
					function movePointContainer(e) {
						var diff = getDiff(e),
						rectWidth = $clipRect.width(),
						rectHeight = $clipRect.height(),
						imageWidth = $sourceImage.width(),
						imageHeight = $sourceImage.height(),
						borderTop = (parseFloat($clipRect.css('border-top-width')) || 0) + diff.y,
						borderLeft = (parseFloat($clipRect.css('border-left-width')) || 0) + diff.x;
						if(borderTop < 0) {
							borderTop = 0;
						}
						if(borderTop + rectHeight > imageHeight) {
							borderTop = imageHeight - rectHeight;
						}
						if(borderLeft < 0) {
							borderLeft = 0;
						}
						if(borderLeft + rectWidth > imageWidth) {
							borderLeft = imageWidth - rectWidth;
						}
						
						$clipRect.css({
							'border-width' : borderTop + 'px ' + (imageWidth - borderLeft - rectWidth) + 'px ' + (imageHeight - borderTop - rectHeight) + 'px ' + borderLeft + 'px'
						});
						showClipImage();
					}
					
					// 移动.circle
					function moveCircle() {
						var clipWidth = $pointContainer.width();
						$circle.css({
							'border-width' : clipWidth / 2
						});
					}
					
					// 移动8个点
					function movePoint(e) {
						var diff = getDiff(e),
						// border
						borderTop = parseFloat($clipRect.css('border-top-width')) || 0,
						borderRight = parseFloat($clipRect.css('border-right-width')) || 0,
						borderBottom = parseFloat($clipRect.css('border-bottom-width')) || 0,
						borderLeft = parseFloat($clipRect.css('border-left-width')) || 0,
						clipWidth = $clipRect.width(),
						clipHeight = $clipRect.height(),
						imageWidth = $sourceImage.width(),
						imageHeight = $sourceImage.height(),
						previewWidth = $previewContainer.width(),
						previewHeight = $previewContainer.height(),
						diffX = diff.x,
						diffY = diff.y,
						x = e.clientX,
						y = e.clientY,
						rect = ZUtil.getRect($sourceImage),
						resizable = false;
						
						/**
						 * const percent = clipWidth / previewWidth = clipHeight / previewHeight
						 */
						// .top-point,左下角固定
						if(diffY && $target.hasClass('top-point')) {
							clipHeight -= diffY;
							if(clipHeight < imageHeight && clipHeight > 0) {
								clipWidth = previewWidth * (clipHeight / previewHeight);
								if(borderLeft + clipWidth > imageWidth) {
									clipWidth = imageWidth - borderLeft;
									clipHeight = previewHeight * (clipWidth / previewWidth);
								}
								borderTop = imageHeight - clipHeight - borderBottom;
								borderRight = imageWidth- borderLeft - clipWidth;
								resizable = true;
							}
						}
						// .bottom-point,左上角固定
						if(diffY && $target.hasClass('bottom-point')) {
							clipHeight += diffY;
							if(clipHeight < imageHeight && clipHeight > 0) {
								clipWidth = previewWidth * (clipHeight / previewHeight);
								if(borderLeft + clipWidth > imageWidth) {
									clipWidth = imageWidth - borderLeft;
									clipHeight = previewHeight * (clipWidth / previewWidth);
								}
								borderRight = imageWidth - borderLeft - clipWidth;
								borderBottom = imageHeight - borderTop - clipHeight;
								resizable = true;
							}
						}
						// .left-point,右上角固定
						if(diffX && $target.hasClass('left-point')) {
							clipWidth -= diffX;
							if(clipWidth < imageWidth && clipWidth > 0) {
								clipHeight = previewHeight * (clipWidth / previewWidth);
								if(borderTop + clipHeight > imageHeight) {
									clipHeight = imageHeight - borderTop;
									clipWidth = previewWidth * (clipHeight / previewHeight);
								}
								borderBottom = imageHeight - borderTop - clipHeight;
								borderLeft = imageWidth - clipWidth - borderRight;
								resizable = true;
							}
						}
						// .right-point,左上角固定
						if(diffX && $target.hasClass('right-point')) {
							clipWidth += diffX;
							if(clipWidth < imageWidth && clipWidth > 0) {
								clipHeight = previewHeight * (clipWidth / previewWidth);
								if(borderTop + clipHeight > imageHeight) {
									clipHeight = imageHeight - borderTop;
									clipWidth = previewWidth * (clipHeight / previewHeight);
								}
								borderRight = imageWidth - borderLeft - clipWidth;
								borderBottom = imageHeight - borderTop - clipHeight;
								resizable = true;
							}
						}
						// .left-top-point,右下角固定
						if((diffX || diffY) && $target.hasClass('left-top-point')) {
							if(diffX) {
								clipWidth -= diffX;
								if(clipWidth < imageWidth && clipWidth > 0) {
									clipHeight = previewHeight * (clipWidth / previewWidth);
									if(borderBottom + clipHeight > imageHeight) {
										clipHeight = imageHeight - borderBottom;
										clipWidth = previewWidth * (clipHeight / previewHeight);
									}
									resizable = true;
								}
							} else {
								clipHeight -= diffY;
								if(clipHeight < imageHeight && clipHeight > 0) {
									clipWidth = previewWidth * (clipHeight / previewHeight);
									if(borderRight + clipWidth > imageWidth) {
										clipWidth = imageWidth - borderRight;
										clipHeight = previewHeight * (clipWidth / previewWidth);
									}
									resizable = true;
								}
							}
							borderTop = imageHeight - clipHeight - borderBottom;
							borderLeft = imageWidth - clipWidth - borderRight;
						}
						
						// .right-top-point,左下角固定
						if((diffX || diffY) && $target.hasClass('right-top-point')) {
							if(diffX) {
								clipWidth += diffX;
								if(clipWidth < imageWidth && clipWidth > 0) {
									clipHeight = previewHeight * (clipWidth / previewWidth);
									if(borderBottom + clipHeight > imageHeight) {
										clipHeight = imageHeight - borderBottom;
										clipWidth = previewWidth * (clipHeight / previewHeight);
									}
									resizable = true;
								}
							} else {
								clipHeight -= diffY;
								if(clipHeight < imageHeight && clipHeight > 0) {
									clipWidth = previewWidth * (clipHeight / previewHeight);
									if(borderLeft + clipWidth > imageWidth) {
										clipWidth = imageWidth - borderLeft;
										clipHeight = previewHeight * (clipWidth / previewWidth);
									}
									resizable = true;
								}
							}
							borderTop = imageHeight - clipHeight - borderBottom;
							borderRight = imageWidth - borderLeft - clipWidth;
						}
						// .right-bottom-point,左上角固定
						if((diffX || diffY) && $target.hasClass('right-bottom-point')) {
							if(diffX) {
								clipWidth += diffX;
								if(clipWidth < imageWidth && clipWidth > 0) {
									clipHeight = previewHeight * (clipWidth / previewWidth);
									if(borderTop + clipHeight > imageHeight) {
										clipHeight = imageHeight - borderTop;
										clipWidth = previewWidth * (clipHeight / previewHeight);
									}
									resizable = true;
								}
							} else {
								clipHeight += diffY;
								if(clipHeight < imageHeight && clipHeight > 0) {
									clipWidth = previewWidth * (clipHeight / previewHeight);
									if(borderLeft + clipWidth > imageWidth) {
										clipWidth = imageWidth - borderLeft;
										clipHeight = previewHeight * (clipWidth / previewWidth);
									}
									resizable = true;
								}
							}
							borderRight = imageWidth - borderLeft - clipWidth;
							borderBottom = imageHeight - borderTop - clipHeight;
						}
						// .left-bottom-point,右上角固定
						if((diffX || diffY) && $target.hasClass('left-bottom-point')) {
							if(diffX) {
								clipWidth -= diffX;
								if(clipWidth < imageWidth && clipWidth > 0) {
									clipHeight = previewHeight * (clipWidth / previewWidth);
									if(borderTop + clipHeight > imageHeight) {
										clipHeight = imageHeight - borderTop;
										clipWidth = previewWidth * (clipHeight / previewHeight);
									}
									resizable = true;
								}
							} else {
								clipHeight += diffY;
								if(clipHeight < imageHeight && clipHeight > 0) {
									clipWidth = previewWidth * (clipHeight / previewHeight);
									if(clipWidth + borderRight > imageWidth) {
										clipWidth = imageWidth - borderRight;
										clipHeight = previewHeight * (clipWidth / previewWidth);
									}
									resizable = true;
								}
							}
							borderBottom = imageHeight - borderTop - clipHeight;
							borderLeft = imageWidth - clipWidth - borderRight;
						}
						if(resizable) {
							$clipRect.css({
								width : clipWidth,
								height : clipHeight,
								'border-width' : borderTop + 'px ' + borderRight + 'px ' + borderBottom + 'px ' + borderLeft + 'px'
							});
							showClipImage();
							mode == 'circle' && moveCircle();
						}
					}
					
					$container.bind('mousedown', function(e) {
						var $dom = $(e.target),
						buttonCode = e.button,
						// 是否是事件源
						isAim = $dom.hasClass('point-container') || $dom.hasClass('point');
						if(mode == 'circle') {
							isAim = isAim || $dom.hasClass('circle');
						}
						// 如果固定裁剪框，不能重画rect
						if(!fixed) {
							isAim = isAim || $dom.hasClass('clip-rect');
						}
						// 左键
						if(!buttonCode && $dom.attr('data-version') && $dom.css('display') != 'none' && isAim) {
							if($dom.hasClass('circle')) {
								$target = $pointContainer;
							} else {
								$target = $dom;
							}
							ZUtil.forbiddenSelect();
							originX = e.clientX;
							originY = e.clientY;
						}
					}).bind('reset', function(e) {
						/**
						 * 在input change时，如果图片校验不通过，form会reset，此时也会冒泡触发顶层$container.trigger('reset')
						 * 同时这里不能返回false，否则会中断子dom-->form的reset()
						 */
						if(e.target == $container[0]) {
							// 重置
							$clipContainer.addClass('hide');
							$sourceImage.addClass('hide').removeAttr('data-src');
							$previewImage.addClass('hide');
							$form[0].reset();
							$fileForms.each(function(index, form) {
								form.reset();
							});
						}
					});
					
					$(fullscreenContainer).bind('mouseup', function() {
						if($target) {
							$target = null;
							x = null;
							y = null;
							ZUtil.validSelect();
						}
					}).bind('mousemove', function(e) {
						// 不能返回false，否则会禁用掉select事件
						if($target) {
							$target.hasClass('clip-rect') && moveClipRect(e);
							$target.hasClass('point-container') && movePointContainer(e);
							$target.hasClass('point') && movePoint(e);
						}
					});
					
					function byteToM(size) {
						return size / 1024 / 1024;
					}
					
					var sourceContainerWidth = $sourceContainer.width(),
					sourceContainerHeight = $sourceContainer.height();
					
					function resizeImage(image) {
						var width = image.width,
						height = image.height,
						percentSourceW = width / sourceContainerWidth,
						percentSourceH = height / sourceContainerHeight;
						// 图片超出container尺寸，需要缩放
						if(percentSourceW > 1 || percentSourceH > 1) {
							if(percentSourceW > percentSourceH) {
								/**
								 * const percent = width / height = sourceContainerWidth / h
								 * h = sourceContainerWidth * (height / width)
								 */
								height = sourceContainerWidth * (height / width);
								width = sourceContainerWidth;
							} else {
								/**
								 * const percent = width / height = w / sourceContainerHeight
								 * w = sourceContainerHeight * (width / height)
								 */
								width = sourceContainerHeight * (width / height);
								height = sourceContainerHeight;
							}
						}
						$sourceImage.css({
							width : width,
							height : height
						});
						$previewImage.css({
							width : width,
							height : height
						});
						
						// 如果缩放后的图片宽高小于预览区域宽高，需要调整裁剪区域大小，但宽高比例不变
						var previewContainerWidth = $previewContainer.width(),
						previewContainerHeight = $previewContainer.height(),
						percentPreviewW = width / previewContainerWidth,
						percentPreviewH = height / previewContainerHeight,
						// 裁剪区域默认和预览区域一样宽高
						w = previewContainerWidth,
						h = previewContainerHeight;
						if(percentPreviewW < 1 || percentPreviewH < 1) {
							if(percentPreviewW < percentPreviewH) {
								/**
								 * const percent = w / h = width / ?
								 * ? = width * (h / w)
								 */
								h = width * (h / w);
								w = width;
							} else {
								/**
								 * const percent = w / h = ? / height
								 * ? = height * (w / h)
								 */
								w = height * (w / h);
								h = height;
							}
						}
						$w.val(w);
						$h.val(h);
						
						resizeClipContainer(width, height, 0, 0, w, h);
					}
					
					// 设置裁剪区域
					function resizeClipContainer(width, height, left, top, rectWidth, rectHeight) {
						$clipContainer.css({
							width : width,
							height : height
						});
						resizeClipRect(width, height, left, top, rectWidth, rectHeight);
					}
					
					// 设置.clip-rect宽高和border
					function resizeClipRect(width, height, left, top, rectWidth, rectHeight) {
						$clipRect.css({
							width : rectWidth,
							height : rectHeight,
							'border-width' : top + 'px ' + (width - rectWidth - left) + 'px ' + (height - rectHeight - top) + 'px ' + left + 'px'
						});
						showClipImage();
						mode == 'circle' && moveCircle();
					}
					
					// 设置预览图片的宽高以及位置
					function showClipImage() {
						var imageWidth = $sourceImage.width(),
						imageHeight = $sourceImage.height(),
						top = parseFloat($clipRect.css('border-top-width')) || 0,
						left = parseFloat($clipRect.css('border-left-width')) || 0,
						rectWidth = $clipRect.width(),
						rectHeight = $clipRect.height(),
						// 就算预览区域隐藏，依然能得到宽高
						previewWidth = $previewContainer.width(),
						previewHeight = $previewContainer.height(),
						percent = rectWidth / previewWidth;
						
						$fw.val(imageWidth);
						$fh.val(imageHeight);
						$x.val(left);
						$y.val(top);
						
						// 计算预览图片的宽高
						if(percent != 1) {
							top = top / percent;
							left = left / percent;
							imageWidth = imageWidth / percent;
							imageHeight = imageHeight / percent;
						}
						$previewImage.css({
							width : imageWidth,
							height : imageHeight,
							top : -top,
							left : -left
						});
					}
					
					// isUpload	如果为true，隐藏.update-btn，显示.save-btn
					function toggleButtons(isUpload) {
						if(isUpload) {
							$update.addClass('hide');
							$save.removeClass('hide');
						} else {
							$save.addClass('hide');
							$update.removeClass('hide');
						}
					}
					
					$files.bind('change', function() {
						var $file = $(this),
						file = this.files[0],
						realSize,
						valid;
						if(file) {
							
							realSize = byteToM(file.size);
							// 图片过大
							if(realSize > size) {
								sizeOver(size + 'MB', realSize.toFixed(1) + 'MB');
								return false;
							}
							
							// 针对开发人员
							if(!imageTypeCheckUrl) {
								emptyCheckUrl('imageTypeCheckUrl参数必填');
								return false;
							}
							
							var formData = new FormData();
							formData.append('file', file);
							formData.append('accept', accept);
							
							$.ajax({
								url : imageTypeCheckUrl,
								data : formData,
								async : false,
								beforeSend : beforeSend,
								complete : complete,
								type : 'post',
								contentType: false,
								processData: false,
								success : function(data) {
									valid = data.success;
									if(!valid) {
										$file.closest('form')[0].reset();
										errorTypeCallback(data.msg);
									}
								}
							});
							
							if(!valid) {
								return false;
							}
							
							var reader = new FileReader();
							reader.onload = function(e) {
								var result = e.target.result,
								image = new Image();
								image.onload = function() {
									// 重置另一个表单，清空input type="file"
									$files.eq(1 - $files.index($file)).closest('form')[0].reset();
									
									$sourceImage.attr('src', result).removeClass('hide').removeAttr('data-src');
									$previewImage.attr('src', result).removeClass('hide');
									
									// 计算尺寸
									resizeImage(image);
									
									// 切换按钮
									toggleButtons(true);
									
									changeCallback(result);
								};
								image.src = result;
								$clipContainer.removeClass('hide');
							};
							reader.readAsDataURL(file);
						}
					});
					
					/**
					 * 直接修改图片src
					 * param obj		prefix	路径前缀	http://localhost:8080/study/
					 * 					path	服务器路径	a/b/c.jpg
					 */ 
					$sourceImage.bind('change', function(event, obj) {
						var image = new Image(),
						prefix = obj.prefix || '',
						path = obj.path,
						src = prefix + path;
						
						image.onload = function() {
							// 清空所有input type="file"的form
							$files.each(function(index, item) {
								$(item).closest('form')[0].reset();
							});
							
							$sourceImage.attr({
								src : src,
								'data-src' : path
							}).removeClass('hide');
							$previewImage.attr('src', src).removeClass('hide');
							
							// 计算尺寸
							resizeImage(image);
							
							// 切换按钮
							toggleButtons(false);
							
							changeCallback(src);
						};

						// 从服务器获取的图片可能加载失败，此时必须reset，否则会出现裁剪框
						image.onerror = function() {
							$container.trigger('reset');
						};
						
						image.src = src;
						$clipContainer.removeClass('hide');
					});
					
					// 第一个为空的file click
					$upload.bind('click', function() {
						var file = $files[0].files[0];
						if(!file) {
							$files.eq(0).click();
						} else {
							$files.eq(1).click();
						}
					});
					
					// 上传图片
					$save.bind('click', function() {
						if(beforeCheck($form, $files, $sourceImage) == false) {
							return false;
						}
						var formData = getFormData($form, $files);
						if(!formData) {
							return false;
						}
						
						// 有效的图片类型
						formData.append('accept', accept);
						// 是否缩放图片
						formData.append('resizable', resizable);
						// 是否裁剪图片
						formData.append('cutable', cutable);
						
						$.ajax({
							url : url,
							data : formData,
							beforeSend : beforeSend,
							complete : complete,
							type : 'post',
							contentType: false,
							processData: false,
							success : function(data) {
								if(!data.success) {
									errorTypeCallback(data.msg);
									return false;
								}
								saveCallback(data);
							}
						});
					});
					
					// 直接获取服务器的图片进行处理
					$update.bind('click', function() {
						if(beforeCheck($form, $files, $sourceImage) == false) {
							return false;
						}
						var formData = getFormData($form, null, $sourceImage);
						if(!formData) {
							return false;
						}
						
						// 有效的图片类型
						formData.append('accept', accept);
						// 是否缩放图片
						formData.append('resizable', resizable);
						// 是否裁剪图片
						formData.append('cutable', cutable);
						
						$.ajax({
							url : updateUrl,
							data : formData,
							beforeSend : beforeSend,
							complete : complete,
							type : 'post',
							contentType: false,
							processData: false,
							success : function(data) {
								saveCallback(data);
							}
						});
					});
				}
			});
		},
		/**
		 * 2016-10-9
		 * 拖拽dom
		 * $('.xxx').Drag({
		 * 		start : $.noop,
		 *		move : $.noop,
		 *		end : $.noop
		 * });
		 */
		Drag : function(opt) {
			var $this = this,
			param = {
				start : $.noop,
				move : $.noop,
				end : $.noop
			};
			
			param = $.extend(true, param, opt);
			$this.each(function(index, item) {
				var $target = $(item);
				
				$target.bind('mousedown', function(e) {
					if(param.start(e) == false) {
						return false;
					}
					$target.attr({
						drag : 'Y'
					});
				}).bind('mousemove', function(e) {
					if(param.move(e) == false) {
						return false;
					}
					var event = e.originalEvent,
					curX = event.screenX,
					curY = event.screenY,
					x = parseFloat($target.attr('x')) || curX,
					y = parseFloat($target.attr('y')) || curY,
					top = parseFloat($target.css('top')) || 0,
					left = parseFloat($target.css('left')) || 0;
					$target.css({
						top : top + (curY - y),
						left : left + (curX - x)
					}).attr({
						x : curX,
						y : curY
					});
				}).bind('mouseout mouseup', function(e) {
					if(param.end(e) == false) {
						return false;
					}
					$target.removeAttr('x').removeAttr('y').removeAttr('drag');
				});
			});
		},
		error : function() {
			ZUtil.error('服务器异常');
		},
		/**
		 * 2016-9-25
		 * 水平滑动
		 * 需要注意sliderBody必须包含.slider-item,插件初始化后没有设置.footer-item.on，可以在renderCallback中设置
		 * horizontal-slide.css
		 * <div class="horizontal-slide"></div>
		 * $('.horizontal-slide').HorizontalSlide({
				sliderHeader : '水平滑动',
				sliderBody : '<div class="slider-item">1</div><div class="slider-item">2</div>',
				clickCallback : function() {},
				renderCallback : function() {},
				closeCallback : function() {}
		   });
		 */
		HorizontalSlide : function(opt) {
			var $this = this,
			param = {
				// 模式	normal、modal(默认)
				mode : 'modal',
				// 是否支持模态框动画	默认true
				isAnimation : true,
				// 显示关闭按钮
				showClose : true,
				// 显示左右箭头
				showArrow : true,
				showFooter : true,
				// 标题
				sliderHeader : '',
				// 滚动区域内容片段	<div class="slider-item">1</div><div class="slider-item">2</div><div class="slider-item">3</div>
				sliderBody : '',
				// 每次translateX后执行回调
				clickCallback : $.noop,
				itemCallback : $.noop,
				// 每个$this执行完HorizontalSlide后执行回调
				renderCallback : $.noop,
				// 关闭和显示modal回调
				modalCallback : $.noop
			},
			$body = $(document.body);
			
			param = $.extend(true, param, opt);
			var mode = param.mode,
			isAnimation = param.isAnimation,
			showClose = param.showClose,
			showArrow = param.showArrow,
			showFooter = param.showFooter,
			sliderHeader = param.sliderHeader,
			sliderBody = param.sliderBody,
			clickCallback = param.clickCallback,
			itemCallback = param.itemCallback,
			renderCallback = param.renderCallback,
			modalCallback = param.modalCallback,
			v = ZUtil.getVersion();
			
			$this.each(function(index, item) {
				var $item = $(item),
				$sliderContainer = $item.find('.horizontal-slider-' + v);
				if(!$sliderContainer.length) {
					(function($item) {
						var index = 0,
						html = '<div class="horizontal-slider horizontal-slider-' + v + '">'
								+ '<div class="slider-header">' + sliderHeader + '</div>'
								+ '<div class="slider-body">'
									+ '<div class="slider-content clearfix">' + sliderBody + '</div>'
								+ '</div>'
								+ (showFooter ? '<div class="slider-footer"><div class="footer-content clearfix"><div class="footer-content-body"></div></div></div>' : '')
								+ '<div class="slider-close' + (showClose ? '' : ' hide') + '"></div>'
								+ '<div class="triangle-left' + (!showArrow ? ' hide' : '') + '">'
									+ '<div class="triangle-first"></div>'
									+ '<div class="triangle-second"></div>'
								+ '</div>'
								+ '<div class="triangle-right' + (!showArrow ? ' hide' : '') + '">'
									+ '<div class="triangle-first"></div>'
									+ '<div class="triangle-second"></div>'
								+ '</div>'
							+ '</div>';
						if(mode == 'modal') {
							html = '<div class="z-modal hide">'
									+ html
								+ '</div>';
						}
						$item.html(html);
						$sliderContainer = $item.find('.horizontal-slider-' + v);
						var $modal = $sliderContainer.closest('.z-modal'),
						$header = $sliderContainer.find('.slider-header'),
						headerHeight = $header.css('display') == 'none' ? 0 : $header.height(),
						$sliderBody = $sliderContainer.find('.slider-body'),
						$sliderContent = $sliderBody.find('.slider-content'),
						$sliderItems = $sliderBody.find('.slider-item'),
						$footer = $sliderContainer.find('.slider-footer'),
						footerHeight = $footer.css('display') == 'none' ? 0 : $footer.height(),
						$footerItems,
						$close = $sliderContainer.find('.slider-close'),
						$triangleLeft = $sliderContainer.find('.triangle-left'),
						$triangleRight = $sliderContainer.find('.triangle-right'),
						width = $sliderItems.eq(0).width();
						if(mode == 'modal') {
							$sliderContainer.addClass('z-modal-body');
						}
						
						$sliderBody.css({
							height : $sliderContainer.height() - headerHeight - footerHeight
						});
						$sliderContent.css({
							width : width * $sliderItems.length
						});
						
						// 快捷键	ESC	←	→
						var bodyKeydown = function(e) {
							var code = e.keyCode,
							ESC = 27,
							LEFT = 37,
							RIGHT = 39;
							if(!$modal.hasClass('hide')) {
								if(code == 27) {
									$modal.click();
								} else if (code == LEFT) {
									$triangleLeft.click();
								} else if (code == RIGHT) {
									$triangleRight.click();
								}
							}
						};
						
						if(mode == 'modal') {
							if(isAnimation) {
								$modal.bind(eventObj.transitionEvent.end, function(e) {
									/**
									 * 经过测试发现	给父级和子级css添加transition
									 * 当子级触发transitionend时，和click事件表现一致，会有冒泡现象
									 * 所以这里应该判断事件源是否是.z-modal，否则事件可能触发多次
									 */
									if($modal.get(0) == e.target) {
										// status-show标记作用
										if(!$modal.hasClass('status-show')) {
											$modal.addClass('hide');
										}
										modalCallback();
									}
								});
							}
							
							$modal.bind('click', function(e) {
								if(e.target == $modal.get(0)) {
									// 关闭模态框后要把body上的keydown事件移除掉
									$body.unbind('keydown', bodyKeydown);
									if(isAnimation) {
										$modal.removeClass('status-show').css({
											opacity : 0
										});
									} else {
										$modal.addClass('hide');
										modalCallback();
									}
								}
							}).bind('show', function(e, reset) {
								// 是否重置，显示第一个.slider-item
								if(reset) {
									// 如果显示底部，直接触发第一个.footer-item的click事件
									if(showFooter) {
										$footerItems.eq(0).click();
									} else {
										index = 0;
										goTo();
									}
								}
								$body.bind('keydown', bodyKeydown);
								$modal.removeClass('hide');
								if(isAnimation) {
									setTimeout(function() {
										$modal.addClass('status-show').css({
											opacity : 1
										});
									});
								} else {
									modalCallback();
								}
							});
							
							if(showClose) {
								$close.bind('click', function() {
									if(mode == 'modal') {
										$modal.click();
									}
								});
							}
						}
						
						$sliderItems.bind('click', itemCallback);
						
						function goTo() {
							if(showArrow) {
								if(!index) {
									$triangleLeft.addClass('disabled');
								} else {
									$triangleLeft.removeClass('disabled');
								}
								if(index == $sliderItems.length - 1) {
									$triangleRight.addClass('disabled');
								} else {
									$triangleRight.removeClass('disabled');
								}
							}
							if(showFooter) {
								$footerItems.removeClass('on').eq(index).addClass('on');
							}
							translateX = 'translateX(-' + (index * width) + 'px)';
							$sliderContent.css({
								'transform' : translateX,
								'-webkit-transform' : translateX,
								'-moz-transform' : translateX,
								'-ms-transform' : translateX
							});
							// 每次translateX执行回调方法
							clickCallback(index, $sliderItems.length);
						}
						
						// 设置左右箭头
						if(showArrow) {
							if(!index) {
								$triangleLeft.addClass('disabled');
							}
							if(index == $sliderItems.length - 1) {
								$triangleRight.addClass('disabled');
							}
							$triangleLeft.bind('click', function() {
								var $this = $(this);
								if(!$this.hasClass('disabled')) {
									index--;
									goTo();
								}
							});
							
							$triangleRight.bind('click', function() {
								var $this = $(this);
								if(!$this.hasClass('disabled')) {
									index++;
									goTo();
								}
							});
						}
						
						if(showFooter) {
							var length = $sliderItems.length,
							$footerContentBody = $footer.find('.footer-content-body'),
							footerHtml = '';
							for(var i = 0; i < length; i++) {
								footerHtml += '<div class="footer-item" data-index="' + i + '">' + (i + 1) + '</div>';
							}
							$footerContentBody.html(footerHtml);
							$footerItems = $footer.find('.footer-item');
							$footerItems.bind('click', function() {
								$this = $(this);
								if(!$this.hasClass('on')) {
									index = parseInt($this.attr('data-index'));
									goTo();
								}
							});
						}
						
						if(mode == 'modal') {
							$modal.trigger('show');
						}
						
						renderCallback(index, $sliderItems.length);
					})($item);
				}
			});
		},
		/**	2016-10-20
			Select	select联动
			$('.linked-select-container').LinkedSelect({
				selects : [{
					defaultText : '请选择省份',
					labelText : '省份',
					change : function($nextSelect, nextIndex, value) {
						console.log(value);
					}
				}, {
					defaultText : '请选择城市',
					labelText : '城市',
					change : function($curSelect, index, value) {
						console.log($curSelect, index, value);
					}
				}],
				renderCallback : function($selects) {
					$selects.eq(0).append('<option value="1">四川</option><option value="2">北京</option>');
				}
			});
		*/
		LinkedSelect : function(opt) {
			var v = 'select-container-' + ZUtil.getVersion(),
			param = {
				renderCallback : $.noop,
				selects : []
			};
			
			param = $.extend(true, param, opt);
			
			function getSelectParam(originObj) {
				var obj = {
					defaultText : '请选择',
					labelText : '',
					labelClassName : '',
					selectClassName : '',
					change : $.noop
				};
				return $.extend(true, obj, originObj)
			}
			
			this.each(function(index, item) {
				var $item = $(item);
				if(!$item.find('div[data-version="' + v + '"]').length) {
					(function($item) {
						var i,
						selects = param.selects,
						length = selects.length;
						if(length) {
							var html = '<div class="clearfix" data-version="' + v + '">';
							for(i = 0; i < length; i++) {
								select = getSelectParam(selects[i]),
								selectClassName = select.selectClassName,
								defaultText = select.defaultText,
								labelText = select.labelText,
								labelClassName = select.labelClassName;
								html += '<label class="' + labelClassName + '">' + labelText + '</label>'
										+ '<select class="linked-select ' + selectClassName + '">'
											+ '<option value="-1">' + defaultText + '</option>'
										+ '</select>';
							}
							html += '</div>';
							$item.html(html);
							var $selects = $item.find('select');
							
							// 执行renderCallback
							param.renderCallback($selects);
							
							// 绑定事件
							$selects.bind('change', function() {
								var $select = $(this),
								index = $selects.index($select),
								value = $select.val();
								if(index < length - 1) {
									var select;
									for(i = index + 1; i < length; i++) {
										select = getSelectParam(selects[i]),
										defaultText = select.defaultText,
										$linkedSelect = $selects.eq(i);
										$linkedSelect.html('<option value="-1">' + defaultText + '</option>');
									}
									// 触发change事件
									// 当前select如果不是最后一个，并且获取的值!=-1，触发后面一个select的change事件
									value != -1 && getSelectParam(selects[index]).change($selects.eq(index + 1), index + 1, value);
								} else {
									getSelectParam(selects[index]).change($select, index, value);
								}
							});
						}
					})($item);
				}
			});
		},
		/**
		 * 2016-9-21
		 * 使用一个特殊div覆盖dom
		 * mask.css
		 */
		Mask : function(opt) {
			var $this = this,
			option = {
				// 模式	rect、circle	默认rect
				mode : 'rect'
			},
			id = 'data-mask-' + ZUtil.getVersion(),
			$body = $(document.body),
			$mask = $('#' + id),
			$cover = $mask.find('.cover');
			
			option = $.extend(true, option, opt);
			var mode = option.mode;
			
			if(!$mask.length) {
				var html = '<div class="mask absolute" id="' + id + '">'
							+ '<div class="cover"></div>'
						+ '</div>';
				$body.append(html);
				$mask = $('#' + id);
				$cover = $mask.find('.cover');
				$(document).bind('resize', move);
			}

			$mask.data('target', $this);
			function move() {
				var $target = $mask.data('target'),
				rect = ZUtil.getRect($target),
				offsetObj = ZUtil.getOffset($target),
				bodyRect = ZUtil.getRect($body),
				bodyWidth = bodyRect.width,
				innerHeight = window.innerHeight,
				height = rect.height,
				width = rect.width,
				top = offsetObj.offsetTop,
				left = offsetObj.offsetLeft,
				right = bodyWidth - left - width,
				bottom = innerHeight - top - height,
				coverBorderWidth = Math.min(height, width);
				
				$mask.css({
					width : width,
					height : height,
					top : 0,
					right : 0,
					bottom : 0,
					left : 0,
					'border-top' : top + 'px solid #000',
					'border-right' : right + 'px solid #000',
					'border-bottom' : bottom + 'px solid #000',
					'border-left' : left + 'px solid #000'
				});
				
				// 通过top和left来平移.cover，使.cover位置不变，但是border-radius的颜色刚好覆盖空白区域
				$cover.css({
					top : -(coverBorderWidth / 2),
					left : -(coverBorderWidth / 2),
					'border-width' : coverBorderWidth / 2
				});
				if(mode == 'circle') {
					$cover.css({
						'border-radius' : coverBorderWidth
					});
				}
			}
			move();
		},
		/**
		 * h5 api ie10+
		 * 切换浏览器tab或者最小化、最大化浏览器都会触发visibilitchange
		 */
		PageVisibilityChange : function(opt) {
			var option = {
				hideCallback : $.noop,
				showCallback : $.noop
			},
			prefixs = ['webkit', 'moz', 'ms'],
			support = false,
			prefix = '';
			
			option = $.extend(true, option, opt);
			var hideCallback = option.hideCallback,
			showCallback = option.showCallback;
			
			prefixs.forEach(function(item, index) {
				if(!support && document[item + 'Hidden'] != undefined) {
					support = true;
					prefix = item;
				}
			});
			
			if(!support) {
				console.error('浏览器不支持visibilitychange方法');
				return;
			}
			
			/**
			 * 这里pageVisibilityChangeCallback定义在ZUtil里面主要是为了防止document无法移除visibilitychange事件，
			 * 外部重复调用PageVisibilityChange方法造成事件重复，该方法写到ZUtil里面就能保证fn地址不变，同时removeEventListener能移除事件
			 */
			var fn = ZUtil.pageVisibilityChangeCallback.bind(null, hideCallback, showCallback);
			
			document.removeEventListener('visibilitychange', fn);
			document.addEventListener('visibilitychange', fn);
		},
		/**
		 * 2016-9-16
		 * progress-bar.css
		 * <div id="progress"></div>
		 * var $progress = $('.progress');
			$progress.ProgressBar({
				data : [1, 2, 3, 4, 5],
				callback : function(to) {
					console.log(to);
				}
			});
			$('#previous').bind('click', function() {
				$progress.trigger('previousStep');
			});
			$('#next').bind('click', function() {
				$progress.trigger('nextStep');
			});
			$('.progress').trigger('toStep', 4);
		 */
		ProgressBar : function(opt) {
			var $progresses = this,
			option = {
				// node节点文本
				data : [],
				callback : $.noop
			};
			
			option = $.extend(true, option, opt);
			var data = option.data,
			length = data.length,
			callback = option.callback;
			
			$progresses.each(function(index, item) {
				var $progress = $(item),
				bar = '<div class="pull-left progress-bar br2">'
						+ '<p class="progress-bar-fill"></p>'
					+ '</div>',
				$bars,
				$nodes,
				nodeArr = [],
				// 默认没有进度，to的取值范围[1, data.length]内有效
				to = 0,
				animating = false,
				// 事件循环次数
				count = 0,
				fnName;
				
				data.forEach(function(item, index) {
					node = '<div class="pull-left progress-node relative br-circle center th">'
							+ '<p class="absolute progress-node-fill"></p>'
							+ '<p class="absolute progress-node-text center">' + item + '</p>'
						+ '</div>';
					nodeArr.push(node);
				});
				$progress.html('<div class="clearfix">' + nodeArr.join(bar) + '</div>');
				
				$bars = $progress.find('.progress-bar-fill');
				$nodes = $progress.find('.progress-node-fill');
				
				$progress.bind('nextStep', function() {
					if(animating) {
						return false;
					}
					// 下一步
					if(to == 0) {
						animating = true;
						$nodes.eq(0).css({
							width : '100%'
						});
						++to;
					} else if (to < length) {
						animating = true;
						$bars.eq(to - 1).css({
							width : '100%'
						});
					}
				}).bind('previousStep', function() {
					if(animating) {
						return false;
					}
					// 上一步
					if(to > 0 && to <= length) {
						animating = true;
						$nodes.eq(--to).css({
							width : 0
						});
					}
				}).bind('toStep', function(e, end) {
					end = Math.max(0, end);
					end = Math.min(end, length);
					if(end >=0 && end <= length) {
						// 这里已经触发一次事件了，所以减一
						count = Math.abs(end - to) - 1;
						/**
						 * 这里一定要添加setTimeout，否则可能无法触发transitionend
						 * 1、最典型的情况就是页面一加载完成就触发transition，结果无法触发
						 * 2、transition事件源本身或父级元素不可见时触发transition，无法触发transitionend
						 * 所以在开始触发transition之前确认事件源本身可见（当然其所有父级元素也可见）
						 * 如果页面一加载完成或者事件源本身刚由不可见变为可见就触发transition动画时，一定要造成一点点阻塞，setTimeout是最好的选择，
						 * 或者$(dom).css('width)也可以造成阻塞，但是如$(dom).attr('name')此类的操作不会造成阻塞，
						 * 有此可见获取dom的css属性比获取其它属性更耗费性能
						 */
						setTimeout(function() {
							if(end > to) {
								$progress.trigger(fnName = 'nextStep');
							} else if (end < to) {
								$progress.trigger(fnName = 'previousStep');
							} else {
								count = 0;
								callback(end);
							}
						});
					}
				});
				
				$nodes.bind(eventObj.transitionEvent.end, function() {
					var $this = $(this),
					width = $this.width();
					// trigger('previousStep')，如果to=0，那么是一个node，前面没有bar，所以没有动画了
					if(width == 0 && to > 0) {
						$bars.eq(to - 1).css({
							width : 0
						});
					} else {
						animating = false;
						if(count) {
							$progress.trigger(fnName);
							--count;
						} else {
							// 执行回调
							callback(to);
						}
					}
				});
				
				$bars.bind(eventObj.transitionEvent.end, function() {
					var $this = $(this),
					width = $this.width();
					// trigger('nextStep')
					if(width != 0) {
						$nodes.eq(to).css({
							width : '100%'
						});
						++to;
					} else {
						animating = false;
						if(count) {
							$progress.trigger(fnName);
							--count;
						} else {
							// 执行回调
							callback(to);
						}
					}
				});
			});
		},
		/**
		 * 2016-9-17
		 * 如果没有特殊情况，需要在<textarea>父级元素添加position: relative;
		 * record
		 * <div class="textarea-record">
			   <textarea id="textarea0" class="textarea mt20 ml20">41223143234</textarea>
		   </div>
		   $('.textarea').Record({
				length : 20
		   });
		 */
		Record : function(opt) {
			var $this = $(this),
			param = {
				length : 500,
				// 替换	还可以输入<span class="remanent-length"></span>个字符		必须包含<span class="remanent-length"></span>
				remanentSpan : '',
				// 已经超出<span class="over-length"></span>个字符		必须包含<span class="over-length"></span>
				overSpan : ''
			};
			
			param = $.extend(true, param, opt);
			var maxLength = param.length,
			remanentSpan = param.remanentSpan,
			overSpan = param.overSpan,
			val = $this.val() || '',
			html = '<div class="length-container" custom-record="true">'
					+ '<p class="length-record">' + (remanentSpan || '还可以输入<span class="remanent-length"></span>个字符') + '</p>'
					+ '<p class="over-record">' + (overSpan || '已经超出<span class="over-length"></span>个字符') + '</p>'
				+ '</div>';
			
			$this.each(function(index, item) {
				var $item = $(item),
				$lengthContainer = $item.next('.length-container');
				// 防止重复添加事件
				if($lengthContainer.attr('curtom-record')) {
					return;
				}
				(function($item) {
					$item.after(html);
					var length = ($item.val() || '').length,
					$lengthContainer = $item.next('.length-container'),
					$lengthRecord = $lengthContainer.find('.length-record'),
					$overRecord = $lengthContainer.find('.over-record'),
					$remanentLength = $lengthRecord.find('.remanent-length'),
					$overLength = $overRecord.find('.over-length'),
					// 剩余字符个数
					remanentLength = maxLength - length;
					
					function check(remanentLength) {
						// 没有超出最大字数限制
						if(remanentLength >= 0) {
							$remanentLength.html(remanentLength);
							$overRecord.addClass('hide');
							$lengthRecord.removeClass('hide');
						} else {
							$overLength.html(-remanentLength);
							$lengthRecord.addClass('hide');
							$overRecord.removeClass('hide');
						}
					}
					check(remanentLength);
					
					$item.bind('keyup blur', function() {
						var $item = $(this),
						value = $item.val() || '',
						remanentLength = maxLength - value.length;
						check(remanentLength);
					});
				})($item);
			});
		},
		ShowStage : function(opt) {
			var $this = this,
			DEFAULT_MODE = 'left-to-right',
			option = {
				// 模式	left-to-right（默认）、right-to-left、center-to-sides、sides-to-center
				mode : DEFAULT_MODE,
				closeCallback : $.noop
			};
			
			option = $.extend(true, option, opt);
			var closeCallback = option.closeCallback,
			v = 'stage-' + ZUtil.getVersion();
			
			$this.each(function(index, item) {
				var $container = $(item),
				mode = option.mode,
				animating = false,
				$stage = $container.find('> div[data-version="' + v + '"]');
				if(!$stage.length) {
					var html = '<div class="stage-container hide" data-version="' + v + '">'
								+ '<div class="stage-curtain hide"></div>'
								+ '<div class="stage-curtain-left hide"></div>'
								+ '<div class="stage-curtain-right hide"></div>'
							+ '</div>';
					$container.prepend(html).css({
						position : 'relative'
					});
					$stage = $container.find('> div[data-version="' + v + '"]');
					// 帷幕
					var $curtain = $stage.find('.stage-curtain'),
					$curtains = $stage.find('.stage-curtain-left,.stage-curtain-right'),
					$curtainLeft = $curtains.eq(0),
					$curtainRight = $curtains.eq(1);
					
					$curtain.bind(eventObj.transitionEvent.end, function() {
						if($curtain.width() == 0) {
							$stage.addClass('hide');
							animating = false;
							$curtain.css({
								width : '100%'
							}).addClass('hide');
							closeCallback();
						}
					});
					
					$curtains.bind(eventObj.transitionEvent.end, function() {
						var $this = $(this);
						if($this.width() == 0 && $curtains.eq($curtains.index($this) ^ 1).width() == 0) {
							$stage.addClass('hide');
							animating = false;
							$curtains.css({
								width : '50%'
							}).addClass('hide');
							closeCallback();
						}
					});
					
					$container.bind('show', function(e, curMode) {
						if(typeof curMode == 'string') {
							mode = curMode;
						}
						if(!animating) {
							if(['left-to-right', 'right-to-left', 'center-to-sides', 'sides-to-center'].indexOf(mode) == -1) {
								mode == DEFAULT_MODE;
							}
							animating = true;
							// 父级元素隐藏的时候，子级设置宽度不会触发transition
							if(['left-to-right', 'right-to-left'].indexOf(mode) != -1) {
								$curtain.removeClass('hide');
							} else {
								$curtains.removeClass('hide');
								if(mode == 'center-to-sides') {
									$curtainLeft.css({
										left : 0,
										right : 'auto'
									});
									$curtainRight.css({
										left : 'auto',
										right : 0
									});
								} else if (mode == 'sides-to-center') {
									$curtainLeft.css({
										left : '50%',
										right : 'auto'
									});
									$curtainRight.css({
										left : 'auto',
										right : '50%'
									});
								}
							}
							$stage.removeClass('hide');
							setTimeout(function() {
								if(mode == 'left-to-right') {
									$curtain.css({
										left : 'auto',
										right : 0,
										width : 0
									});
								} else if (mode == 'right-to-left') {
									$curtain.css({
										left : 0,
										right : 'auto',
										width : 0
									});
								} else if (mode == 'center-to-sides' || mode == 'sides-to-center') {
									$curtains.css({
										width : 0
									});
								}
							});
						}
					});
				}
			});
		},
		/**
		 * 2016-9-10
		 * 模拟鼠标滚动
		 * $wrapper高度发生变化时，需要设置滚动条位置以及$wrapper transform
		 * simulate-scroll.css
		 * <div class="scroller">...</div>
		 * $('.scroller').SimulateScroll({
			   unit : 10
		   });
		 */
		SimulateScroll : function(opt) {
			var $this = $(this),
			html = '<div class="relative scroll-container">'
					+ '<div class="absolute scroll-bar scroll-bar-y"></div>'
					+ '<div class="scroll-wrapper"></div>'
				+ '</div>',
			param = {
				// 滚动幅度 10px
				unit : 10,
				// 默认滚动条宽度8px
				barWidth : 8,
				// 滚动条到达顶部或底部的时候body滚动
				bodyScrollable : true
			};
			
			param = $.extend(true, param, opt);
			var unit = param.unit,
			barWidth = param.barWidth,
			bodyScrollable = param.bodyScrollable;
			
			$this.each(function(index, item) {
				var $target = $(item);
				(function($target) {
					var $scroller,
					$wrapper,
					$barY,
					// 鼠标是否悬浮在$wrapper上
					hovering = false,
					// 鼠标是否按下
					mousedowning = false,
					children = $target.find('*').clone(true),
					width = $target.width(),
					height = $target.height();
					
					// 不要重复添加滚动事件
					if($target.find('.scroll-container').length) {
						return;
					}
					
					$target.html(html);
					$scroller = $target.find('.scroll-container'),
					$wrapper = $target.find('.scroll-wrapper');
					$barY = $target.find('.scroll-bar-y');
					$wrapper.append(children);
					$wrapper.attr({
						'data-real-height' : ZUtil.getRect($wrapper).height
					});
					
					// 设置y轴高度
					function setBarY() {
						var wrapperHeight = $wrapper.height(),
						wrapperRect = ZUtil.getRect($wrapper);
						// (height - barY.height) / height = (wrapperHeight - height) / wrapperHeight
						// 1 - barY.height / height = 1 - height /wrapperHeight
						// barY.height = height * height / wrapperHeight
						if(wrapperHeight <= height) {
							$barY.css({
								top : 0,
								width : 0
							});
						} else {
							$barY.css({
								height : height * height / wrapperHeight
							});
							 if(hovering) {
								 $barY.css({
									 width : barWidth
								 });
							 }
						}
					}
					
					function moveBarY(direction, distanceY) {
						var top = parseFloat($barY.css('top')) || 0,
						// 标记滚动条是否到达底部或顶部
						flag = false,
						wrapperHeight = $wrapper.height(),
						barYHeight = $barY.height(),
						translateY = parseFloat($wrapper.attr('data-translateY')) || 0,
						distance;
						// 不能继续滚动
						if((top == 0 && direction == 'up') || (top == wrapperHeight - barYHeight && direction == 'down')) {
							return false;
						}
						// 如果总高度<=可滚动区域高度
						if(wrapperHeight <= height) {
							$wrapper.css({
								transform : 'translateY(0)'
							}).attr({
								'data-translateY' : 0
							});
							return;
						}
						if(direction == 'down') {
							distance = distanceY || unit;
						} else {
							distance = -distanceY || -unit;
						}
						// $wrapper与滚动条方向相反
						translateY -= distance / (height - barYHeight) * (wrapperHeight - height);
						top += distance;
						if(top < 0) {
							top = 0;
							translateY = 0;
							flag = true;
						}
						if(top > height - barYHeight) {
							top = height - barYHeight;
							translateY = height - wrapperHeight;
							flag = true;
						}
						// 如果height+translateY>wrapperHeight，需要调整translateY
						if(height + Math.abs(translateY) > wrapperHeight) {
							translateY = -(wrapperHeight - height);
						}
						$wrapper.css({
							transform : 'translateY(' + translateY + 'px)'
						});
						$wrapper.attr('data-translateY', translateY);
						$barY.css({
							top : top
						});
						return flag;
					}
					
					// 鼠标滚动	ff:DOMMouseScroll	other:mousewheel
					$target.bind('mousewheel DOMMouseScroll', function(e) {
						var wrapperHeight = $wrapper.height(),
						scrollable = true;
						if(wrapperHeight > height) {
							if(e.originalEvent.wheelDelta == -120 || e.originalEvent.detail == 3) {
								scrollable = moveBarY('down');
							} else {
								scrollable = moveBarY('up');
							}
						}
						return scrollable && bodyScrollable;
					}).hover(function() {
						hovering = true;
						setBarY();
					}, function() {
						hovering = false;
						if(!mousedowning) {
							$barY.css({
								width : 0
							});
						}
					});
					
					// 滚动条拖动
					$barY.bind('mousedown', function() {
						$barY.data('dragable', true);
						// 防止滚动的时候选中文本
						ZUtil.forbiddenSelect();
						mousedowning = true;
					});
					
					$(document.body).bind('mousemove', function(e) {
						var y = e.pageY,
						prevY = $barY.data('pageY');
						// 必须是y轴方向发生变化
						if($barY.data('dragable') && prevY) {
							if(y - prevY) {
								var direction = y - prevY > 0 ? 'down' : 'up';
								moveBarY(direction, Math.abs(y - prevY));
							}
						}
						$barY.data('pageY', y);
					}).bind('mouseup', function(e) {
						if($barY.data('dragable')) {
							$barY.data({
								dragable : false,
								pageY : null
							});
							if(!hovering) {
								$barY.css({
									width : 0
								});
							}
							ZUtil.validSelect();
						}
						mousedowning = false;
					});

					function observe() {
						var wrapperRect = ZUtil.getRect($wrapper),
						prevHeight = parseFloat($wrapper.attr('data-real-height')) || 0,
						curHeight = wrapperRect.height;
						// 如果$wrapper的高度发生变化，重新设置$barY
						if(prevHeight != curHeight) {
							$wrapper.attr({
								'data-real-height' : curHeight
							});
							var translateY = Math.abs(parseFloat($wrapper.attr('data-translateY') || 0)),
							curTranslateY = translateY,
							curTop;
							// 设置$barY高度
							setBarY();
							/**
							 * 1、如果translateY部分的区域高度变化了，需要将translateY下面的部分移动，保持translateY不变
							 * 2、如果可视区域下面的部分高度发生变化，只需要调整$barY即可
							 */
							// 1、变小，保持translateY不变
							if(curHeight < prevHeight) {
								if(curHeight < height) {
									// 1.1、$wrapper.height < height，translateY=0，此时$barY已经提前设置了
									curTranslateY = 0;
									curTop = 0;
								} else if(translateY + height > curHeight) {
									// 1.2、translateY + height > $wrapper实际高度，
									curTranslateY = curHeight - height;
									/**
									 * 此时translateY区域高度不变，只需要调整$barY
									 * translateY / (wrapperHeight - height) = top / (height - barYHeight)
									 * top = translateY * (height - barYHeight) / (wrapperHeight - height)
									 */
									curTop = curTranslateY * (height - $barY.height()) / (curHeight - height);
								} else {
									// 1.3、translateY + height < $wrapper实际高度，这种情况下，translateY不变
									curTop = curTranslateY * (height - $barY.height()) / (curHeight - height);
								}
							} else {
								/**
								 * 此时translateY区域高度不变，只需要调整$barY
								 * translateY / (wrapperHeight - height) = top / (height - barYHeight)
								 * top = translateY * (height - barYHeight) / (wrapperHeight - height)
								 */
								curTop = curTranslateY * (height - $barY.height()) / (curHeight - height);
							}
							$wrapper.css({
								transform : 'translateY(-' + curTranslateY + 'px)'
							}).attr({
								'data-translateY' : -curTranslateY
							});
							$barY.css({
								top : curTop
							});
						}
					}
					var MutationObserver = ZUtil.getMutationObserver();
					
					// ie11+、ff、chrome
					if(MutationObserver) {
						// 创建观察者对象
						observer = new MutationObserver(function(mutations) {
							mutations.forEach(function(mutation, index) {
								observe();
							});
						}),
						// 配置观察选项
						config = {
							// 观察新增或删除子节点
							childList : true,
							// 观察子节点变化
							subtree : true,
							// 观察子节点属性变化
							attributes : true,
							attributeOldValue : true
						};
						// 向滚动区域添加观察事件，如果高度发生变化，需要重绘$barY
						observer.observe($wrapper[0], config);
					} else {
						// ie10-
						$wrapper.bind('DOMSubtreeModified', function(e) {
							setBarY();
						});
					}
				})($target);
			});
		},
		/**
		 * 2016-10-10
		 * 星级评分
		 * start.css
		 * <div class="star-container" number="5"></div>
		 * @param	number	星星个数
		 */
		Star : function() {
			this.each(function(index, item) {
				var $starContainer = $(item),
				number = parseFloat($starContainer.attr('number')) || 5,
				html = '<div class="star-bar">',
				id,
				name = ZUtil.generateId();
				for(var i = 1; i <= number; i++) {
					id = ZUtil.generateId();
					html += '<input type="radio" class="score score-' + i + '" name="' + name + '" id="' + id + '" value="' + i + '"/>'
						+ '<label class="star star-' + i + '" for="' + id + '"></label>';
				}
				html += '</div>';
				$starContainer.html(html);
			});
		},
		/**
		 * 2016-9-15
		 * Switch	支持trigger	reset
		 * switch.css
		 * <div id="switch" class="mt5"></div>
		 * $('#switch').Switch({
			   data : ['男', '女']
		   });
		 */
		Switch : function(opt) {
			var $this = this,
			param = {
				// ['男', '女']
				data : [],
				distance : 3
			},
			v = 'switch-' + ZUtil.getVersion(),
			html = '<div class="switch pointer relative" data-version="' + v + '">'
					+ '<div class="switch-node absolute" data-position="left"></div>';
			
			param = $.extend(true, param, opt);
			var data = param.data || [],
			distance = param.distance;
			if(data.length != 2) {
				console.error('data数组长度必须是2');
				return;
			}
			data.forEach(function(item, index) {
				html += '<div class="switch-item absolute" data-index="' + index + '" data-checked="' + (index ? 'N' : 'Y') + '" >' + item + '</div>';
			});
			html += '</div>';
			
			$this.each(function(index, item) {
				var $item = $(item),
				// 该switch是否已经初始化
				inited = !!$item.find('.switch[data-version="' + v + '"]').length;
				
				if(!inited) {
					$item.html(html);
					$item.on('click', '.switch[data-version="' + v + '"]', function() {
						var $switch = $(this),
						$node = $switch.find('.switch-node'),
						position = $node.attr('data-position'),
						$nodeItems = $switch.find('.switch-item'),
						$rightNode = $nodeItems.eq(0),
						$leftNode = $nodeItems.eq(1);
						if(position == 'left') {
							var nodeRect = ZUtil.getRect($node),
							nodeWidth = nodeRect.width,
							switchWidth = $switch.width();
							$node.css({
								transform : 'translateX(' + (switchWidth - nodeWidth - distance) + 'px)'
							}).attr('data-position', 'right');
							$rightNode.attr('data-checked', 'N');
							$leftNode.attr('data-checked', 'Y');
						} else {
							$node.css({
								transform : 'translateX(' + distance + 'px)'
							}).attr('data-position', 'left');
							$leftNode.attr('data-checked', 'N');
							$rightNode.attr('data-checked', 'Y');
						}
					}).bind('reset', function() {
						// for reset
						$item.html(html);
					});
				}
			});
		},
		/**
		 * 2016-9-8
		 * tip.css
		 * 通过attrName值来触发Tip
		 * <p class="mt20 ml20 absolute" data-tip="x234234234xxxx">NO TIP</p>
		 */
		Tip : function(opt) {
			$body = $(document.body),
			param = {
				// tip框左右偏移量
				offset : 5,
				// tip css宽度	默认宽度在css里面.tip-box已经定义
				width : null,
				attrName : 'data-tip',
				header : 'data-tip-header',
				footer : 'data-tip-footer'
			},
			// 提示框id
			id = 'data-tip-' + ZUtil.getVersion();
			
			param = $.extend(true, param, opt);
			var attrName = param.attrName,
			OFFSET = param.offset,
			width = param.width,
			$tip,
			$target;
			
			/**
			 * 计算$tip的位置，默认是显示在target的上方，否则下方；并且靠右，否则靠左
			 *  _______________________
			 * /                       \
			 *|                         |
			 * \                       /
			 *  ———————————————————————
			 *  ______
			 *  \    /
			 *   \  /
			 *    \/
			 */  
			function setPosition() {
				var rect = ZUtil.getRect($target),
				bodyWidth = document.body.clientWidth,
				offsetObj = ZUtil.getOffset($target),
				tipRect = ZUtil.getRect($tip),
				$triangleDown = $tip.find('.triangle-down'),
				$triangleUp = $tip.find('.triangle-up');
				
				$triangleDown.removeClass('hide');
				$triangleUp.removeClass('hide');
				
				var triangleDownRect = ZUtil.getRect($triangleDown),
				triangleUpRect = ZUtil.getRect($triangleUp),
				height = tipRect.height + triangleDownRect.height,
				offsetTop = offsetObj.offsetTop,
				offsetLeft = offsetObj.offsetLeft;
				
				// 垂直方向
				if(height < offsetTop) {
					// 提示框高度+三角形高度 < offsetTop	上方
					$tip.css({
						top : offsetTop - height
					});
					$triangleUp.addClass('hide');
				} else {
					// 如果$tip和三角形高度已经在屏幕外了，需要强行放到下方	下方
					$tip.css({
						top : offsetTop + rect.height + triangleUpRect.height
					});
					$triangleDown.addClass('hide');
				}
				
				// 水平方向
				if((bodyWidth > offsetLeft + tipRect.width + OFFSET) || (offsetLeft + rect.width - OFFSET < tipRect.width)) {
					// target 右边界距离浏览器左边界距离 < minWidth，需要将tip	靠右
					$triangleDown.css({
						left : -3
					});
					$triangleUp.css({
						left : -3
					});
					$tip.css({
						left : offsetLeft + OFFSET
					});
				} else {
					// 提示框最小宽度 + 左边距 > document.body.clientWidth	靠左
					$triangleDown.css({
						left : tipRect.width - 21
					});
					$triangleUp.css({
						left : tipRect.width - 21
					});
					$tip.css({
						left : offsetLeft - tipRect.width + rect.width - OFFSET
					});
				}
			}
			
			$body.on('mouseover', '*[' + attrName + ']', function(e) {
				$target = $(this);
				var header = param.header,
				footer = param.footer;
				$tip = $tip || $('#' + id);
				if($tip.length) {
					$tip.find('.tip-header').html(($target.attr(header) || ''));
					$tip.find('.tip-content').html(($target.attr(attrName) || ''));
					$tip.find('.tip-footer').html(($target.attr(footer) || ''));
					$tip.removeClass('hide');
				} else {
					var html = '<div class="tip-box absolute hide" id="' + id + '">'
								+ '<div class="relative">'
									+ '<span class="triangle triangle-up absolute hide"></span>'
								+ '</div>'
								+ '<div class="tip-header text-break">' + ($target.attr(header) || '') + '</div>'
								+ '<div class="tip-content text-break lh24">' + ($target.attr(attrName) || '') + '</div>'
								+ '<div class="tip-footer text-break">' + ($target.attr(footer) || '') + '</div>'
								+ '<div class="relative">'
									+ '<span class="triangle triangle-down absolute hide"></span>'
								+ '</div>'
							+ '</div>';
					$body.append(html);
					$tip = $('#' + id);
					if(width) {
						$tip.css({
							width : width
						});
					}
					$tip.bind(eventObj.transitionEvent.end, function() {
						if($tip.hasClass('status-hide')) {
							$tip.addClass('hide');
						}
					});
				}
				// 显示
				$tip.removeClass('status-hide hide');
				// 必须要异步，否则没有动画
				setTimeout(function() {
					$tip.css({
						opacity : 1
					});
					setPosition();
				});
			});
			
			// 隐藏
			$body.on('mouseout', '*[' + attrName + ']', function(e) {
				$tip.addClass('status-hide').css({
					opacity : 0
				});
			});
		},
		/**
		 * 绑定modal的show、hide事件
		 * altKey	是否允许按ESC键控制modal隐藏	默认true
		 * $container.trigger('show');
		 */
		ToggleModal : function(showCallback, hideCallback, altKey) {
			var $this = this;
			
			// 防止重复绑定事件
			if($this.attr('data-modal-version')) {
				return false;
			}
			showCallback = showCallback || $.noop;
			hideCallback = hideCallback || $.noop;
			$this.bind(eventObj.transitionEvent.end, function(e) {
				if($this.hasClass('state-show')) {
					showCallback(e);
				} else {
					$this.addClass('hide');
					hideCallback(e);
				}
			}).bind('show', function(e) {
				$this.removeClass('hide').addClass('state-show');
				setTimeout(function() {
					$this.css({
						opacity : 1
					});
				});
			}).bind('hide', function(e) {
				$this.removeClass('state-show').css({
					opacity : 0
				});
			}).bind('click', function(e) {
				// 事件源必须是自身
				if(e.target == $this[0]) {
					$this.trigger('hide');
				}
			})
			
			if(altKey != false) {
				$(document).bind('keydown', function(e) {
					// 只针对当前显示的modal
					if($this.hasClass('state-show')) {
						// ESC
						if(e.keyCode == 27) {
							$this.trigger('hide');
						}
					}
				});
			}
			
			$this.attr('data-modal-version', 'modal-version-' + ZUtil.getVersion());
		},
		/**
		 * demo:
		 * <div class="upload">
		 * 		<div class="z-upload-container"></div>
		 * </div>
		 * <button class="saveUpload">
		 * 		上传
		 * </button>
		 * 
		 * $('upload').UploadFile({
		 * 		
		 * });
		 * 
		 * xhr.abort()中止请求
		 * 新增特性：
		 * 2016-12-8
		 * 1、$container.data('uploading')	将组建上传状态暴露给外部
		 * 2017-2-24
		 * 1、文件分片上传
		 * 2017年5月2日09:13:11
		 * fixed bug
		 * 1、当上传的文件太小，约等于0KB时，进度条会超过100%，使用progress = Math.min(Math.round(loaded / size * 100), 100)取最小值
		 */
		UploadFile : function(opt) {
			var $container = this,
			Accept = {
				video : {
					text : '.rmvb,.rm,.flv,video/x-matroska,video/mp4,video/3gpp,video/avi,video/quicktime,video/x-flv,audio/x-ms-wma,video/x-ms-wmv,video/mpeg',
					suffixs : ['rmvb', 'rm', 'mkv', 'mp4', '3gp', 'avi', 'mov', 'flv', 'wma', 'mpg', 'wmv']
				},
				file : {
					text : '.pdf,.xls,.xlsx,.doc,.docx,.wps,.zip,text/plain',
					suffixs : ['pdf', 'xls', 'xlsx', 'doc', 'docx', 'wps', 'zip', 'txt']				
				}
			},
			option = {
				// 检查容量
				sizeCheckUrl : '',
				uploadUrl : '',
				saveButtonSelector : '.save-file',
				// 默认上传视频
				type : 'video',
				// normal、modal
				mode : 'modal',
				// 是否允许分片上传
				splitUpload : true,
				// 分片上传时，每次上传10M
				splitSize : 10,
				// 相应文件类型提示信息
				tip : '使用不大于 600M的rmvb,rm,mkv,mp4,3gp,avi,mov,flv,wma,mpg,wmv文件',
				fileName : 'file',
				// 默认一次只能上传一个文件，为true时，填加多个input[type="input"]
				multiple : false,
				// 默认0.5秒更新一次上传速度
				speedUpdateInterval : 500,
				// 默认最大文件大小10M单位(MB)
				maxSize : 10,
				systemSizeOver : function() {
					ZUtil.error('已超出系统容量，请联系管理员');
				},
				sizeOver : function(maxSize, realSize) {
					ZUtil.error('允许上传的文件最大为[' + maxSize + ']，实际上传大小为[' + realSize + ']');
				},
				uploadingTip : function() {
					ZUtil.error('正在上传文件，请稍后再操作');
				},
				repeatUpload : function() {
					ZUtil.error('请勿重复上传文件');
				},
				renderCallback : $.noop,
				emptyFile : function(multiple, type) {
					var typeObj = {
						save : '上传',
						select : '选择'
					},
					msg = typeObj[type];
					if(multiple) {
						ZUtil.error('请至少' + msg + '一个文件');
					} else {
						ZUtil.error('请' + msg + '文件');
					}
				},
				invalidType : function(msg) {
					ZUtil.error(msg);
				},
				uploadError : function() {
					ZUtil.error('上传失败');
				},
				// 当multiple为true时，每次添加.z-upload-row时回调，.z-upload-rows重置时也会回调
				rowAddCallback : $.noop,
				// change事件并且文件不为空触发回调
				changeCallback : $.noop,
				// 如果返回false，阻止保存
				beforeSave : function() {
					// 检测清晰度是否有勾选，默认checkbox的外部container是#definition-container'
					/*var $checkboxs = $('#definition-container').find('input[type="checkbox"]:checked');
					if(!$checkboxs.length) {
						ZUtil.error('请至少选择一个转码选择');
						return false;
					}*/
				},
				// 保存回调
				saveCallback : $.noop
			};
			
			option = $.extend(true, option, opt);
			var sizeCheckUrl = option.sizeCheckUrl,
			uploadUrl = option.uploadUrl,
			saveButtonSelector = option.saveButtonSelector,
			mode =option.mode,
			splitSize = option.splitSize * 1024 * 1024,
			splitUpload = option.splitUpload,
			type = option.type,
			acceptObj = Accept[type],
			accept = acceptObj.text,
			suffixs = acceptObj.suffixs,
			tip = option.tip,
			fileName = option.fileName,
			multiple = option.multiple,
			speedUpdateInterval = option.speedUpdateInterval,
			maxSize = option.maxSize * 1024 * 1024,
			systemSizeOver = option.systemSizeOver,
			sizeOver = option.sizeOver,
			uploadingTip = option.uploadingTip,
			emptyFile = option.emptyFile,
			repeatUpload = option.repeatUpload,
			uploadError = option.uploadError,
			invalidType = option.invalidType,
			rowAddCallback = option.rowAddCallback,
			renderCallback = option.renderCallback,
			changeCallback = option.changeCallback,
			beforeSave = option.beforeSave,
			saveCallback = option.saveCallback;
			
			if(!$container.attr('data-version')) {
				var row = '<div class="z-upload-row">'
							+ '<div class="z-upload-cell">'
								+ '<form class="hide">'
									+ '<input type="file" accept="' + accept + '" multiple="false" />'
								+ '</form>'
								+ '<form class="hide">'
									+ '<input type="file" accept="' + accept + '" multiple="false" />'
								+ '</form>'
								+ '<div class="z-progress-bar" tip="' + tip + '"></div>'
							+ '</div>'
							+ '<div class="z-upload-cell z-buttons" multiple="' + multiple + '">'
								+ '<button type="button" class="btn btn-primary btn-sm z-select-button">'
									+ (type == 'video' ? '选择视频' : '上传文件')
								+ '</button>'
								+ '<button class="btn btn-primary btn-sm z-upload">'
									+ '上传'
								+ '</button>'
								+ '<button class="btn btn-primary btn-sm z-upload-delete">'
									+ '删除'
								+ '</button>'
							+ '</div>'
						+ '</div>',
				html = '<div class="z-upload-rows">' + row + '</div>'
					+ '<div class="z-upload-operations hide">'
						+ '<button class="btn btn-primary z-upload-add br0 btn-sm">'
							+ '新增'
						+ '</button>'
					+ '</div>';
					
				var $uploadContainer = $container.find('.z-upload-container');
					
				// 开发者自己调整保存按钮位置
				$uploadContainer.html(html);
				renderCallback();
				
				$container.attr('data-version', 'z-upload-' + ZUtil.getVersion());
				
				var $rows = $container.find('.z-upload-rows');
				$operations = $container.find('.z-upload-operations'),
				$add = $operations.find('.z-upload-add');
				
				// 重置插件
				$container.bind('reset', function(e) {
					// 事件源必须是$container,同时这里不能返回false，否则会中断子dom-->form的reset()
					if(e.target == $container[0]) {
						$rows.html(row);
					}
				});
				
				if(mode == 'modal') {
					$container.ToggleModal(function() {
						$container.trigger('reset');
					});
				}
				
				// 多文件上传
				if(multiple) {
					$operations.removeClass('hide');
					
					$add.bind('click', function() {
						$rows.append(row);
						var $row = $rows.find('.z-upload-row:last-child');
						rowAddCallback($row);
					});
					
					$rows.on('click', '.z-upload-delete', function() {
						var $delete = $(this);
						
						if(isUploading() == false) {
							return false;
						}
						
						// 点击第一个删除	无效
						if($rows.index($delete) == 1) {
							return false;
						}
						$delete.closest('.z-upload-row').remove();
					});
				}
				
				// 文件change事件
				$rows.on('change', 'input[type="file"]', function() {
					var $file = $(this),
					file = this.files[0],
					$row = $file.closest('.z-upload-row'),
					$upload = $row.find('.z-upload');
					
					// .z-upload暂时不可点击
					$upload.removeClass('.btn-primary');
					
					// 取消
					if(!file) {
						return false;
					}
					
					// 校验文件类型
					if(!validateAccept(file)) {
						invalidType('请上传[' + suffixs.join(', ') + ']格式的文件');
						$file.closest('form')[0].reset();
						return false;
					}
					
					// 检测文件大小
					var size = file.size;
					if(size > maxSize) {
						sizeOver(ZUtil.translateByte(maxSize), ZUtil.translateByte(size));
						return false;
					}
					
					// 检测系统容量
					if(sizeCheckUrl) {
						var valid = true,
						$form = $file.closest('form');
						$.ajax({
							url : sizeCheckUrl,
							data : {file_size : size},
							async : false,
							success : function(data) {
								if(!data.success) {
									valid = false;
									$form[0].reset();
									systemSizeOver();
								}
							},
							error : $.fn.error
						});
						
						// 设置.z-progress-bar
						if(!valid) {
							return false;
						}
					}
					
					setProgressBar($row, file);
					
					// 可以点击.z-upload
					$upload.addClass('btn-primary');
					$row.removeData('file');
					
					changeCallback();
				});
				
				// 选中按钮
				$rows.on('click', '.z-select-button', function() {
					if(isUploading() == false) {
						return false;
					}
					
					var $row = $(this).closest('.z-upload-row'),
					/**
					 * 这里有两个input[type="file"]，找到第一个files.length=0的目标进行click()
					 * 这么做的原因是change事件，可能不选择文件，造成文件丢失
					 */
					$files = $row.find('input[type="file"]');
					for(var i = 0, length = $files.length; i < length; i++) {
						var fileInput = $files.get(i);
						if(!fileInput.files.length) {
							$(fileInput).click();
							break;
						}
					}
				});
				
				// 上传
				$rows.on('click', '.z-upload', function(event) {
					var $upload = $(this),
					$row = $upload.closest('.z-upload-row'),
					$files = $row.find('input[type="file"]'),
					file;
					
					// 找有效文件
					$files.each(function(index, item) {
						var files = item.files;
						if(files.length) {
							file = files[0];
						}
					});
					
					if(isUploading() == false) {
						return false;
					}
					
					// 文件不存在
					if(!file) {
						emptyFile(multiple, 'select');
						return false;
					}
					
					// 重复上传
					if($row.data('file')) {
						repeatUpload();
						return false;
					}
					
					// 只有上传视频时需要校验是否选择转码要求
					if(option.type == 'video' && beforeSave() == false) {
						return false;
					}
					
					uploadFile($row, file);
				});
				
				$container.on('click', saveButtonSelector, function() {
					var $rowDivs = $rows.find('.z-upload-row');
					
					if(isUploading() == false) {
						return false;
					}
					
					// 判断multiple是否为true
					if(multiple) {
						save();
					} else {
						// 如果是单文件上传，点击保存按钮时先上传文件，然后执行回调
						$rows.find('.z-upload').click();
					}
				});
				
				function getFileUploads() {
					var $rowDivs = $rows.find('.z-upload-row'),
					fileUploads = [];
					
					// 检测是否有文件
					$rowDivs.each(function(index, item) {
						var fileUpload = $(item).data('file');
						if(fileUpload) {
							fileUploads.push(fileUpload);
						}
					});
					return fileUploads;
				}
				
				// 保存到数据库
				function save($rowDivs) {
					var fileUploads = getFileUploads();
					
					if(!fileUploads.length) {
						emptyFile(multiple, 'save');
						return false;
					}
					
					// 只有上传视频时需要校验是否选择转码要求
					if(option.type == 'video' && beforeSave(fileUploads) == false) {
						return false;
					}
					
					saveCallback(fileUploads);
				}
				
				function beforeUpload($row, $upload) {
					$upload.removeClass('btn-primary');
					$container.data('uploading', true);
					
					var $progressLinear = $row.find('.z-upload-progress-linear');
					$progressLinear.addClass('z-uploading');
				}
				
				function afterUpload($row, $upload, fileUpload) {
					// 将返回的文件服务器路径相关信息保存在input[type="file"]
					if(fileUpload) {
						$row.data('file', fileUpload);
					} else {
						// 如果上传没有成功，添加.btn-primary
						$upload.addClass('btn-primary');
						
					}
					$container.data('uploading', false);
					
					var $progressLinear = $row.find('.z-upload-progress-linear');
					$progressLinear.removeClass('z-uploading');
				}
				
				// 是否正在上传
				function isUploading() {
					if($container.data('uploading') == true) {
						uploadingTip();
						return false;
					}
				}
				
				// 校验上传的文件是否可接受
				function validateAccept(file) {
					var name = file.name,
					arr = name.split('\.'),
					length = arr.length,
					suffix = arr[length - 1].toLowerCase();
					
					for(var i = 0; i < length; i++) {
						if(suffixs.indexOf(suffix) == -1) {
							return false;
						}
					}
					return true;
				}
				
				// 设置.z-progress-bar
				function setProgressBar($row, file) {
					var $bar = $row.find('.z-progress-bar'),
					innerHtml = '<div class="z-file-name z-upload-cell">'+ file.name + '</div>'
								+ '<div class="z-upload-progress z-upload-cell">进度：0% of ' + ZUtil.translateByte(file.size) + '</div>'
								+ '<div class="z-upload-speed z-upload-cell">速度：0KB/s</div>'
								+ '<div class="z-upload-progress-linear"></div>';
					$bar.html(innerHtml);
				}
				
				// 上传文件
				function uploadFile($row, file) {
					var $upload = $row.find('.z-upload');
					
					beforeUpload($row, $upload);
					
					var xhr = ZUtil.getXHR(),
					formData = new FormData(),
					// 上次的时间戳
					prev = new Date().getTime(),
					// 以上传
					load = 0,
					// 文件大小
					size = file.size,
					translateSize = ZUtil.translateByte(size),
					prevProgress = 0,
					$bar = $row.find('.z-progress-bar'),
					$progress = $row.find('.z-upload-progress'),
					$speed = $row.find('.z-upload-speed'),
					$progressLinear = $row.find('.z-upload-progress-linear');
					
					formData.append('uniqueFlag', Date.now());
					formData.append('fileName', file.name);
					
					xhr.addEventListener('error', uploadError, false);
					xhr.upload.addEventListener('progress', function(e) {
						// 不管分几次上传，只要是同一个xhr，e.loaded就会继续增加
						var loaded = e.loaded,
				    	// 当前时间戳
				    	now = new Date().getTime(),
				    	distance = now - prev;
						
						var progress = Math.min(Math.round(loaded / size * 100), 100);
						// 每次更新的时间间隔 >= speedUpdateInterval，或者上传完毕
						if(distance >= speedUpdateInterval || progress == 100) {
							var speed = ZUtil.translateByte((loaded - load) / distance * 1000);
							$speed.html('速度：' + speed + '/s');
							prev = now;
							load = loaded;
						}
						if(progress != prevProgress) {
							prevProgress = progress;
							$progress.html('进度：' + progress + '% of ' + translateSize);
							$progressLinear.css({
								width : progress + '%'
							});
						}
					}, false);
					
					xhr.onreadystatechange = function(e) {
						var readyState = xhr.readyState,
						status = xhr.status;
						
						if(readyState == 4 && status == 200) {
							var response = e.target.response;
							response = response && JSON.parse(response);
							
							// success可能会变动
							if(response.success) {
								if(splitUpload) {
									if(index < totalIndex) {
										start = end;
										// 继续发送分片文件
										send();
									} else {
										afterUpload($row, $upload, response);
										!multiple && save($row);
									}
								} else {
									afterUpload($row, $upload, response);
									!multiple && save($row);
								}
							}
						}
						
						if(status >= 500) {
							afterUpload($row, $upload);
							uploadError();
						}
					};
					
					// 是否分片上传
					if(splitUpload) {
						// 每次上传1M
						var totalIndex = Math.ceil(size / splitSize),
						start = 0,
						end = 0,
						index = 0;
						formData.append('totalIndex', totalIndex);
						send();
					} else {
						xhr.open('post', uploadUrl, true);
						formData.append(fileName, file);
						xhr.send(formData);
					}
					
					function send() {
						// 必须使用异步（true），才能监控progress
						xhr.open('post', uploadUrl, true);
						if(size - start < splitSize) {
							end = size;
						} else {
							end = splitSize + start;
						}
						
						formData['delete']('index');
						formData.append('index', ++index);
						formData.append(fileName, file.slice(start, end));
						xhr.send(formData);
					}
				}
			}
		}
	});
	
	$.ajaxSetup({
		error : $.fn.error
	});
})();