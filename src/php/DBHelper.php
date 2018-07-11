<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET');
    header('Accees-Control-Request-Headers: accpet,content-type');

    function conn(){
        $servername = "localhost:3307"; // 数据库的主机
        $serverAccount = "root"; // 登录数据库的用户名
        $serverPwd = "19960628"; // 登录数据库的密码
        $database = "eksun"; // 要连接的数据库

        $conn = new mysqli($servername, $serverAccount, $serverPwd, $database);
        // 转移中文
        $conn->set_charset('utf8');
        //判断是否连接出错
        if($conn->connect_error){
            echo('连接数据库错误');
            return null;
        }
        return $conn;
    }

    $conn = conn();
    //执行逻辑操作
    function exec_sql($sql){
        $conn = conn();
        //insert
        //不需要释放内存(insert into, update, delete)
        $result = $conn->query($sql);
        $conn->close();
        return $result;
    }

    //执行查询操作
    function query_sql($sql){
        $conn = conn();
        $result = $conn->query($sql);
        //定义一个空数组
        $dataset = array();

        if ($result){
            
            while($row = $result->fetch_assoc())
            {
                $dataset[] = $row;
            }

        $result->free();
        }

        $conn->close();
        return $dataset;
    }




//http://www.runoob.com/php/php-mysql-select.html
    function connect_oop(){
        // 配置参数
        $servername = 'localhost:3307';
        $username = 'root';
        $password = '19960628';
        $database = 'eksun';

        //连接数据库
        $conn = new mysqli($servername,$username,$password,$database);

        // 检测连接
        if($conn->connect_error){
            die('连接失败'.$conn->connect_error);
        }

        $conn->set_charset('utf8');
        return $conn;
    }

    //单独执行一条 sql 语句
    function query_oop($sql){
        $jsonData = array();
        $conn = connect_oop();
        $result = $conn->query($sql);
        while ($row = $result->fetch_assoc()){
            $jsonData[] = $row;
        };
        $result->free();//释放内存
        $conn->close();//关闭连接
        return $jsonData;
    }

    function excute_oop($sql){
        $conn = connect_oop();
        $result = $conn->query($sql);
        $conn->close();//关闭连接
        return $result;
    }

    //执行多条 sql 语句
    function multi_query_oop($sql){
        $jsonData = [];
        $conn = connect_oop();
        $flag = 0;
        if ($conn->multi_query($sql)) {
            do {
                $rows = array();
                if ($result = $conn->store_result()) {
                    while ($row = $result->fetch_assoc()) {
                        $rows[] = $row;
                    }
                    $result->free();
                }
                $flag++;
                $data = ["data".$flag=>$rows];
                $jsonData = array_merge($jsonData, $data);
                
            } while ($conn->more_results() && $conn->next_result());
        }

        $conn->close();//关闭连接
        return $jsonData;
    }

    //初始化连接对象方法
    function connect(){
        $servername = "localhost:3007";//
        $username = "root";
        $password = "19960628";
        $dbname = 'eksun'; 
        //初始化连接，返回一个连接对象(包含所连接数据库的信息)
        $con = mysqli_connect($servername,$username,$password,$dbname); 

        //获取连接对象的错误信息
        if (mysqli_connect_error($con)) 
        { 
            echo "连接 MySQL 失败: " . mysqli_connect_error();
            return null;
        }
        return $con;
    }
    
    //执行查询数据方法
    function query($sql){
        //初始化连接
        $conn = connect();
        //执行 sql 脚本，也叫数据库脚本，返回一个结果集（对象）
        $result = mysqli_query($conn, $sql);
        //定义了一个数组
        $jsonData = array();           
        if ($result)
        {
            
            //在结果集中获取对象(逐行获取)
            while ($obj = mysqli_fetch_object($result))
            {
                //$jsonData.push($obj)
                $jsonData[] = $obj;
                // print_r($obj->email);
            }   
            //将对象转换成 json 格式的字符并打印出来
            //JSON.stringify()            
            // if(!$isCheck){
                // echo json_encode($jsonData, JSON_UNESCAPED_UNICODE);
            // }
            // 释放结果集
            mysqli_free_result($result);
        } 
        //关闭连接
        mysqli_close($conn);   
        return $jsonData;
    }

    //执行逻辑语句
    function excute($sql){
        //初始化连接
        $conn = connect();
        //执行 sql 脚本，也叫数据库脚本，返回一个结果集（对象）
        //返回一个布尔值，true|false，不用释放
        $result = mysqli_query($conn,$sql);
        //关闭连接
        mysqli_close($conn);
        return $result;
    }
    //查询语句，只是呈现结果，不改变数据
    // $sql = "SELECT * FROM gz1610;";//返回一个结果集，存放在内存当中，用完要释放
    //逻辑语句，改变数据
    //insert into, update, delete // 返回一个布尔值，true|false，不用释放
    // $insert = "insert into dk(name) values('" . $_POST["name"] . "')";

    // excute($insert);
    // query($sql);

?>
