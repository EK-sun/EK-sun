<?php 
    require('DBHelper.php');

    //获取前端数据
    $guid = isset($_GET['guid']) ? $_GET['guid'] : null;
    $img = isset($_GET['img']) ? $_GET['img'] : null;
    $title = isset($_GET['title']) ? $_GET['title'] : null;
    $type = isset($_GET['type']) ? $_GET['type'] : null;
    $price = isset($_GET['price']) ? $_GET['price'] : null;
    $reference = isset($_GET['reference']) ? $_GET['reference'] : null;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : null;
  
    $sql = "select * from `car` where guid='$guid'";
    // echo $sql;
    $result = $conn->query($sql);
    $ccc=$result->fetch_all(MYSQLI_ASSOC);
    // var_dump $ccc;
    if($ccc){
        //判断如果数据库存在这个商品，则加1
        $sql = "update `car` set qty='$qty'+qty where guid='$guid'";
        
        // 执行sql语句
        $res = $conn->query($sql);
        // if($res){
        //     echo "you_ok";
        // }else{
        //     echo "you_error";
        // }
        echo "success";
    }else{
        // 加入购物车（保存到数据库）
        $sql = "insert into car(`guid`,`img`,`title`,`type`,`price`,`reference`,`qty`) values('$guid','$img','$title','$type ','$price','$reference ','$qty')";
        // echo $sql;
        // 执行sql语句
        $res = $conn->query($sql);

        if($res){
            echo "success";
        }else{
            echo "fail";
        }
        
    }


?>