<?php
/**
* 获取当前登录用户的购物车内容(已勾选条目)
*/
header('Content-Type: application/json;charset=UTF-8');

session_start();
if(! @$_SESSION['loginUid']){
  $_SESSION['pageToJump'] = 'cart.html';
  die('{"code":300, "msg":"login required"}');
}
require_once('../00-init.php');
//获取总记录数
$sql = "SELECT iid,lid,title,price,count FROM ly_travel l, ly_shoppingcart_item s WHERE l.lid=s.lid AND uid=$_SESSION[loginUid] AND is_checked=1";
$result = mysqli_query($conn, $sql);
$list = mysqli_fetch_all($result, MYSQLI_ASSOC);
//查询每个商品的第一幅小图片
foreach($list as $i=>$p){
  $sql = "SELECT sm FROM ly_travel_pic WHERE laptop_id=$p[lid] LIMIT 1";
  $result = mysqli_query($conn, $sql);
  $row = mysqli_fetch_row($result);
  $list[$i]['pic'] = $row[0];
}
$output = [
  'code'=>200,
  'data'=>$list
];
echo json_encode($output);