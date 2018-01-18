(()=>{
	ajax("get","header.html","","text")
		.then(html=>{
	document.getElementById("header")
            .innerHTML=html;
	
$.ajax({
			type:"GET",
			url:"data/isLogin.php",
			success:function(data){
//				console.log(data);
				html="";
				if(data.code<=0){
					html+=`
					<span id="reg"><a href="signup.html" target="_blank" >注册</a></span>	
					<span>|</span>
					<span id="log"><a href="login.html" target="_blank">登录</a></span>
					`;
				}else if(data.code>0){
					html+=`
					<span id="logOk">欢迎登录:${data.uname}</span>
					<span>|</span>
					<span><a href="" id="logout">注销</a></span>
					`;
				}
				$("#btn").html(html);
				//注册点击事件
//				$("#reg").on("click",function(e){
//					e.preventDefault();
////					location.href="signup.html";
//				});
				//登录点击事件
				$("#log").on("click",function(e){
					e.preventDefault;
					console.log($("#log"));
//					location.replace("login.html");
				});
				//点击注销事件
				$("#logout").click(function(e){
					e.preventDefault;
					$.ajax({
						type:"GET",
						url:"data/logout.php",
						success:function(data){
							console.log(data);
							alert("注销成功");
							location.reload();
						},
						error:function(){
							alert("网络故障请检查")
						}
					});
				});

			},
			error:function(){
				alert("网络连接错误");
			}
		});

/*为查询按钮绑定单击事件跳转*/
    //查找id为top-input的div
    var topInput=document.getElementById("search");
//	console.log(topInput);
    //在txtSearh下查找class为search-img的a元素，绑定单击事件
    topInput.getElementsByClassName("search-img")[0]
      .onclick=function(){
      //获取旁边id为txtSearch的input的内容
      var kw=
        document.getElementById("txtSearh").value;
      //如果内容不是空
      if(kw.trim().length!=0){
        //拼接url:
        var url=
          "new.html?kw="+kw;
        //跳转到url的页面
        location=url;
      }
    }


$.ajax({
			type:"GET",
			url:"data/isLogin.php",
			success:function(data){
//				console.log(data);
				html="";
				if(data.code<=0){
					html+=`
					<span id="reg"><a href="signup.html" target="_blank" >注册</a></span>	
					<span>|</span>
					<span id="log"><a href="login.html" target="_blank">登录</a></span>
					`;
				}else if(data.code>0){
					html+=`
					<span id="logOk">欢迎登录:${data.uname}</span>
					<span>|</span>
					<span><a href="" id="logout">注销</a></span>
					`;
				}
				$("#btn").html(html);
				//注册点击事件
//				$("#reg").on("click",function(e){
//					e.preventDefault();
////					location.href="signup.html";
//				});
				//登录点击事件
				$("#log").on("click",function(e){
					e.preventDefault;
					console.log($("#log"));
//					location.replace("login.html");
				});
				//点击注销事件
				$("#logout").click(function(e){
					e.preventDefault;
					$.ajax({
						type:"GET",
						url:"data/logout.php",
						success:function(data){
							console.log(data);
							alert("注销成功");
							location.reload();
						},
						error:function(){
							alert("网络故障请检查")
						}
					});
				});

			},
			error:function(){
				alert("网络连接错误");
			}
		});



})
})();



