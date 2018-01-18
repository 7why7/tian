//加载购物车内容
$.ajax({
	url:"data/02-cart/list.php",
	success:function(result){
		if(result.code===200){
			var html='';
			if(result.data.length){
				$.each(result.data,function(i,l){
					console.log(l.price * l.count);
					html +=`
					<div id="imfor">
					  <div class="check">
						<img src="images/cart/product_normal.png" alt=""/>
					  </div> 
					  <input type="hidden" name="lid" value="${l.lid}">
					 <div class="pudc_information" id="${l.iid}">
 						<a  href="detail.html?lid=${l.lid}"> 
							<img class="p_img" src="${l.pic}" alt=""> 
 						</a> 
 					<div class="details-txt"> 
 						<a>${l.title}</a> 
 					<p class="p1">${l.subtitle}</p> 
 					</div> 
 					</div> 

 					<div class="details-money"> 
 						${l.price}  						
 					</div>
					<div class="num">
						<span class="reduc">&nbsp;-&nbsp;</span>
						<input class="col_num" type="text" value="${l.count}">
						<span class="add">&nbsp;+&nbsp;</span>
					</div>
					<div class="totle">
					  <span>¥</span>
					  <span class="totle_information">${l.price * l.count}</span>
					</div>
					<span class="del" data-iid="${l.iid}">
						<a href="javascript:;" class="del_d">删除</a>
					</span>
					</div>
					`;
				})
			}else{
					$('#none').show;
				}
			$('#session').html(html);
		}
	}
})

$(function(){
	if(!$("#imfor")){
		$('#session').hide();
		$('#none').show;
	}


adddel();
$('#imfor').each(function(){
	var price=parseFloat($(this).html());
	var amount = parseFloat($(this).children('.num').children('input').val());
	var amountPrice=price * amount;
	//$(this).children('.totle').children('.totle_information').html(amountPrice.toFixed(2));
});

//全选
$(".all").click(function(){
	amountadd();
	if($('.all>span').hasClass('normal')){
		$('.all>span').addClass('true').removeClass('normal');
		$('.all>span>img').attr('src','images/cart/product_true.png');
		$("#imfor>.check>img").attr('src','images/cart/product_true.png')
	total();
	}else{
		$('.all>span').addClass('normal').removeClass('true');
		$('.all>span>img').attr('src','images/cart/product_normal.png');
		$('Each>span').addClass('normal').removeClass('true');
		$("#imfor>.check>img").attr('src','images/cart/product_normal.png')
		$(".susum").text(0.00);
		$(".susumOne").text(0.00);
		$(".total").text(0);
		$(".totalOne").text(0);
	}
})

//单选

$('#session').on('click','.check',function(){
	amountadd();
	$('.all>span').addClass('normal').removeClass('true');
	$('.all>span>img').attr('src','images/cart/product_normal.png');
	if($(this).hasClass('normal')){
		$(this).addClass('true').removeClass('normal');
		$(this).children('img').attr('src','images/cart/product_true.png');
		var amou = parseInt($('.total').text());
		amou++;
		$('.total').text(amou);
		$('totalOne').text(amou);
		amountadd();
		var iid=$(this).parent().parent().children('.pudc_information').attr('id');
		$.ajax({
			type:"POST",
			url:'data/02-cart/update_checked.php',
			data:{iid:iid,checked:1},
				success:function(result){
				console.log(result);
			}
		})
			/*
	var $check=$('#session .check').hasClass("true");
    var $img=$('#session .check>img');
    for(var i=0;i<$img.length;i++){
	   if($($img[i]).attr("src")=='images/cart/product_true.png')
		   $("#imfor>.all img").attr("src","images/cart/product_normal.png")
	   else
		  $("#imfor>.all img").attr("src","images/cart/product_true.png")   
	}*/
	}else{
	  $(this).addClass('normal').removeClass('true');
      $(this).children('img').attr('src', 'images/cart/product_normal.png');
      var amou = parseInt($('.total').text());
      amou--;
	  console.log(amou)
	  $('.total').text(amou);
      $('.totalOne').text(amou);
      var newamo = parseInt($('.susum').text()) - parseInt($(this).parent().parent().siblings('.totle').children('.totle_information').text());
      $('.susum').text(newamo.toFixed(2));
      $('.susumOne').text(newamo.toFixed(2));
      var iid = $(this).parent().parent().children('.pudc_information').attr('id');
	   $.ajax({
        type: 'POST',
        url: 'data/02-cart/update_checked.php',
        data: {iid:iid, checked: 0},
        success: function(result){
          console.log(result);
        }
      })
		}
})
})
//删除当前行
  $('#session').on('click', '.del_d', (function () {
    var me = this;
	var iid=$(me).parent().data("iid");
    var id = $(this).parent().children('.pudc_information').attr('id');//id无
    //$('.modal').fadeIn();
    
      $.ajax({
        type: "POST",
        url: "data/02-cart/del.php",
        data: {iid:iid},
        success: function (result) {
          //$('.modal').fadeOut();
          if(result.code==200){
            $(me).parent().parent().remove();
          }else {
            alert('<b>删除失败！</b><p>错误原因为：'+result.msg+'</p>')
          }
        }
      });
  }));
