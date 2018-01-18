<?php
/**
* 获取当前登录用户的购物车内容
*/
header('Content-Type: application/json;charset=UTF-8');
require_once('../00-init.php');

session_start();
if(! @$_SESSION['uid']){
  $_SESSION['pageToJump'] = 'cart.html';
  die('{"code":300, "msg":"login required"}');
}
//获取总记录数
$sql = "SELECT s.iid,l.lid,l.title,l.subtitle,l.price,s.count FROM ly_travel l, ly_shoppingcart_item s WHERE l.lid=s.lid AND uid=$_SESSION[uid]";
$result = mysqli_query($conn, $sql);
$list = mysqli_fetch_all($result, MYSQLI_ASSOC);
//查询每个商品的第一幅小图片
foreach($list as $i=>$p){
  $sql = "SELECT sm FROM ly_travel WHERE lid=$p[lid] LIMIT 1";
  $result = mysqli_query($conn, $sql);
  $row = mysqli_fetch_row($result);
  $list[$i]['pic'] = $row[0];
}
$output = [
  'code'=>200,
  'data'=>$list
];
echo json_encode($output);