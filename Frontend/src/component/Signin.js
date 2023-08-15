
import './componentCss/formStyle.css';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import alertContext from "../context/alertContext";
import logContext from "../context/logInOut/logContext";

import { motion } from 'framer-motion';

export default function Signin() {
  const navigate = useNavigate();

  const CObj = useContext(alertContext);
  const LCObj = useContext(logContext);

  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");

  const handleShowPass = () => {
    var x = document.getElementById("passInput");
    if(x.type === "password"){
      x.type = "text";
    }
    else{
      x.type = "password";
    }
  }

  const handleChange = (e, type) => {

    switch(type){
      case "email":
        setEmail(e.target.value);
        break;
      case "pass1":
        setPass1(e.target.value);
        break;
      default:
    }

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(email !== "" && pass1 !== ""){
      var url = "http://localhost/api/login.php";
      var headers = {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
      };
      var Data = {
        email : email,
        pass : pass1
      };
      fetch(url , {
        method: "POST",
        headers :  headers,
        body: JSON.stringify(Data)
      }).then((response) => response.json()).then((response) => {
        if(response[0].result === "Invalid email" || response[0].result === "Invalid password" ){
          CObj.showAlert(response[0].result , "danger");
        }
        else{
          CObj.showAlert(response[0].result , "success");
          LCObj.handleLogInOut(response[0].data['email'] ,response[0].data['id'] ,response[0].data['role'] , response[0].data['password'] );
          navigate("/");
        }
      }).catch((err) =>{
        CObj.showAlert(err , "danger");
        console.log(err);
      });
      
    }
    else{
      CObj.showAlert("All fields are required" , "danger");
    }
  };

  return (
    <>
      <div className="wholeStructure">

        <motion.div animate={{x:150, scale:1}} initial={{scale:0}} transition={{type:"just" , duration:1}}>
          <h2 className="sizeOfHead">Welcome in the ShopVibe </h2>
          <p className="sizeOfPara">Buy your products easily</p>
        </motion.div>

        <motion.div animate={{x:250, scale:1}} initial={{scale:0}} transition={{type:"spring" , duration:2}} className="container formContainer">
  
            
        <h2 style={{textAlign:"center"}}>Sign In</h2>
        <form
        className="elementInput formInsideElement"
          onSubmit={handleSubmit}
        >
          
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
                onChange={(e) => handleChange(e, "pass1")}
                id="passInput"
                required
              />
              <i className="fa-solid fa-eye " onClick={handleShowPass} style={{marginLeft: "9px" , fontSize: "26px"}}/>  
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="">
              If you does not have any account then ,{" "}
              <Link to="/signup" style={{ display: "inline-block" }}>
                Sign up
              </Link>
            </label>
          </div>
          <input
            type="submit"
            value="Sign in"
            name="submitSignUp"
            className="btn btn-primary input-width100"
          />
        </form>
      </motion.div>
      </div>
        
    </>
  );
}
