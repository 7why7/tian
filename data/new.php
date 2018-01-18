<?php
header("Content-Type:application/json");
require_once("00-init.php");
$output=[];
$sql="SELECT * FROM ly_travel limit 0,15";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_all($result,MYSQLI_ASSOC);
$output["pic"]=$row;
echo json_encode($output);
	
?>