<?php
header("Content-Type:application/json");
require_once("00-init.php");
$output=[
	"count"=>0,
	"pageSize"=>15,
	"pageCount"=>0,
	"pageNo"=>0,
	"data"=>[]
];
@$pno=$_REQUEST["pno"];
@$kw=$_REQUEST["kw"];
$kw=urldecode($kw);
	if(!$pno) $pno=1;
	$sql="SELECT * FROM ly_travel";
	if($kw){
		$kws=explode(" ",$kw);
		for($i=0;$i<count($kws);$i++){
			$kws[$i]=" title like '%".$kws[$i]."%' ";
		}
		$where=" where ".implode(" and ",$kws);
//	echo $sql;
	$sql=$sql.$where;
	}

$sqls=$sql;
$sql=$sql." limit ".(($pno-1)*15).",15 ";
$result=mysqli_query($conn,$sql);
//var_dump($result);
$row=mysqli_fetch_all($result,1);
//var_dump($row);

if(!$kw){
	$sql="SELECT * FROM ly_travel ";
	$output["count"]=count(sql_execute($sql));
	//$sql=$sql." limit ".($pno*$output["pageSize"]).",".$output["pageSize"];
	$result=mysqli_query($conn,$sql);
	$rows=mysqli_fetch_row($result);
}else{
	$output["count"]=count(sql_execute($sqls));
	$result=mysqli_query($conn,$sqls);
	$rows=mysqli_fetch_row($result);
}

//$count=$row[0];
$output["pageCount"]=ceil($output["count"]/$output["pageSize"]);
$output["pageNo"]=$pno;
$output["data"]=$row;
echo json_encode($output);

//var_dump($output);
?>