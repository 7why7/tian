
		
//导航条固定
//为当前窗口添加滚动事件监听
	window.addEventListener("scroll",()=>{
	//(防止和页面内容中的其它滚动事件冲突)
      //获得滚动高度:
	  var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	  //如果滚动高度>=300

	  if(scrollTop>=300)
//设置id为header下的class为main的div的class为main和fixed
		  document.querySelector(
			"#header"	  
		  ).className="fixed";
		  
	  else
		  document.querySelector(
		"#header"	  
	  ).className="";
});
//*************轮播图**************//

	(()=>{
		ajax("get","data/01-index/banner.php","")
			.then(data=>{
			const LWIDTH=1170;
			var htmlImgs="";
			var htmlIdxs="";
			for(var p of data){
				htmlImgs+=`<li>
					<a href="${p.href}" title="${p.title}">
						<img src="${p.img}">
					</a>	
				</li>`;
//				htmlIdxs+="<li></li>"
			}
			 var bannerImg=document.getElementById("banner-img");
//			 console.log(bannerImg);
				 bannerImg.style.width=LWIDTH*data.length+"px";
				bannerImg.innerHTML=htmlImgs;
				document.getElementById("indicators")
						.innerHTML=htmlIdxs;
				document.getElementById("indicators").innerHTML= "<li></li>".repeat(data.length-1);
				$("#indicators>li:first").addClass("hover");
//				console.log(data.length);
		var list=document.getElementById("banner-img"),//获取滚动图块的ul
		i=0,
		timer=null,
		width=1170,	//图片宽度
		li=list.querySelectorAll("li");	//查找banner-img下所有的li
		list.style.width=width*li.length+"px";//设置banner-img的总宽度
		//设置滚动图块上显示圆点的个数为li的个数-1
		document.getElementById("indicators").innerHTML="<li></li>".repeat(li.length-1);
		//设置第一个圆点的className为hover
		document.querySelector("#indicators>li:first-child").className="hover";
		//console.log(document.querySelector("#indicators>li:first-child"));
		//console.log(li);

function move(){//封装一个函数来实现图块的滚动
	timer=setTimeout(()=>{//设置定时器
		if(i<li.length-1){
			i++;
			list.style.left=-width*i+"px";//设置图块位移距离
			if(i<li.length-1){
				//设置当前图块所对应的圆点的className为hover
				document.querySelector("#indicators>li:nth-child("+(i+1)+")").className="hover";
				//查找出除了当前圆点之外所有的li为lis
				var lis=document.querySelectorAll("#indicators>li:not(:nth-child("+(i+1)+"))");
				for(var j=0;j<lis.length;j++){//遍历lis
					//如果lis中的li中的className为hover，清除className
					if(lis[j].className=="hover")
						lis[j].className="";
				}
			}else{
				//设置第四张图块所对应的圆点为第一个圆点
				document.querySelector("#indicators>li:first-child").className="hover";
				//查找出除了当前圆点之外所有的li为lis
				var lis=document.querySelectorAll("#indicators>li:not(:first-child)");
				for(var j=0;j<lis.length;j++){//遍历lis
					//如果lis中的里中的className为hover，清除className
					if(lis[j].className=="hover")
						lis[j].className="";
				}
			}
		}else{
			//设置图块位移距离
			list.style.left=0;
			//取消过渡效果，让他实现瞬间从第四张图块转换到第一张图块的转换
			list.style.transition="";
			setTimeout(()=>{//设置定时器实现转换
				i=1;//重新设置i为1，图块从下标为1的位置处开始移动
				//设置当前图块所对应的圆点的className为hover
				document.querySelector("#indicators>li:nth-child("+(i+1)+")").className="hover";
				//查找出除了当前圆点之外所有的里为lis
				var lis=document.querySelectorAll("#indicators>li:not(:nth-child("+(i+1)+"))");
				for(var j=0;j<lis.length;j++){//遍历lis
					//如果lis中的里中的className为hover，清除className
					if(lis[j].className=="hover")
						lis[j].className="";
				}
				//增加过渡效果
				list.style.transition="all .3s linear";
				//图块移动距离
				list.style.left=-width*i+"px";
			},50);
		}
		move();
	},2000);
}
move();
	document.getElementById("banner").onmouseenter=function(){//图块显示区域鼠标移入事件
			 clearTimeout(timer);
		};
	document.getElementById("banner").onmouseleave=function(){//图块显示区域鼠标移入事件
			move();
		};
	document.getElementById("indicators").onmouseover=function(e){
		var s=e.target;
//		console.log(s);
		if(s.nodeName=="LI"){
			if(s.className!="hover"){
				i=[].indexOf.call(s.parentNode.querySelectorAll(s.tagName),s);
//				console.log(i);
				list.style.transition="all .3s linear";
				list.style.left=-width*i+"px";
				s.className="hover";
				var lis=document.querySelectorAll("#indicators>li:not(:nth-child("+(i+1)+"))");
//				console.log(lis);
				for(var j=0;j<lis.length;j++){
					if(lis[j].className=="hover")
						lis[j].className="";
				}
			}
		}
	}
  })
		})();
	
