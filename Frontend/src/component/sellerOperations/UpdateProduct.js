import React, { useContext } from "react";
import { useEffect , useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import '../componentCss/formStyle.css';

import alertContext from "../../context/alertContext";
import { motion } from "framer-motion";

const UpdateProduct = () => {

    const AObj = useContext(alertContext);
    const [fetchProduct , setFetchProduct] = useState([]);
    const navigate = useNavigate();
    
    const {id} = useParams();

    useEffect(() => {
        getProduct();
        // eslint-disable-next-line
    } , []);

    const getProduct = async () => {
         await fetch(`http://localhost/api/productimage.php/${id}`).then((response) => response.json()).then((response) => {
    
            setFetchProduct(response[0].data);
            setSelectDefault({
                category : response[0].data['category'],
                subCategory : response[0].data['subCategory']
            });
          }).catch((err) =>{
            console.log(err);
          });
        
    }

    const [selectDefault , setSelectDefault] = useState([]);

    const handleInputs = (e) =>{
        const name = e.target.name;
        if(name === "newimage"){
            setFetchProduct(values => ({...values , [name] : e.target.files[0]}))
        }
        else{
            setFetchProduct(values => ({...values , [name] : e.target.value}))
        }
    }
    

    const updateProduct = async () => {
        await axios.post("http://localhost/api/productimage.php" , fetchProduct ,{
            headers:{'Content-Type' : "multipart/form-data"}
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        AObj.showAlert("Product Updated" , "success");
        await updateProduct();
        navigate("/productView");
        console.log(fetchProduct);
    }


    return(
        <>
            <div className="container marginTop100">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className='display-6 fw-bolder text-center'>Edit Item</h1>
                        <hr />
                    </div>
                </div>
                <motion.div animate={{scale:1}} initial={{scale:0}} transition={{type:"spring" , duration:2}} className="row justify-content-center sellerFormContainer">
                    <form className="elementInput formInsideElement" onSubmit={handleSubmit}>
                        <input type="hidden" value={fetchProduct.id} name="id" />
                    <div>
                        <label htmlFor="">Email:</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">@</span>
                            <input type="text" className="form-control" placeholder="Username" 
                            value={fetchProduct.email}
                            name='email'
                            onChange={handleInputs}
                             disabled required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">Product Name:</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" 
                            value={fetchProduct.title}
                            name='title'
                            onChange={handleInputs}
                            placeholder="Enter Product Name"  required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">Description:</label>
                        <div className="input-group mb-3">
                            <textarea className="form-control" 
                            value={fetchProduct.description}
                            name='description'
                            onChange={handleInputs}
                             ></textarea>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">Category:</label>
                            <select onChange={handleInputs} className="form-select mb-3" type="text" name='category' required >
                                    <option value={selectDefault.category}>{selectDefault.category}</option>
                                    <option value="electronics">electronics</option>
                                    <option value="fashion">fashion</option>
                                    <option value="grocery">grocery</option>
                                    <option value="homeFurniture">homeFurniture</option>
                                    <option value="kitchen">kitchen</option>
                                    <option value="mobile">mobile</option>
                                    <option value="toyBeauty">ToyBeauty</option>
                            </select>
                    </div>
                    <div>
                        <label htmlFor="">Sub-Category:</label>
                        <select onChange={handleInputs} className="form-select mb-3" type="text" name='subCategory' >
                                <option  value={selectDefault.subCategory}>{selectDefault.subCategory}</option>
                                <option value="earPhones">electronics-earPhones</option>
                                <option value="laptop">electronics-laptop</option>
                                <option value="speaker">electronics-speaker</option>
                                <option value="kids">fashion-kids</option>
                                <option value="mens">fashion-mens</option>
                                <option value="womens">fashion-womens</option>
                                <option value="carpet">homeFurniture-carpet</option>
                                <option value="decoration">homeFurniture-decoration</option>
                                <option value="tableSet">homeFurniture-tableSet</option>
                                <option value="cookware">kitchen-cookware</option>
                                <option value="dinnerSet">kitchen-dinnerSet</option>
                                <option value="glasses">kitchen-glasses</option>
                                <option value="realme">mobile-realme</option>
                                <option value="samsung">mobile-samsung</option>
                                <option value="vivo">mobile-vivo</option>
                                <option value="hairCare">ToyBeauty-hairCare</option>
                                <option value="skinCare">ToyBeauty-skinCare</option>
                                <option value="toys">ToyBeauty-toys</option>
                            </select>
                    </div>
                    <div>
                        <label htmlFor="">Price:</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input type="text" className="form-control"
                            value={fetchProduct.price}
                            name='price'
                            onChange={handleInputs}
                              required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">Current Image:</label>
                        <div className="input-group mb-3">
                        <img src={`http://localhost/api/images/${fetchProduct.image}`} 
                        className="card-img-top" alt="Loading.." 
                        style={{height:"250px", width:"200px"}}/>
                        </div>
                        <input type="hidden"value={fetchProduct.image} name="image"  />
                    </div>
                    <div>
                        <label htmlFor="">Update Image:</label>
                        <div className="input-group mb-3">
                            <input type="file" className="form-control" 
                            name='newimage'
                            onChange={handleInputs}
                             id="inputGroupFile02" />
                        </div>
                    </div>
                    <div>

                        <input
                            type="submit"
                            value="Update"
                            name="updateImage"
                            className="btn btn-primary mb-5 me-3"
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
    );
}

export default UpdateProduct;
