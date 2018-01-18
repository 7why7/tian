<?php
header("Content-Type:application/json");
require_once("../00-init.php");
$output=[];
$sql="SELECT * FROM ly_index_product where floor=1";
$result1=mysqli_query($conn,$sql);
@$row1=mysqli_fetch_all($result1,MYSQLI_ASSOC);
$output["f1"]=$row1;

$sql="SELECT * FROM ly_index_productf2 where floor=2";
$result2=mysqli_query($conn,$sql);
@$row2=mysqli_fetch_all($result2,MYSQLI_ASSOC);
$output["f2"]=$row2;
//var_dump($output["f2"]);
$sql="SELECT * FROM ly_index_productf3 where floor=3";
$result3=mysqli_query($conn,$sql);
@$row3=mysqli_fetch_all($result3,MYSQLI_ASSOC);
$output["f3"]=$row3;

echo json_encode($output);
//var_dump($output);
?>