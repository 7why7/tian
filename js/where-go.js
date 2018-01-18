//		轮播图
//	获取滚动图块的ul
	var list1=document.getElementById("banner-img1"),
		a=0,
		timer1=null,
		width=700,
		//查找banner-img1下所有li
		li=list1.querySelectorAll("li");
//		设置banner-img1的总宽度
		list1.style.width=width*li.length+"px";
//		设置滚动图块上显示圆点的个数为li的个数-1
		document.getElementById("indicators1").innerHTML="<li></li>".repeat(li.length-1);
//		设置第一个圆点的className为hover
		document.querySelector("#indicators1>li:first-child").className="hover";
		console.log(li);
//		封装一个函数来实现图块的滚动
		function move1(){
//			设置定时器
			timer1=setTimeout(()=>{
				if(a<li.length-1){
					a++;
//					设置图块位移距离
					list1.style.left=-width*a+"px";
					if(a<li.length-1){
//						设置当前图块对应的圆点的className为hover	
						document.querySelector("#indicators1>li:nth-child("+(a+1)+")").className="hover";
//						查找出除了当前圆点之外所有的li为lis
						var lis=document.querySelectorAll("#indicators1>li:not(:nth-child("+(a+1)+"))");
//						遍历lis
						for(var j=0;j<lis.length;j++){
//							如果lis中的li中的className为hover，清除className
							if(lis[j].className=="hover")
								lis[j].className="";
						}
					}else{
//						设置第四张图块所对应的圆点为第一个圆点						
						document.querySelector("#indicators1>li:first-child").className="hover";
//						查找出除了当前圆点之外所有的li为lis
						var lis=document.querySelectorAll("#indicators1>li:not(:first-child)");
//						遍历lis
						for(var j=0;j<lis.length;j++){
//							如果lis中className为hover，清除className
							if(lis[j].className=="hover")
								lis[j].className="";
						}
					}
				}else{
//					设置图块位移距离
					list1.style.left=0;
//					取消过渡效果，让他实现瞬间从第四张图块转换到第一张图块的转换
					list1.style.transition="";
//					设置定时器实现转换
					setTimeout(()=>{
						//重新设置i为1，图块从下标为1的位置处开始移动
						a=1;
						//设置当前图块所对应的圆点的className为hover
						document.querySelector("#indicators1>li:nth-child("+(a+1)+")").className="hover";
						//查找出除了当前圆点之外所有的里为lis
						var lis=document.querySelectorAll("#indicators1>li:not(:nth-child("+(a+1)+"))");
//						遍历lis
						for(var j=0;j<lis.length;j++){
							//如果lis中的里中的className为hover，清除className
							if(lis[j].className=="hover")
								lis[j].className="";
						}
						//增加过渡效果
						list1.style.transition="all .3s linear";
						//图块移动距离
						list1.style.left=-width*a+"px";
					},50);
				}
				move1();
			},2000);
		}
		move1();
		document.getElementById("banner1").onmouseenter=function(){//图块显示区域鼠标移入事件
			 clearTimeout(timer1);
		};
	document.getElementById("banner1").onmouseleave=function(){//图块显示区域鼠标移入事件
			move1();
		};
	document.getElementById("indicators1").onmouseover=function(e){
		var s=e.target;
//		console.log(s);
		if(s.nodeName=="LI"){
			if(s.className!="hover"){
				a=[].indexOf.call(s.parentNode.querySelectorAll(s.tagName),s);
//				console.log(a);
				list1.style.transition="all .3s linear";
				list1.style.left=-width*a+"px";
				s.className="hover";
				var lis=document.querySelectorAll("#indicators1>li:not(:nth-child("+(a+1)+"))");
//				console.log(lis);
				for(var j=0;j<lis.length;j++){
					if(lis[j].className=="hover")
						lis[j].className="";
				}
			}
		}
	}

function task(){
		var end=new Date("2018/09/30 17:00:00");
		var now=new Date();
		var s=parseInt((end-now)/1000);
		if(s>0){
		var d=parseInt(s/3600/24);
		if(d<10) d="0"+d;
		//s/3600/24,再下取整
		var h=parseInt(s%(3600*24)/3600);
		if(h<10) h="0"+h;
		//s/(3600*24)的余数,再/3600,再下去整
		var m=parseInt(s%3600/60);
		if(m<10) m="0"+m;
		//s/3600的余数,再/60，再下取整
		s%=60;//s/60的余数
		if(s<10) s="0"+s;
		//距离下一个假期还有: ?天?小时?分?秒
		var span=document.getElementById("time");
		span.innerHTML=d+"天"+h+"小时"+m+"分"+s+"秒";
		}else{
			clearInterval(timer);
			span.innerHTML="放假啦！";
  }
	} 
	task();
	var timer=setInterval(task,1000);