//动态加载图片
	$.ajax({
		type:"GET",
		url:"data/01-index/floor.php",
		success:function(data){
			var html="";
			var f1=data.f1;
			
				html+=`
					<div class="small">
						<a href="">
							<img src=${f1[0].img}>
						</a>
						<div class="small-text1 text">${f1[0].title}</div>
					</div>	
					<div class="small">
						<a href="">
							<img src=${f1[1].img}>
						</a>
						<div class="small-text2 text">${f1[1].title}</div>
					</div>	
					<div class="big">
						<a href="">
							<img src=${f1[2].img}>
						</a>
						<div class="small-text3 text">${f1[2].title}</div>
					</div>	
					<div class="big">
						<a href="">
							<img src=${f1[3].img}>
						</a>
						<div class="small-text4 text">${f1[3].title}</div>
					</div>	
					<div class="small">
						<a href="">
							<img src=${f1[4].img}>
						</a>
						<div class="small-text5 text">${f1[4].title}</div>
					</div>
					<div class="small">
						<a href="">
							<img src=${f1[5].img}>
						</a>
						<div class="small-text6 text">${f1[5].title}</div>
					</div>
					<div class="small">
						<a href="">
							<img src=${f1[6].img}>
						</a>
						<div class="small-text7 text">${f1[6].title}</div>
					</div>
					<div class="small">
						<a href="">
							<img src=${f1[7].img}>
						</a>
						<div class="small-text8 text">${f1[7].title}</div>
					</div>
					<div class="big">
						<a href="">
							<img src=${f1[8].img}>
						</a>
						<div class="small-text9 text">${f1[8].title}</div>
					</div>	
					
				`;
			
			$("#explore-pic").html(html);
		},
		error:function(){alert("网络故障请检查")}
	});
//f2
	$.ajax({
		type:"GET",
		url:"data/01-index/floor.php",			
		success:function(data){
			var html="";
			var f2=data.f2;
//			console.log(f2);
			for(var i=0;i<f2.length;i++){
				var p=f2[i];
//				console.log(p);
				html+=`					
						<a href="">
							<img src=${p.img}>
							<p>${p.title}</p>
						</a>						
				`;
			}
//			console.log(html);
			$("#happy-pic").html(html);
//			console.log($("#happy-pic").html(html));
		},
		error:function(){alert("网络故障请检查")}
	});

//f3
	$.ajax({
		type:"GET",
		url:"data/01-index/floor.php",
		success:function(data){
			var html="";
			var f3=data.f3;
			for(var i=0;i<f3.length;i++){
				var p=f3[i];
				html+=`
					<div id="world-f">
						<a href="">
							<img src=${p.img}>
						</a>
						<p>${p.title}</p>
						<span>${p.detail}</span>

					</div>	
				`;
			}
			$("#world-pic").html(html);
		},
		error:function(){alert("网络故障请检查")}
	});

//电梯滚动  楼层点亮
		function getTotalTop(elem){
			var sum=0;
			do{
				//sum+当前元素的offsetTop
				sum+=elem.offsetTop;
				//offsetParent（元素相对定位的父元素）
				elem=elem.offsetParent;
			}while(elem);
			return sum;
		}
		//获取id为f1的元素距页面顶部的总距离f1totalTop
		var f1totaltop=getTotalTop(//红线
			document.getElementById("f1")
		);
		console.log(f1totaltop);
		//查找id为lift的div保存在变量lift中
		var lift=document.getElementById("lift");
		//为window添加滚动事件监听
			window.addEventListener("scroll",()=>{
			//获得页面滚动的高度scrollTop（绿线）
			var scrollTop=document.body.scrollTop
			||
			document.documentElement.scrollTop;
//			console.log(scrollTop);
			//如果totalTop<=scrollTop+innerHeight/2

				lift.style.display=
				f1totaltop<=scrollTop+innerHeight/2?"block":"none";

			//只有电梯按钮显示时，才判断按钮的亮灭
			if(lift.style.display=="block"){
			//定义变量FHEIGHT=600
			var FHEIGHT=600;
			//找到class为floor的每个楼层元素fs
			var fs=document.querySelectorAll(".floor");
			//遍历fs每个楼层
			for(var i=0;i<fs.length;i++){
				//获得当前楼层距body顶部的总距离totalTop
				var totalTop=getTotalTop(fs[i]);
				//start=totalTop-innerHeight/2
				var start=totalTop-innerHeight/2;
				//计算结束位置end为start+FHEIGHT
				var end=start+FHEIGHT;
				//如果scrollTop>=start且scrollTop<end
				if(scrollTop>=start&&scrollTop<end)
				//就退出循环
				break;
			}
			//在lift下找到class为lift_item_on的li，将其class恢复为lift_item
			var currLi=lift.querySelector(".lift_item_on")
			if(currLi)
				currLi.className="lift_item";
			//设置lift第i个li的class为lift_item_on
			console.log(lift.querySelector(`li:nth-child(${i+1})`));
			lift.querySelector(`li:nth-child(${i+1})`)
				.className="lift_item_on";
				}
			});
			//在lift下找class为lift_list下的class为lift_item的所有a保存在as中
				var as=lift.querySelectorAll(".lift_list .lift_item");
				//遍历as
				for(let i=0;i<as.length;i++){
				//为每个as绑定单击事件
					as[i].onclick=function(){
						//查找id为fi的元素fi
						var fi=document.getElementById("f"+(i+1));
						//获得fi距body顶部的总距离totalTop
						var totalTop=getTotalTop(fi);
						//让window滚动到totalTop
						window.scrollTo(0,totalTop-150);
					}
				} 
					//输出去？楼
//		console.log(getTotalTop(document.getElementById("f1")));
			
			
