<?php
	require("00-init.php");
	@$uname=$_REQUEST["uname"];
	@$upwd=$_REQUEST["upwd"];
	@$cpwd=$_REQUEST["cpwd"];
	@$phone=$_REQUEST["phone"];
	@$email=$_REQUEST["email"];
//	$sql="select * from ly_user where uname='$uname' and upwd=$upwd";
	$unameReg='/^[a-zA-Z0-9]{6,13}$/';
	$upwdReg='/^[0-9]{6,13}$/';
	$phoneReg='/^(\+86|0086)?\s*1[34578]\d{9}$/';
	$emailReg='/^\w{1,15}[@]\w{1,6}[.](com|cn)$/';
	if(!preg_match($unameReg,$uname)){
		echo '{"msg":"用户名不正确"}';
		exit;
	}
	if(!preg_match($upwdReg,$upwd)){
		echo '{"msg":"用户密码不正确"}';
		exit;
	}
	if($upwd!=$cpwd){
		echo '{"msg":"两次输入密码不一致"}';
		exit;
	}
	if(!preg_match($phoneReg,$phone)){
		echo '{"msg":"电话格式错误"}';
		exit;
	}
	if(!preg_match($emailReg,$email)){
		echo '{"msg":"邮件格式错误"}';
		exit;
	}
//	$result=mysqli_query($conn,$sql);
//	$row = mysqli_fetch_assoc($result);
//	echo json_encode($row);
//	if($result){
//		echo $uname,$upwd;
//		echo '{"uname":"'.$uname.'","upwd":"'.$upwd.'"}';
//	}else{
//		echo "error";
//	}
	$sql="INSERT INTO ly_user(uname,upwd,email,phone) VALUES ('$uname','$upwd','$email','$phone')";
	$result=mysqli_query($conn,$sql);
	if($result){
		echo '{"code":1,"msg":"注册成功"}';
	}else{		
		echo '{"code":-1,"msg":"注册失败"}';
	}
?>