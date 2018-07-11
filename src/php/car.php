<?php 
    
    include "DBHelper.php";

    $sql = "select * from car";
    $conn->set_charset('utf8');

    // $result = query_sql($sql);
    $result = $conn->query($sql);


    $row = $result->fetch_all(MYSQLI_ASSOC);
    // $lists=[1,3];
    $result->close();
    $conn->close();
   // var_dump(json_encode($lists));
    //var_dump echo  $result;

    // var_dump($result);
    // $lists = json_encode($result);
    // echo jso_decode();
    

    echo json_encode(['status' => true, 'data' => $row]);           
?>