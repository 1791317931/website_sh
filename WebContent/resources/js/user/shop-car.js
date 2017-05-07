$(function() {
	
	$.ajax({
		url : base_url + 'shopcar/list/byUserId',
		success : function(result) {
			var html = '',
			list = result.data || [];
			
			for(var i = 0, length = list.length; i < length; i++) {
				var product = list[i];
				html += '<div class="table-row cg">'
						+ '<div class="w30 table-cell">'
							+ '<input type="checkbox" />'
						+ '</div>'
						+ '<div class="table-cell w250 p5">'
							+ '<p>' + product.name + '</p>'
							+ '<img class="w220 h120" src="' + base_img + '" />'
						+ '</div>'
						+ '<div class="table-cell vt p5 text-left text-break">'
							+ '<p class="f13">' + (product.description || '暂无描述') + '</p>' 
						+ '</div>'
						+ '<div class="table-cell w130 cr">' + product.price + '</div>'
						+ '<div class="table-cell w130">'
							+ '<div class="table w130 margin-auto">'
								+ '<div class="table-cell sub w20 btns">-</div>'
								+ '<div class="table-cell">'
									+ '<input class="product_count" type="text" value="' + product.count + '" />'
								+ '</div>'
								+ '<div class="table-cell add w20 btns">+</div>'
							+ '</div>' 
						+ '</div>'
						+ '<div class="table-cell w130">' + (product.count * product.price) + '</div>'
						+ '<div class="table-cell w100">'
							+ '<span class="for-edit">删除</span>'
						+ '</div>'
					+ '</div>';
			}
			$('.product-list').html(html);
		}
	});
	
});