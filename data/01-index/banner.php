<?php
header("Content-Type:application/json");
require_once("../00-init.php");
$sql="SELECT * FROM ly_index_carousel";
echo json_encode(sql_execute($sql));