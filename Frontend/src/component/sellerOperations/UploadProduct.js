import axios from 'axios';
import React, { useState } from 'react';
import '../componentCss/formStyle.css';

import { useContext } from 'react';
import logContext from '../../context/logInOut/logContext';
import alertContext from '../../context/alertContext';

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function UploadProduct() {

    const navigate = useNavigate();
    const LObj = useContext(logContext);
    const AObj = useContext(alertContext);

    // const [msg, setMsg] = useState('');

    const [inputs, setInputs] = useState({email:LObj.loginB.email , category:"",
    subCategory:""

});
    const  handleInputs = (e) => {
        const name = e.target.name;
        if(name === "image"){
            setInputs((values) => ({...values , [name] : e.target.files[0]}));
        }
        else{
            setInputs((values) => ({...values , [name] : e.target.value}));
        }
    }

    const uploadProduct = async () => {
        const response = await axios.post("http://localhost/api/productimage.php" ,inputs , {
            headers:{'Content-Type' : "multipart/form-data"}
        });

        if(response.data.success){
            // setMsg(response.data.success);
            navigate("/productView");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(inputs.email === "" ){
            AObj.showAlert("Email is empty " , "danger");
            navigate("/uploadProduct");
        }
        else if(inputs.category === "Select Category" || inputs.category === ""){
            AObj.showAlert("Category is Not Selected" , "danger");
            navigate("/uploadProduct");
        }
        else if(inputs.subCategory === "Select Sub-Category" || inputs.subCategory === "" || inputs.subCategory === "Select Category First"){
            AObj.showAlert("Sub-Category is Not Selected" , "danger");
            navigate("/uploadProduct");
        }
        else{
            await uploadProduct();
            AObj.showAlert("Product is uploaded" , "success");

        }
    }

    const subCat = {
        electronics : { one :"earPhones" , two: "laptop" , three:"speaker"},

        fashion : { one :"kids" , two: "mens" , three:"womens"},

        homeFurniture : { one :"carpet" , two: "decoration" , three:"tableSet"},

        toyBeauty : { one :"toys" , two: "skinCare" , three:"hairCare"},

        mobile : { one :"samsung" , two: "realme" , three:"vivo"},

        kitchen : { one :"cookware" , two: "dinnerSet" , three:"glasses"},
        
        appliances : { one :"AC" , two: "iron" , three:"microwave"},
    };

    return (
        <>
            <div className="container marginTop100">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className='display-6 fw-bolder text-center'>Upload Item</h1>
                        <hr />
                    </div>
                </div>
                <motion.div animate={{scale:1}} initial={{scale:0}} transition={{type:"spring" , duration:2}} className="row justify-content-center sellerFormContainer">
                    <form className="elementInput formInsideElement" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="">Email:</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">@</span>
                                <input type="text" value={LObj.loginB.email} className="form-control" placeholder="Username" 
                                name='email'
                                onChange={handleInputs}
                                 disabled required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="">Product Name:</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" 
                                name='title'
                                onChange={handleInputs}
                                placeholder="Enter Product Name"  required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="">Description:</label>
                            <div className="input-group mb-3">
                                <textarea className="form-control" 
                                name='description'
                                onChange={handleInputs}
                                placeholder='About the product'
                                 ></textarea>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="">Category:</label>
                            <select onChange={handleInputs} className="form-select" type="text" name='category' required >
                                <option defaultValue>Select Category</option>
                                <option value="electronics">electronics</option>
                                <option value="fashion">fashion</option>
                                <option value="homeFurniture">homeFurniture</option>
                                <option value="kitchen">kitchen</option>
                                <option value="mobile">mobile</option>
                                <option value="toyBeauty">ToyBeauty</option>
                                <option value="appliances">appliances</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="">Sub-Category:</label>
                            <select onChange={handleInputs} className="form-select" type="text" name='subCategory' >
                                {(inputs.category === "Select Category" || inputs.category === "") ? 
                                    <>
                                        <option  defaultValue>Select Category First</option>
                                    </> :
                                    <>
                                        <option  defaultValue>Select Sub-Category</option>
                                        <option value={subCat[inputs.category]['one']}>{subCat[inputs.category]['one']}</option>
                                        <option value={subCat[inputs.category]['two']}>{subCat[inputs.category]['two']}</option>
                                        <option value={subCat[inputs.category]['three']}>{subCat[inputs.category]['three']}</option>
                                    </>
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="">Price:</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text">$</span>
                                <input type="text" className="form-control"
                                name='price'
                                onChange={handleInputs}
                                placeholder='Price'
                                  required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="">Image:</label>
                            <div className="input-group mb-3">
                                <input type="file" className="form-control" 
                                name='image'
                                onChange={handleInputs}
                                 id="inputGroupFile02" required/>
                            </div>
                        </div>
                        <div>

                            <input
                                type="submit"
                                value="Upload"
                                name="uploadImage"
                                className="btn btn-primary mb-5 me-2"
                                style={{ width: "18%" }}
                            />
                           <button
                            onClick={() => {navigate("/productView")}}
                            className="btn btn-danger mb-5 me-3"
                            style={{ width: "18%" }}
                        >Cancel</button>
                        </div>
                    </form>

                </motion.div>
            </div>
        </>
    )
}
