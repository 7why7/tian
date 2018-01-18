<?php
require_once("../init.php");
function addToCart(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	@$product_id=$_REQUEST["lid"];
	@$count=$_REQUEST["count"];
	if($uid){
		$sql="select * from ly_shoppingcart_item where user_id=$uid and product_id=$product_id";
		$result=mysqli_query($conn,$sql);
		//如果$uid的购物车中有$product_id商品
		if(count(mysqli_fetch_all($result,1)))
			$sql="update ly_shoppingcart_item set count=count+$count where user_id=$uid and product_id=$product_id";
		else//否则
			$sql="insert into ly_shoppingcart_item (user_id,product_id,count,is_checked) values ($uid,$product_id,$count,0)";
		mysqli_query($conn,$sql);
	}
}

function updateCart(){
	global $conn;
	@$iid=$_REQUEST["iid"];
	@$count=$_REQUEST["count"];
	if($count==0)
		$sql="delete from ly_shoppingcart_item where iid=$iid";
	else
		$sql="update ly_shoppingcart_item set count=$count where iid=$iid";
	mysqli_query($conn,$sql);
}

function getCart(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	if($uid){
		$sql="select iid,lid,title,price,count,(select * from ly_travel where laptop_id=lid limit 1) as sm,is_checked from ly_shoppingcart_item inner join ly_travel on product_id=lid where user_id=$uid";
				$result=mysqli_query($conn,$sql);
		echo json_encode(mysqli_fetch_all($result,1));
	}else{
		echo json_encode([]);
	}
}

//getCart();
function clearCart(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	if($uid){
		$sql="delete from ly_shoppingcart_item where user_id=$uid";
		mysqli_query($conn,$sql);
	}
}

//定义全选勾php函数，操作数据库，改变某用户全部商品的is_checked数字0或1
function selectAll(){
	global $conn;
	@$chkAll=$_REQUEST["chkAll"];
	session_start();
	@$uid=$_SESSION["uid"];
	$sql="update ly_shoppingcart_item set is_checked=$chkAll where user_id=$uid";
	mysqli_query($conn,$sql);
}

//定义勾选一个php函数，操作数据库，改变is_checked数字0或1
function selectOne(){
	global $conn;
	@$chkOne=$_REQUEST["chkOne"];
	@$iid=$_REQUEST["iid"];
	$sql="update ly_shoppingcart_item set is_checked=$chkOne where iid=$iid";
	mysqli_query($conn,$sql);
}


