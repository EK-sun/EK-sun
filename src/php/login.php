<?php 
    session_start();

    include "DBHelper.php";

    $username = !isset($_GET["username"]) ? "" : $_GET["username"];

    $password = !isset($_GET["password"]) ? "" : $_GET["password"];

    $sql = "select * from register where username = '$username' and password = '$password'";

    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    if(count($row) < 1){
        echo "{status: false, message: '登录失败'}";
    }else{

        echo "{status: true}";
        // echo json_encode($result);
        $_SESSION['user'] = $username;
        
    }
?>