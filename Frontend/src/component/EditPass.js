import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logContext from "../context/logInOut/logContext";
import './componentCss/formStyle.css';

import { motion } from "framer-motion";
import alertContext from "../context/alertContext";

export default function EditUser() {
    const navigate = useNavigate();
    
    const LObj = useContext(logContext);
    const AObj = useContext(alertContext);
    
    const [inputs, setInputs] = useState({
        email : LObj.loginB.email
    });


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }
    
    const handleShowPass1 = () => {
        var x = document.getElementById("oldPassInput");
        if(x.type === "password" ){
            x.type = "text";
        }
        else{
            x.type = "password";
        }
    }
    const handleShowPass2 = () => {
        var x = document.getElementById("newPassInput");
        if(x.type === "password" ){
            x.type = "text";
        }
        else{
            x.type = "password";
        }
    }
    const handleShowPass3 = () => {
        var x = document.getElementById("confirmPassInput");
        if(x.type === "password" ){
            x.type = "text";
        }
        else{
            x.type = "password";
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(inputs.newpass.length < 8 || inputs.confirmpass.length < 8){
            AObj.showAlert("Password length is less 8 which is danger" , "danger");
        }
        else{
            if(inputs.newpass !== inputs.confirmpass){
                AObj.showAlert("New and Confirm password is Doesn't matched" , "danger");
            }
            else{
                axios.post(`http://localhost/api/user.php`, inputs).then(function (response) {
                    AObj.showAlert(response.data.result , response.data.type);
                    navigate('/');
                });
            }
        }
    }


    return (
        <div className="wholeStructure">

            <motion.div animate={{x:500 , scale:1}} initial={{scale:0}} transition={{type:"spring" , duration:2}} className="container formContainer" >
                <h2 style={{ textAlign: "center" }}>Change Password</h2>
                <form onSubmit={handleSubmit} className="elementInput formInsideElement">
                    <div className="mb-3">
                        <label htmlFor="">Old Password :</label>
                        <br />
                        <div className="d-flex">

                            <input
                            className="input-width100"
                            autoComplete="off"
                            type="password"
                            name="oldpass"
                            id="oldPassInput"
                            value={inputs.oldpass}
                            placeholder="Enter your Old Password"
                            onChange={handleChange}
                            required
                            />
                            <i className="fa-solid fa-eye " onClick={handleShowPass1} style={{marginLeft: "9px" , fontSize: "26px"}}/>  
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">New Password :</label>
                        <br />
                        <div className="d-flex">

                            <input
                            className="input-width100"
                            autoComplete="off"
                            type="password"
                            name="newpass"
                            id="newPassInput"
                            value={inputs.newpass}
                            placeholder="Enter your New Password"
                            onChange={handleChange}
                            required
                            />
                            <i className="fa-solid fa-eye " onClick={handleShowPass2} style={{marginLeft: "9px" , fontSize: "26px"}}/>  
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
                            name="confirmpass"                            
                            id="confirmPassInput"
                            value={inputs.confirmpass}
                            placeholder="Enter your Confirm New Password"
                            onChange={handleChange}
                            required
                            />
                            <i className="fa-solid fa-eye " onClick={handleShowPass3} style={{marginLeft: "9px" , fontSize: "26px"}}/>  
                        </div>
                    </div>
                    
                    <input type="submit" value="Save Changes" name="submitSignUp" className="btn btn-primary input-width100" />
                    </form>
            </motion.div>
        </div>
    )
}