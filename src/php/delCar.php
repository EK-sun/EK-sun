<?php 
    
    include "DBHelper.php";

    $$id = isset($_GET['id']) ? $_GET['id'] : ;
    $del = isset($_GET['del']) ? $_GET['del'] : ;
    if($del == 'del'){
        $sql = "DELETE FROM car where id='$id'";
        $res = $conn->query($sql);
        // var_dump($res);
    }else{
        $sql = "DELETE FROM car";
        $res = $conn->query($sql);
    }
    


?>