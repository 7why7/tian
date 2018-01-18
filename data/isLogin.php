<?php
	session_start();
	header("Content-Type:application/json");
	@$uid=$_SESSION["uid"];
//	echo $uid;
	if($uid){
	  require_once("00-init.php");
	  $sql="select uname from ly_user where uid=$uid";
	  $result=mysqli_query($conn,$sql);
	  $row=mysqli_fetch_assoc($result);
//	  var_dump($row);
	  $uname=$row["uname"];
	  echo json_encode(["code"=>1,"uname"=>$uname]);
	}else{
	  echo json_encode(["code"=>0,"uname"=>""]);
	}
?>