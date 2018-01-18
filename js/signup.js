//用户名
	if($("#uname").val()==""||$("#uname").val()==null){
		$("#sUname").html("用户名不能为空");
	}
	$("#uname").keyup(function(){
		var uname=$("#uname").val();
		var sUname=$("#sUname");
		var uReg=/^[a-zA-Z0-9]{6,13}$/;
		if(uReg.test(uname)){
			sUname.html("格式正确");
			sUname.removeClass().addClass("success");
			$.ajax({
						type:"post",
						url:"data/signup-2.php",
						data:{uname:uname},
						success:function(date){
							if(date.code<1){
								sUname.html(date.msg);
								sUname.removeClass().addClass("error");
							}
						},
						error:function(){alert("网络连接错误")}
					});
		}else{
			sUname.html("请输入6-13位的数字或字母");
			sUname.removeClass().addClass("error");
		}
		
	});
   //密码	
	if($("#upwd").val()==""||$("#upwd").val()==null){
		$("#sUpwd").html("用户名不能为空");
	}
	$("#upwd").keyup(function(){
		var upwd=$("#upwd").val();
		var sUpwd=$("#sUpwd");
		var wReg=/^[0-9]{6,13}$/;
		if(wReg.test(upwd)){
			sUpwd.html("格式正确");
			sUpwd.removeClass().addClass("success");
		}else{
			sUpwd.html("请输入6-13位的数字");
			sUpwd.removeClass().addClass("error");
		}
	});
	//确认密码
	if($("#cpwd").val()==""||$("#cpwd").val()==null){
		$("#sCpwd").html("请确认密码");
	}
	$("#cpwd").keyup(function(){
		var cpwd=$("#cpwd").val();
		var sCpwd=$("#sCpwd");
		if(cpwd==$("#upwd").val()){
			sCpwd.html("两次输入密码一致");
			sCpwd.removeClass().addClass("success");
		}else{
			sCpwd.html("两次输入密码不一致");
			sCpwd.removeClass().addClass("error");
		}
	});
	//电话号码
	if($("#phone").val()==""||$("#phone").val()==null){
		$("#sPhone").html("请输入手机号码");
	}
	$("#phone").keyup(function(){
		var phone=$("#phone").val();
		var sPhone=$("#sPhone");
		var pReg=/^(\+86|0086)?\s*1[34578]\d{9}$/;
		if(pReg.test(phone)){
			sPhone.html("手机格式正确");
			sPhone.removeClass().addClass("success");
		}else{
			sPhone.html("请输入正确格式的手机号码");
			sPhone.removeClass().addClass("error");
		}
	});
	//电子邮箱
	if($("#email").val()==""||$("#email").val()==null){
		$("#sEmail").html("请输入电子邮箱");
	}
	$("#email").keyup(function(){
		var email=$("#email").val();
		var sEmail=$("#sEmail");
		var pReg=/^\w{1,15}[@]\w{1,6}[.](com|cn)$/;  // /^\d{1,15}@\w{1,6}.\w{1,6}$/
		if(pReg.test(email)){
			sEmail.html("电子邮件格式正确");
			sEmail.removeClass().addClass("success");
		}else{
			sEmail.html("请输入正确的电子邮件格式");
			sEmail.removeClass().addClass("error");
		}
	});
	//提交注册信息
	$("#log").on("click",function(){
		var uname=$("#uname").val();
		var upwd=$("#upwd").val();
		var cpwd=$("#cpwd").val();
		var phone=$("#phone").val();
		var email=$("#email").val();
		console.log(uname,upwd,phone,email,cpwd);
		$.ajax({
			type:"GET",
			url:"data/signup-1.php",
			data:{uname:uname,upwd:upwd,cpwd:cpwd,phone:phone,email:email},
			success:function(date){
				console.log(date);
				alert(date.msg);
				if(date.code>0){
					console.log(date.code);
					location.href="login.html";
				}
				
			},
			error:function(){alert("网络故障，请检查")}
		});
	})