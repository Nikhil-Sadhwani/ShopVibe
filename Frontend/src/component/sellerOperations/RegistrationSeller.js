import React, { useContext } from "react";
import { useEffect , useState } from "react";
import { useNavigate} from "react-router-dom";

import '../componentCss/formStyle.css';

import alertContext from "../../context/alertContext";
import logContext from "../../context/logInOut/logContext";

const RegistrationSeller = () => {

    const AObj = useContext(alertContext);
    const LObj = useContext(logContext);
    const navigate = useNavigate();
    const [userData , setUserData] = useState([]);

    useEffect(() => {
        getInfo();
        // eslint-disable-next-line
    },[]);

    const getInfo = async () => {
        
        var url = "http://localhost/api/login.php";
        var headers = {
          "Accept" : "application/json",
          "Content-Type" : "application/json",
        };
        var Data ={
            email : LObj.loginB.email,
            pass:""
        };
        fetch(url , {
          method: "POST",
          headers :  headers,
          body: JSON.stringify(Data)
        }).then((response) => response.json()).then((response)=>{setUserData(response[0].data)}).catch((error)=>console.log(error));
    }
   
    const handleInputs = (e) =>{
        setUserData(values => ({...values , [e.target.name] : e.target.value}));
    }
    
    const becomeSeller = () => {
        var url = `http://localhost/api/registration.php/${LObj.loginB.id}`;
        var headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
        }
        var Data ={
            username : userData.username,
            mobileNumber: userData.mobileNumber,
            email : userData.email,
            pass : LObj.loginB.pass,
            role : "seller",
            shopname : userData.shopname,
            address : userData.address,
            pancard : userData.pancard
        };
        fetch(url ,{
            method : "POST",
            headers :headers,
            body : JSON.stringify(Data)
        }).then((res)=>res.json()).then((response)=>{
            AObj.showAlert(response[0].result , "success");
            navigate("/productView");
        }).catch((error)=>{
            AObj.showAlert(error, "danger");
            console.log(error);
        });
    }

    const handleSubmit =  (e) => {
        e.preventDefault();
        becomeSeller();
        LObj.setRole("seller");
    }


    return(
        <>
            <div className="container marginTop100">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className='display-6 fw-bolder text-center'>Registration for Seller</h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center sellerFormContainer">
                    <form className="elementInput formInsideElement" onSubmit={handleSubmit}>
                        <input type="hidden" value="" name="id" />
                    <div>
                        <label htmlFor="">Email:</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">@</span>
                            <input type="text" className="form-control" placeholder="Username" 
                            name='email'
                            value={userData.email}
                            onChange={handleInputs}
                            required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">Full Name:</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control"
                            name='username'
                            value={userData.username}
                            onChange={handleInputs}
                            placeholder="Enter Product Name"  required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">Mobile Number:</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control"
                            name='mobileNumber'
                            value={userData.mobileNumber}
                            onChange={handleInputs}
                            placeholder="Enter Product Name"  required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">Shop Name:</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control"
                            name='shopname'
                            onChange={handleInputs}
                            placeholder="Enter Product Name"  required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">Address:</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control"
                            name='address'
                            onChange={handleInputs}
                            placeholder="Enter Product Name"  required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">Pan Card Number:</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control"
                            name='pancard'
                            onChange={handleInputs}
                            placeholder="Enter Product Name"  required />
                        </div>
                    </div>
                    
                    <div>
                        <input
                        type="submit"
                        value="Register"
                        name="submitRegistration"
                        className="btn btn-primary input-width100"
                        />
                    </div>
                </form>
                    

                </div>
            </div>
        </>
    );
}

export default RegistrationSeller;
