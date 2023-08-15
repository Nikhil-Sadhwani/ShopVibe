<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$conn = mysqli_connect("localhost" , "root" , "" , "react_crud");
if($conn === false){
    die("ERROR: Could Not Connect".mysqli_connect_error());

}
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        
        $path = explode('/' , $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])){
            
            $id = $path[3];
            $destination = $_SERVER['DOCUMENT_ROOT']."/api/images"."/";
            $sqli = "SELECT * FROM productimage WHERE id = '$id';";
            $allproduct = mysqli_query($conn , $sqli);
            if(mysqli_num_rows($allproduct) > 0){
                $row = mysqli_fetch_array($allproduct);
                $response[] = array("data" => $row);
                echo json_encode($response);
                return;
            }
            else{
                echo json_encode(["result"=>"please check the data"]);
                return;
            }
           
        }
        
        else if(isset($path[3])){
            $carr = array("electronics" , "fashion" , "homeFurniture" ,"toyBeauty","appliances" ,"mobile","grocery");
            $val = $path[3];
            if(in_array( $val, $carr)){

                $sql = "SELECT * FROM productimage WHERE category = '$path[3]'";
                $res = mysqli_query($conn , $sql);
                if(mysqli_num_rows($res) > 0){
                    while($row = mysqli_fetch_array($res)){
                        $response['productdata'][] = array(
                            "id"=>$row['id'],
                            "email"=>$row['email'],
                            "title"=>$row['title'],
                            "description"=>$row['description'],
                            "category"=>$row['category'],
                            "subCategory"=>$row['subCategory'],
                            "price"=>$row['price'],
                            "image"=>$row['image'],
                            "result"=>"data uploaded"
                        );
                    }
                    echo json_encode($response['productdata']);
                    return;
                }
                else{
                    echo json_encode(null);
                    return;
                }
            }
            else{
                $emailC = $path[3];
                $destination = $_SERVER['DOCUMENT_ROOT']."/api/images"."/";
                $sqli = "SELECT * FROM productimage WHERE email = '$emailC';";
                $allproduct = mysqli_query($conn , $sqli);
                if(mysqli_num_rows($allproduct) > 0){
                    while($row = mysqli_fetch_array($allproduct)){
                        $json_array["productdata"][] = array(
                            "id"=>$row['id'],
                            "email"=>$row['email'],
                            "title"=>$row['title'],
                            "description"=>$row['description'],
                            "category"=>$row['category'],
                            "subCategory"=>$row['subCategory'],
                            "price"=>$row['price'],
                            "image"=>$row['image'],
                            "result"=>"data uploaded"
                        );
                    }
                    echo json_encode($json_array["productdata"]);
                    return;
                }
                else{
                    echo json_encode(null);
                    return;
                }
            }
            
        }
        else{
            $sql = "SELECT * FROM productimage";
            $res = mysqli_query($conn , $sql);
            if(mysqli_num_rows($res) > 0){
                while($row = mysqli_fetch_array($res)){
                    $j_array["data"][] = array(
                        "id"=>$row['id'],
                        "email"=>$row['email'],
                        "title"=>$row['title'],
                        "description"=>$row['description'],
                        "category"=>$row['category'],
                        "subCategory"=>$row['subCategory'],
                        "price"=>$row['price'],
                        "image"=>$row['image'],
                        "result"=>"data uploaded"
                    );
                }
                echo json_encode($j_array["data"]);
                return;
            }
            else{
                echo json_encode(null);
                return;
            }
        }
        
        break;
    
    case "POST":
        $userpostdata= json_decode(file_get_contents("php://input"));
        
        if(isset($_FILES['newimage']))
        {
            $id = $_POST['id'];
            $email = $_POST['email'];
            $title = $_POST['title'];
            $description = $_POST['description'];
            $category = $_POST['category'];
            $subCategory = $_POST['subCategory'];
            $price = $_POST['price'];

            $oldImage = $_POST['image'];
            $newImage = time().$_FILES['newimage']['name'];
            $tempNewImage = $_FILES['newimage']['tmp_name'];
            $destination = $_SERVER['DOCUMENT_ROOT'].'/api/images'."/".$newImage;

            $sqli = "UPDATE productimage SET email = '$email', title = '$title' , description = '$description' , category = '$category' , subCategory = '$subCategory' , price = '$price' , image = '$newImage' WHERE id = '$id' ";
            $result = mysqli_query($conn , $sqli);

            if($result){
                move_uploaded_file($tempNewImage , $destination);
                unlink("images"."/".$oldImage);
                echo json_encode(["success" => "Product Updated"]);
                return;
            }
            else{
                echo json_encode(["success" => "Product Not Updated"]);
                return;
            }
        }
        else if(isset($_FILES['image']))
        {
            $email = $_POST['email'];
            $title = $_POST['title'];
            $description = $_POST['description'];
            $category = $_POST['category'];
            $subCategory = $_POST['subCategory'];
            $price = $_POST['price'];
            $image = time().$_FILES['image']['name'];
            $image_temp = $_FILES['image']['tmp_name'];
            $destination = $_SERVER['DOCUMENT_ROOT'].'/api/images'."/".$image;

            $sqli = "INSERT INTO  productimage (id ,email, title , description , category , subCategory , price , image) VALUES (null ,'$email', '$title' , '$description','$category','$subCategory','$price' ,'$image');";
            $result = mysqli_query($conn , $sqli);

            if($result){
                move_uploaded_file($image_temp , $destination);
                echo json_encode(["success" => "Product Uploaded"]);
                return;
            }
            else{
                echo json_encode(["success" => "Product Not Uploaded"]);
                return;
            }
        }
        else{
            $id = $_POST['id'];
            $email = $_POST['email'];
            $title = $_POST['title'];
            $description = $_POST['description'];
            $category = $_POST['category'];
            $subCategory = $_POST['subCategory'];
            $price = $_POST['price'];

            $sqli = "UPDATE productimage SET email = '$email', title = '$title' , description = '$description' , category = '$category' , subCategory = '$subCategory' , price = '$price' WHERE id = '$id' ";
            $result = mysqli_query($conn , $sqli);

            if($result){
                echo json_encode(["success" => "Product Updated"]);
                return;
            }
            else{
                echo json_encode(["success" => "Product Not Updated"]);
                return;
            }
        }
        
        break;

    case "DELETE":
        $path = explode('/' , $_SERVER['REQUEST_URI']);
        $id = $path[3];
        $image = $path[4];
        
        $sqli = "DELETE FROM productImage WHERE id = '$id'";
        $result = mysqli_query($conn , $sqli);
        if($result){
            unlink('images/'.$image);
            echo "delete";
        }
        else{
            echo "not delete";
        }
        break;
}
?>