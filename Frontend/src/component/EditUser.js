import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logContext from "../context/logInOut/logContext";
import './componentCss/formStyle.css';

import { motion } from "framer-motion";

export default function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [inputs, setInputs] = useState([]);

    const LObj = useContext(logContext);


    useEffect(() => {
        getUser();
        // eslint-disable-next-line
    } , []);

    function getUser(){
        axios.get(`http://localhost/api/user.php/${id}`).then(function(response){
            setInputs(response.data.data);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://localhost/api/user.php/${id}`, inputs).then(function (response) {
            navigate('/');
        });

    }


    return (
        <div className="wholeStructure">

            <motion.div animate={{x:500 , scale:1}} initial={{scale:0}} transition={{type:"spring" , duration:2}} className="container formContainer" >
                <h2 style={{ textAlign: "center" }}>Edit User</h2>
                <form onSubmit={handleSubmit} className="elementInput formInsideElement">
                    <div className="mb-3">
                        <label htmlFor="">Full Name :</label>
                        <br />
                        <input value={inputs.username} className='input-width100' type="text" name="username" placeholder="Enter your Name" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Mobile Number :</label>
                        <br />
                        <input value={inputs.mobileNumber} className='input-width100' type="text" name="mobileNumber" placeholder="Enter your Number" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Email :</label>
                        <br />
                        <input value={inputs.email} className='input-width100' type="text" name="email" placeholder="Enter your Email" onChange={handleChange} />
                    </div>

                    {LObj.role === "seller" || LObj.role === "admin" ? 
                        <>
                            <div className="mb-3">
                                <label htmlFor="">Shop Name :</label>
                                <br />
                                <input value={inputs.shopname} className='input-width100' type="text" name="shopname" placeholder="Enter your Shop Name" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Address:</label>
                                <br />
                                <input value={inputs.address} className='input-width100' type="text" name="address" placeholder="Enter your Address" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Pan Card Number :</label>
                                <br />
                                <input value={inputs.pancard} className='input-width100' type="text" name="pancard" placeholder="Enter your PanCard Number" onChange={handleChange} />
                            </div>
                        </>
                        :<></>
                    }
                    {LObj.role === "admin" ?
                        <>
                            <div className="mb-3">
                                <label htmlFor="">Role :</label>
                                <br />
                                <input value={inputs.role} className='input-width100' type="text" name="role" placeholder="Enter Role" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Password :</label>
                                <br />
                                <input value={inputs.password} className='input-width100' type="text" name="password" placeholder="Enter Your Password" onChange={handleChange} />
                            </div>
                        </> :
                        <></>
                    }
                    <input type="submit" value="Save Changes" name="submitSignUp" className="btn btn-primary input-width100" />
                    </form>
            </motion.div>
        </div>
    )
}