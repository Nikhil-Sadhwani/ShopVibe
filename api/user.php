<?php

error_reporting(E_ALL);
    ini_set('display_errors',1);

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");

    $conn = mysqli_connect("localhost" , "root" , "" , "react_crud");
    if($conn == false){
        die("ERROR: Could Not Connect".mysqli_connect_error());
    }

    $method = $_SERVER['REQUEST_METHOD'];
    switch ($method) {
        case 'GET':
            $path = explode('/' , $_SERVER['REQUEST_URI']);
            if(isset($path[3]) && is_numeric($path[3])){
                $sql = "SELECT * FROM users WHERE id = '$path[3]'";
                $res = mysqli_query($conn,$sql);
                if(mysqli_num_rows($res) > 0){
                    $row = mysqli_fetch_array($res);
                    $response = array("data" => $row , "result" => "SuccessFul");
                    echo json_encode($response);
                    return;
                }
                else{
                    echo json_encode(["result" => "Failed to fetch"]);
                    return;
                }
            }
            else{
                $sql = "SELECT * FROM users";
                $res = mysqli_query($conn , $sql);
                if(mysqli_num_rows($res) > 0){
                    while($row = mysqli_fetch_array($res)){
                        $response['data'][] = array(
                            "id"=>$row['id'],
                            "username"=>$row['username'],
                            "email"=>$row['email'],
                            "password"=>$row['password'],
                            "mobileNumber"=>$row['mobileNumber'],
                            "role"=>$row['role'],
                            "shopname"=>$row['shopname'],
                            "address"=>$row['address'],
                            "pancard"=>$row['pancard'],
                            "result"=>"Successful"
                        );
                    }
                    echo json_encode($response['data']);
                    return;
                }
                else{
                    echo json_encode(["result" => "Failed to fetch"]);
                    return;
                }
            }
            break;

        case 'POST':
            $userdata = json_decode(file_get_contents("php://input"));
            $email = $userdata->email;
            $oldpass = $userdata->oldpass;
            $confirmpass = $userdata->confirmpass;
            $sql = "SELECT * FROM users WHERE email ='$email'";
            $res = mysqli_query($conn,$sql);
            $row = mysqli_fetch_array($res);
            if($oldpass != $row['password']){
                echo json_encode(["result" => "Your Old password is wrong", "type"=>"danger"]);
                return;
            }
            else{
                $sqli = "UPDATE users SET password = '$confirmpass' WHERE email ='$email'";
                $resu = mysqli_query($conn,$sqli);
                echo json_encode(["result" => "Your password is Changed" , "type"=>"success"]);
                return;
            }
            break;

        case 'PUT':
            $userdata = json_decode(file_get_contents("php://input"));
            $id = $userdata->id;
            $username = $userdata->username;
            $email = $userdata->email;
            $mobileNumber = $userdata->mobileNumber;
            $shopname = $userdata->shopname;
            $address = $userdata->address;
            $pancard = $userdata->pancard;
            $role = $userdata->role;
            $password = $userdata->password;
            $update_at = date('Y-m-d');

            $path = explode('/' , $_SERVER['REQUEST_URI']);
            $sql = "UPDATE users SET username = '$username' , email = '$email' , mobileNumber = '$mobileNumber' , shopname = '$shopname' , address = '$address' , pancard = '$pancard' , role = '$role' ,password = '$password' , update_at = '$update_at' WHERE id = '$id'";
            $res = mysqli_query($conn , $sql);
            echo json_encode(["result" => "Updated Successfully"]);
            break;

        case 'DELETE':
            $path = explode('/' , $_SERVER['REQUEST_URI']);
            $sql = "DELETE FROM users WHERE id = '$path[3]'";
            $res = mysqli_query($conn , $sql);
            echo json_encode(["result" => "Deleted Successfully"]);
            break;
        
        default:
            
            break;
    }

?>