<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET , POST");
    header("Access-Control-Allow-Headers: Content-Type");

    $conn = new mysqli("localhost" , "root" , "" , "react_crud");
    if(mysqli_connect_error()){
        echo mysqli_connect_error();
        exit();
    }
    else{
        $eData = file_get_contents('php://input');
        $dData = json_decode($eData , true);
        $user = $dData['username'];
        $mobileNumber = $dData['mobileNumber'];
        $email = $dData['email'];
        $pass = $dData['pass'];
        $role = $dData['role'];
        $shopname = $dData['shopname'];
        $address = $dData['address'];
        $pancard = $dData['pancard'];
        $create_at = date('Y-m-d');
        $result = "";

        $path = explode('/' , $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])){
            $id = $path[3];
            $sql = "UPDATE users SET  username = '$user' ,email = '$email' ,password = '$pass' ,mobileNumber = '$mobileNumber' ,role = '$role'  , shopname = '$shopname'  , address = '$address'  , pancard = '$pancard' WHERE id = '$id'";
            $res = mysqli_query($conn , $sql);
            if($res){
                $result = "You Become a Seller Now";
            }
            else{
                $result="";
            }
        }
        else{
            if($user != "" and $mobileNumber != "" and $email != "" and $pass != ""){
                $sql = "INSERT INTO users (id,username,email,password,mobileNumber,create_at,role , shopname , address , pancard) VALUES(null , '$user' , '$email' , '$pass' , '$mobileNumber' , '$create_at' , '$role' , '$shopname' , '$address' , '$pancard');";
    
                $res = mysqli_query($conn , $sql);
                if($res){
                    $result = "You have resgistered successfully";
                }
                else{
                    $result = "";
                }
            }
            else{
                $result = "";
            }
        }

        $conn -> close();
        $response[] = array("result" => $result);
        echo json_encode($response);
    }
?>