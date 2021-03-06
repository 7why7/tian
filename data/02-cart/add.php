<?php
/**
* 添加到购物车
*/
header('Content-Type: application/json;charset=UTF-8');
require_once('../00-init.php');

@$lid = $_REQUEST['lid'] or die('{"code":401,"msg":"lid required"}');
@$buyCount = $_REQUEST['buyCount'] or die('{"code":402,"msg":"buyCount required"}');

session_start();
if(! @$_SESSION['uid']){
  $_SESSION['pageToJump'] = 'cart.html';
  $_SESSION['toBuyLid'] = $lid;
  $_SESSION['toBuyCount'] = $buyCount;
  die('{"code":300, "msg":"login required"}');
}

$sql = "SELECT iid FROM ly_shoppingcart_item WHERE uid=$_SESSION[uid] AND lid=$lid";
$result = mysqli_query($conn, $sql);
if( mysqli_fetch_row($result) ){
  $sql = "UPDATE ly_shoppingcart_item SET count=count+1 WHERE uid=$_SESSION[uid] AND lid=$lid";
}else {
  $sql = "INSERT INTO ly_shoppingcart_item VALUES(NULL, $_SESSION[uid], $lid, $buyCount, false)";
}
$result = mysqli_query($conn, $sql);
if($result){
  echo '{"code":200, "msg":"add succ"}';
}else {
  echo '{"code":500, "msg":"add err"}';
}
