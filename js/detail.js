(()=>{
		  var url=$(".pic-ul").children(".active").children().attr("data-lg");
		  var xmask=parseFloat($("#mask").css("width"))/2;
          console.log(xmask);
			$(".pic-ul").on("click","img",e=>{
				var $tar=$(e.target).parent();
				var $mdurl=$(e.target).attr("data-md");
				$("#md-image").attr("src",$mdurl);
				$tar.addClass("active").siblings().removeClass("active");
				url=$(".pic-ul").children(".active").children().attr("data-lg");

			});
			$("#supermask").mousemove(e=>{
				var x=e.offsetX;
				var y=e.offsetY;
				console.log(x,y);
				$("#mask").show();
				if(x<xmask){
					x=xmask;
				}else if(x>470-xmask){
					x=470-xmask;
				}
				if(y<xmask){
                y=xmask;
				}else if(y>195-xmask){
                y=195-xmask;
            }
				$("#mask").css({"left":`${x-xmask}px`,"top":`${y-xmask}px`})
				$("#lg-img").show().css("backgroundImage",`url(${url})`).css("backgroundRepeat",`no-repeat`);
				 $("#lg-img").css("backgroundPosition",`${-((x-xmask)*1.6/1)}px ${-((y-xmask)*4/3)}px`);
				 console.log(`${-((x-xmask)*1.6/1)}px ${-((y-xmask)*4/3)}px`);
			});
				$("#supermask").mouseout(e=>{
            $("#mask").hide();
            $("#lg-img").hide();
        });
		

		})();
//		点击显示图片
		var $app=$("#app-pic");
		console.log($app);
		$("#canvas").click(function(){
			$app.toggleClass("in");
		});
//		+  -   号
		var showList=document.getElementById("show-list");
//		showList.innerHTML=html;
		//查找#show-list下的class为reduce和class为add的元素	
		showList.onclick=(e=>{
			var span=e.target;
			console.log(span);
			if(span.className=="add"||span.className=="reduce"){
				if(span.nodeName=="SPAN"){
					var input=span.parentNode.children[1];
					var n=parseInt(input.value);
					if(span.className=="add"){
					console.log(n);
						n++;
					}else if(n>1){
						n--;
					}
					input.value=n;
				}
			}
		})