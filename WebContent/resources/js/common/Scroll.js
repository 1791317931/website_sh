/**
 * 瀑布流加载数据
 * javabean:com.qimooc.common.core.page.PageScroll
 * 说明：每次滚动加载数据的间隔interval，也就是ajax-->success执行间隔interval后才能继续滚动加载数据
 * 如果需要显示交互信息可以在当前dom元素内添加
 * *.loadMore(加载更多),*.loading(正在加载中...,css{display:none})
 * 用法：
 * (1)、<div id="container" style="overflow-y: auto;"></div>
 * 		<div class="loading hide">数据加载中...</div>
 * 		<div class="no-more hide">没有更多数据了</div>
 *     $('#container').Scroll({
 *     							self : true,
 *     							url : ''
 *     						});
 * (2)、<div id="container"></div>
 * 		<div class="loading hide">数据加载中...</div>
 * 		<div class="no-more hide">没有更多数据了</div>
 *     $('#container').Scroll({
 *     							url : ''
 *     						});
 */

(function() {
	function Scroll(opt) {
		var option = {
			// 数据加载间隔时间(ms)
			interval : 1000,
			// 距离底部50px时加载
			offsetBottom : 50,
			// !!!!!!!!!默认使用document作为滚动监听对象,为true时，使用自身作为滚动监听对象，此时需要设置css{min-height以及overflow-y: auto};
			self : false,
			url : '',
			data : {
				pageSize : 10,
				currentPage : 1
			},
			beforeSend : beforeSend,
			complete : complete,
			beforeScroll : $.noop,
			success : success,
			error : $.fn.error
		};
		var $this = this, callback = opt.success;
		opt.success = option.success;
		option = $.extend(true, option, opt);
		
		var beforeScroll = option.beforeScroll;
		
		$this.bind('load', function(e, opt) {
			option.data = $.extend(true, option.data, opt);
			$.ajax(option);
		});
		
		$this.bind('reload', function() {
			option.data.currentPage = 1;
			$.ajax(option);
		});
		
		// 可以继续加载数据
		function setState(obj) {
			var data = obj.data,
			totalCount = data.totalCount,
			pageSize = data.pageSize,
			$noMore = $this.siblings('.no-more');
			if(totalCount > data.currentPage * pageSize) {
				$this.isReady = true;
				$this.preTime = new Date().getTime();
				$noMore.addClass('hide');
			} else if (totalCount) {
				$this.siblings('.no-more').removeClass('hide');
			} else {
				$noMore.addClass('hide');
			}
		}
		function beforeSend() {
			$this.siblings('.loading').removeClass('hide');
		}
		function complete() {
			$this.siblings('.loading').addClass('hide');
		}
		function success(data) {
			data = typeof data == 'string' && JSON.parse(data) || data;
			typeof callback === 'function' && callback(data);
			setState(data);
		}
		/**
		 * scrollTop	滚动条距离顶部距离
		 * clientHeight	页面可视内容区高度
		 * scrollHeight	页面实际高度
		 */
		// body滚动条到达底部
		function bodyIsBottom() {
			var scrollTop = clientHeight = scrollHeight = 0;
			if(document.body) {
				scrollTop = document.body.scrollTop;
			} else if(document.documentElement && document.documentElement.scrollTop) {
				scrollTop = document.documentElement.scollTop;
			}
			if(document.body.clientHeight && document.documentElement.clientHeight) {
				clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
			} else {
				clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
			}
			scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
			// 如果body没有滚动条，默认到达底部
			return document.body.offsetHeight == scrollHeight || scrollTop + clientHeight >= scrollHeight - option.offsetBottom;
		}
		// dom滚动条到达底部
		function domIsBottom() {
			var scrollObj = $scrollObj[0],
			scrollTop = scrollObj.scrollTop || 0,
			clientHeight = scrollObj.clientHeight || 0,
			scrollHeight = scrollObj.scrollHeight || 0;
			// 如果dom没有滚动条，默认到达底部
			return scrollObj.offsetHeight == scrollHeight || scrollTop + clientHeight >= scrollHeight - option.offsetBottom;
		}
		var isBottom = option.self && domIsBottom || bodyIsBottom;
		
		$.ajax(option);
		
		$scrollObj = !option.self && $(document) || $this;
		// 为了解决ace带来的bug，必须判断添加滚动加载事件的dom元素是否存在，并且带有滚动加载的标志参数
		$this.attr('scroll-flag', true);
		$scrollObj.unbind('mousewheel DOMMouseScroll').bind('mousewheel DOMMouseScroll', function(e) {
			function getData() {
				if(typeof beforeScroll == 'function' && beforeScroll() == false) {
					return false;
				}
				// 每次都要重新获取dom元素，使用ace不会刷新页面，所以绑定的Event会一直存在
				var $scrollOriginDom = $($this.selector);
				if($scrollOriginDom && $scrollOriginDom.length && $scrollOriginDom.attr('scroll-flag')) {
					var curTime = new Date().getTime(),
					isReady = $this.isReady;
					if((e.originalEvent.wheelDelta || !e.originalEvent.detail) < 0
							&& isBottom()
							&& isReady
							&& curTime - $this.preTime >= option.interval
					) {
						option.data.currentPage += 1;
						$this.isReady = false;
						$.ajax(option);
					}
				} else {
					// 解绑
					$scrollObj.unbind('mousewheel');
				}
			}
			getData();
		});
		return $this;
	}
	
	$.fn.extend({
		Scroll : Scroll
	});
})();