<?php
	session_start();
	header("Content-Type:application/json");
	require_once("00-init.php");
	@$uname=$_REQUEST["uname"];
	@$upwd=$_REQUEST["upwd"];
	$sql="SELECT uid FROM ly_user WHERE uname='$uname' and upwd='$upwd'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
//	var_dump($row);
	if($row){
		$_SESSION["uid"]=$row["uid"];
//		echo $_SESSION["uid"];
//		echo $_SESSION["uid"];
		echo json_encode(["code"=>1,"msg"=>""]);
	}else{
		echo json_encode(["code"=>0,"msg"=>"用户名或密码错误"]);
	}
	
?>