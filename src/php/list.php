<?php
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET');
    header('Accees-Control-Request-Headers: accpet,content-type');

    include "DBHelper.php";
    $page = !isset($_GET['page']) ? "" : $_GET["page"];
    $num = !isset($_GET['_num']) ? "" : $_GET["_num"];
        
    // var_dump($page,$num);
    $sql = "select * from products limit $page,$num;select count(*) from products;";

    // $conn->set_charset('utf8');
    // $result = query_sql($sql);
    $result = multi_query_oop($sql);
    $lists = json_encode($result);

    echo "{status: true, data:$lists}";

     // $lists = $result->fetch_all(MYSQLI_ASSOC);
   // var_dump(json_encode($lists));
    //var_dump echo  $result;
    // var_dump($result);
    // $lists = json_encode($result);
    // echo jso_decode();
    

    // echo json_encode(['status' => true, 'data' => $lists]);
?>