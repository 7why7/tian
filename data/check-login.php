<?php
	#1连接数据库
	require("00-init.php");
	#2接收前端传递过来的数据
	$uname=$_REQUEST["uname"];
	$upwd=$_REQUEST["upwd"];
	#3到数据库中验证用户名密码是否正确
	$sql="select * from ly_user where 
	uname='$uname'and upwd='$upwd'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	if($row==null){
		echo "用户名或密码不正确";
	}else{
		echo "登录成功";
	}

?>