<?php
#接收前端传递过来的数据
	$uname=$_REQUEST["uname"];
#连接到数据库
	require("00-init.php");
#拼SQL语句
	$sql="select * from ly_user where uname='$uname'";
#执行SQL语句，并得到结果
	$result=mysqli_query($conn,$sql);
#获取一行，判断是否为空，给出响应
	$row=mysqli_fetch_row($result);
	if($row == null){
		echo "通过";
	}else{
		echo "用户名已存在";
	}


?>