//合计
function total() {
  var sum = 0.00;
  var amount = 0;
  $(".totle_information").each(function () {
    sum += parseInt($(this).text());
    $(".susum").text(sum.toFixed(2));
    $(".susumOne").text(sum.toFixed(2));
    amount++;
    $('.total').text(amount);
    $('.totalOne').text(amount);
  })
}
// 单独
function amountadd() {
  var amo = 0;
  $('.Each>span').each(function () {
    if ($(this).hasClass('true')) {
      amo += parseInt($(this).parent().parent().siblings('.totle').children('.totle_information').text());
    }
  })
  $('.susum').text(amo.toFixed(2));
  $('.susumOne').text(amo.toFixed(2));
}
function adddel() {
  //小计和加减
  //加
  $("#session").on('click', '.add', (function () {
    var $multi = 0;
    var vall = $(this).prev().val();
    vall++;
    $(this).siblings("input").val(vall);
    $multi = (parseInt(vall) * parseFloat($(this).parent().prev().text()));
	console.log(vall,parseFloat($(this).parent().prev().text()));
    $(this).parent().next().children().eq(1).text(Math.round($multi).toFixed(2));
    amountadd();
    var id = $(this).parent().children('.pudc_information').attr('id');
    var num = $(this).prev().val();
    $.ajax({
      type: "POST",
      url: "data/02-cart/update_count.php",
      data: {iid: id, count: num},
      success: function (data) {
        console.log(data);
      }
    });
  }));
//减

  $("#session").on('click', '.reduc', (function () {
    var $multi1 = 0;
    var vall1 = $(this).next().val();
    vall1--;
	console.log(vall1)
    if (vall1 <= 0) {
      vall1 = 1;
    }
    $(this).next().val(vall1);
    $multi1 = parseInt(vall1) * parseFloat($(this).parent().prev().text());
    $(this).parent().next().children().eq(1).text(Math.round($multi1).toFixed(2));
    amountadd();
    var id = $(this).parent().children('.pudc_information').attr('id');
    var num = $(this).next().val();
    $.ajax({
      type: "POST",
      url: "data/02-cart/update_count.php",
      data: {iid: id, count: num},
      success: function (data) {
        console.log(data);
      }
    });
  }));
}

//去结算
var str = [];
var totalPrice = 0;
$('#go-buy').click(function () {
  var totalPrice = parseFloat($('.susumOne').html());
  if(totalPrice<=0){
    //alertMsg('请勾选您确定购买的商品！');
  }else {
    //location.href = 'new.html';
  }
})





