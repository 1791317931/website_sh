$(function() {
	
	$.ajax({
		url : base_url + 'const/page',
		data : {
			pageSize : 10,
			currentPage : 1,
			type : 'user_type'
		},
		success : function(data) {
			var html = '',
			list = data.page.list;
			for(var i = 0, length = list.length; i < length; i++) {
				var product = {
					name : '商品' + i,
					description : '描述' + i,
					count : i + 1,
					price : 100 * (i + 1)
				};
				html += '<div class="table-row cg">'
						+ '<div class="w50 table-cell">'
							+ '<input type="checkbox" />'
						+ '</div>'
						+ '<div class="table-cell w250 p5">'
							+ '<img class="w220 h120" src="' + base_url + 'resources/imgs/' + (i + 1) + '.jpg" />'
						+ '</div>'
						+ '<div class="table-cell vt p5 text-left text-break">'
							+ '<p>' + product.name + '</p>'
							+ '<p class="f13">' + product.description + '</p>' 
						+ '</div>'
						+ '<div class="table-cell w130 cr">' + product.price + '</div>'
						+ '<div class="table-cell w130">'
							+ '<div class="table w110 margin-auto">'
								+ '<div class="table-cell sub w20 btns">-</div>'
								+ '<div class="table-cell">'
									+ '<input class="product_count" type="text" value="' + product.count + '" />'
								+ '</div>'
								+ '<div class="table-cell add w20 btns">+</div>'
							+ '</div>' 
						+ '</div>'
						+ '<div class="table-cell w130">' + (product.count * product.price) + '</div>'
						+ '<div class="table-cell w100">'
							+ '<a href="javascript:void(0);">删除</a>'
						+ '</div>'
					+ '</div>';
			}
			$('.product-list').html(html);
		}
	});
	
});