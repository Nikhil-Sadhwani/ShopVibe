
import './componentCss/formStyle.css';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import alertContext from "../context/alertContext";
import logContext from '../context/logInOut/logContext';

import { motion } from 'framer-motion';

export default function Signup() {
  const navigate = useNavigate();
  
  const AObj = useContext(alertContext);
  const LObj = useContext(logContext);


  const [username, setusername] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  
  const handleShowPass1 = () => {
    var x = document.getElementById("passInput");
    if(x.type === "password" ){
      x.type = "text";
    }
    else{
      x.type = "password";
    }
  }
  const handleShowPass2 = () => {
    var x = document.getElementById("cpassInput");
    if(x.type === "password" ){
      x.type = "text";
    }
    else{
      x.type = "password";
    }
  }

  

  const handleChange = (e, type) => {
    switch(type){
      case "username":
        setusername(e.target.value);
        break;
     
      case "mobileNumber":
        setMobileNumber(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "pass1":
        setPass1(e.target.value);

        break;
      case "pass2":
        setPass2(e.target.value);
        break;
      case "role":
        setRole(e.target.value);
        break;
      default:
    }

  };

  function checkEmail(){
    var url = "http://localhost/api/checkEmail.php";
    var headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
    var Data = {
      email :  email
    }
    fetch(url , {
      method : "POST",
      headers : headers,
      body : JSON.stringify(Data)
    }).then((response) => response.json()).then((response) => {
      setError(response[0].result);
    }).catch((err) => {
      setError(err);
      console.log(err);
    });

  }
 

const handleSubmit = (event) => {
    event.preventDefault();
    if(username !== "" && mobileNumber !== "" && email !== "" && pass1 !== "" && pass2 !== ""){
      if(error === "Email already exsist"){
          AObj.showAlert(error , "danger");
      }
      else{

        if(!(pass1.length < 8)){

          if(pass1 === pass2){

            var url = "http://localhost/api/registration.php";
            var headers = {
              "Accept": "application/json",
              "Content-Type": "application/json"
            }
            var Data = {
                username : username,
                mobileNumber: mobileNumber,
                email: email,
                pass : pass2,
                role : role,
                shopname : "",
                address : "",
                pancard : ""
            }
            fetch(url , {
              method : "POST",
              headers : headers,
              body : JSON.stringify(Data)
            }).then((response) => response.json()).then((response) => {
              AObj.showAlert(response[0].result, "success");
              navigate('/signin');
            }).catch((err) => {
              AObj.showAlert(err, "danger");
              console.log(err);
            });   

          }
          else{
            AObj.showAlert("Confirm Password is not matched with Password" , "danger");
          }
        }
        else{
          AObj.showAlert("Password not less than 8" , "danger");
        }
      }
    }
    else{
      AObj.showAlert("All fields are required!");
    }

  };

  return (
    <>
      <div className="wholeStructure">

        <motion.div animate={{x:150 , scale:1}} initial={{scale:0}} transition={{type:"just" , duration:1}}>
          <h2 className="sizeOfHead">Welcome in the ShopVibe </h2>
          <p className="sizeOfPara">Sign up to make Shopping smartly</p>
        </motion.div>

        <motion.div animate={{x:250 , scale:1}} initial={{scale:0}} transition={{type:"spring" , duration:2}} className="container formContainer" >
     
          
          <h2 style={{textAlign:"center"}}>Sign Up</h2>
          <form
          className="elementInput formInsideElement"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label htmlFor="">Full Name :</label>
              <br />
              <div className="d-flex">

                <input
                  className="input-width100"
                  type="text"
                  name="username"
                  value={username}
                  placeholder="Enter your Name"
                  onChange={(e) => handleChange(e, "username")}
                  required
                />
                <i className="fa-solid fa-user" style={{marginLeft: "9px" , fontSize: "26px"}}/>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="">Mobile Number :</label>
              <br />
              <div className="d-flex">
                  <input
                    className="input-width100"
                    type="text"
                    name="mobileNumber"
                    value={mobileNumber}
                    placeholder="Enter your Number"
                    onChange={(e) => handleChange(e, "mobileNumber")}
                    required
                  />
                  <i className="fa-solid fa-phone"  style={{marginLeft: "9px" , fontSize: "26px"}}/>
              </div>
              
            </div>
            <div className="mb-3">
              <label htmlFor="">Email :</label>
              <br />
              <div className="d-flex">

                <input
                  className="input-width100"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter your Email"
                  onBlur={checkEmail}
                  onChange={(e) => handleChange(e, "email")}
                  required
                />
                <i className="fa-solid fa-envelope" style={{marginLeft: "9px" , fontSize: "26px"}}/>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="">Password :</label>
              <br />
              <div className="d-flex">

                <input
                  className="input-width100"
                  autoComplete="off"
                  type="password"
                  name="pass1"
                  value={pass1}
                  placeholder="Create your Password"
                  id="passInput"
                  onChange={(e) => handleChange(e, "pass1")}
                  required
                />
                <i className="fa-solid fa-eye " onClick={handleShowPass1} style={{marginLeft: "9px" , fontSize: "26px"}}/>  
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="">Confirm Password :</label>
              <br />
              <div className="d-flex">

                <input
                  className="input-width100"
                  autoComplete="off"
                  type="password"
                  name="pass2"
                  value={pass2}
                  id="cpassInput"
                  placeholder="Create your Password"
                  onChange={(e) => handleChange(e, "pass2")}
                  required
                />
                <i className="fa-solid fa-eye " onClick={handleShowPass2} style={{marginLeft: "9px" , fontSize: "26px"}}/>  
              </div>
            </div>
            {LObj.role === "admin" ? <>
                <div className="mb-3">
                  <label htmlFor="">Role :</label>
                  <br />
                  <div className="d-flex">
                    <input
                      className="input-width100"
                      type="text"
                      name="role"
                      value={role}
                      placeholder="Enter The Role"
                      onChange={(e) => handleChange(e, "role")}
                      required
                    />
                    <i className="fa-solid fa-user" style={{marginLeft: "9px" , fontSize: "26px"}}/>
                  </div>
                </div>
            
            </>
              :
              <></>
          }
            
            <div className="mb-3">
              <label htmlFor="">
                If you have already account then ,{" "}
                <Link to="/signin" style={{ display: "inline-block" }}>
                  Sign in
                </Link>
              </label>
            </div>
            <input
              type="submit"
              value="Sign Up"
              name="submitSignUp"
              className="btn btn-primary input-width100"
            />
          </form>
        </motion.div>
      </div>
    </>
  );
}
