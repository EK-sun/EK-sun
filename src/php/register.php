<?php 
    //引用 php 文件
    include 'DBHelper.php';

    // $username = !isset($_POST["username"]) ? "" : $_POST["username"];

    // $password = !isset($_POST["password"]) ? "" : $_POST["password"];
    
    $username = !isset($_GET["username"]) ? "" : $_GET["username"];

    $password = !isset($_GET["password"]) ? "" : $_GET["password"];

    //判断当前注册的用户是否存在，如果存在则不能再次注册
    $sql = "select * from register where username = '$username'"; 
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    if($row){
        echo "{status: false, message: '用户名已注册'}";
    }else{
        $sql="insert into register(username, password) values('$username', '$password')";
    $result = $conn->query($sql);
        if($result){
            echo "{status: true}";
        }else{
            echo "{status: false, message: '注册失败'}";
        }
    }
?>