
//添加页码
function pageLoad(pno){
	var kw=location.search.split("=")[1];
//	console.log(kw);
	$.ajax({
		type:"GET",
		url:"data/new-page.php",
			data:{pno:pno,kw:kw},
		success:function(pager){
		var obj=pager.data;
			var html="";
			$.each(obj,function(i,j){
//				console.log(i,j);
            console.log(j.lid)
			html+=`
				<div class="a-title">	
				<a href="detail.html?lid=${j.lid}">
						<img src=${j.pic} alt="">
				</a>
						<div class="details-txt">
							 <p>${j.title}</p>
							<div>
								<span class="s1">460人购买</span>
								<em>100%</em>
								<span class="s2">好评</span>
							</div>
							<p class="p1">${j.promise}</p>
							<div class="details-money">${j.price}
			                    <span>起/份</span>
								<input class="addcart" type="button" value="加入购物车" data-lid=${j.lid}>
							</div>
						</div>
					</div>
			`;
				
			})
					
				$("#result-border").html(html);

		var pageCount=parseInt(pager.pageCount);
			console.log(pageCount);
		var pageNo=pager.pageNo;
		console.log(pageNo);
		var list="";
		for(var i=0;i<pageCount;i++){
			list+=((i+1)!=pageNo?`<a href="#">${i+1}</a>`:
				`<a href="#" class="current">${i+1}</a>`);
		} 
		var html=
			`<a href="#" class="previous">上一页</a>${
			list
		  }<a href="#" class="next">下一页</a>`;
			var divPages=document.getElementById("pages");
		divPages.innerHTML=html;
		if(pageNo==1){
		  divPages.firstElementChild.className=
			"previous disabled";
		}else if(pageNo==pageCount){
		  divPages.lastElementChild.className=
			"next disabled";
		}else{
		  divPages.firstElementChild.className=
			"previous";
		  divPages.lastElementChild.className=
			"next";
		}

		var as=divPages.querySelectorAll(":not(.previous):not(.next)");
		console.log(as);
		}
	})
		pages.onclick=e=>{
			var pag=e.target;
			console.log(pag);
				if(pag.className.indexOf("disabled")==-1){
					var curr=pages.querySelector(".current");
					console.log(curr.innerHTML);
					if(pag.innerHTML=="上一页"){
						pageLoad(parseInt(curr.innerHTML)-1);
					}else if(pag.innerHTML=="下一页"){
						pageLoad(parseInt(curr.innerHTML)+1);
					}else{
						pageLoad(pag.innerHTML);
					}
				}
	}
}
pageLoad(1);


/**添加到购物车**/
$('#result-border').on('click', '.addcart',function (e) {
	var lid=$(this).data("lid");
  console.log($('#result-border'));
  var title = $(this).parent().parent().children('p:first').html();
  var id = $(this).parent().parent().parent().attr('class');
  
  console.log(title);
//  var price = $(this).parent().children().first().html().slice(0,-3);
  var price = $(this).parent().text().split(" ")[0];
  console.log(price);
  var num = $(this).parent().parent().parent().find('input').val();
  console.log(num)
  var length = $('.store_action_right_cart_content>div').size();
  var one_total_price = (price * 1).toFixed(2);
  console.log(one_total_price)
  $('.store_action_right_cart_content>div').each(function (elem,i) {
	   console.log(elem,i)
	   //var content=$(i).children("span").first().html()
    if ($(this).attr('id') === id) {
      var one_cartnum = parseFloat($(this).find('input').val());
      var one_cartprice = parseFloat($(this).find('.cart_unit_price').html());
      var newnum = one_cartnum ;
	  //console.log(newnum)
      $(this).find('input').val(newnum);
      $(this).find('.cart_unit_price').html((one_cartprice + parseFloat(one_total_price)).toFixed(2));
	  //console.log($(this));
	  //console.log($(this).find('input').val())
    }else {
      length--;
	  var html="";
      if (length === 0) {
         html = "<div id=" + id + " class='addtion' data-lid='"+lid+"'><span style='display: inline-block;width:75px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;' title='"+title+"'>" + title + "</span><div><span class='cart_reduc lf'>-</span><input type='text' value=" + 1 + " class='lf'/><span class='cart_add lf'>+</span></div><span class='rt pc'>￥:<span class='cart_unit_price'>" + one_total_price + "</span></span></div>";
        $('.store_action_right_cart_content').append(html);
      }else{
	      html+= "<div id=" + id + " class='addtion' data-lid='"+lid+"'><span style='display: inline-block;width:75px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;' title='"+title+"'>" + title + "</span><div><span class='cart_reduc lf'>-</span><input type='text' value=" + 1 + " class='lf'/><span class='cart_add lf'>+</span></div><span class='rt pc'>￥:<span class='cart_unit_price'>" + one_total_price + "</span></span></div>";
         $('.store_action_right_cart_content').append(html);
	  }
	  
    
	  }
  })
  total();
   var lids=$('.store_action_right_cart_content').find("[data-lid]");
   for(var i=0;i<lids.length;i++){
	   var lid=$(lids[i]).data("lid")
        var count=parseInt($(lids[i]).find("input").val());
       $.ajax({
	     type:"GET",
		 url:"data/02-cart/add.php",
		 data:{lid:lid,buyCount:count}
	   })
   }
})

function total() {
  var total = parseFloat(0.00);
  $('.store_action_right_cart_content>div.addtion').each(function () {
    var op = parseFloat($(this).find('.cart_unit_price').text());
    total += op;
  })
  $('.total_price span').html(total.toFixed(2));
}

$('.store_action_right_cart_content').delegate('.cart_reduc', 'click', function () {
  var numone = parseFloat($(this).next('input').val());
  numone -= 1;
  if (numone == 0) {
    $(this).parent().parent().remove();
  }
  if (numone >= 1) {
    $(this).next('input').val(numone);
    var id = $(this).parent().parent().attr('id');
    var this_price = $('.salc_content').find("#" + id).find('.price').text();
    var new_this_price = numone * this_price;
    $(this).parent().next('span').find('.cart_unit_price').html(new_this_price.toFixed(2));
  }
  total();
});
//$(".settle").on("click","a",(e)=>{
//   e.preventDefault();
//   var lid = $("")
//  var count
//	$.ajax({
//	   type:"GET",
//	   url:"data/02-cart/add.php",
//   }).then((data)=>{
//	  location.href="";  
//	  
//	  })
//});