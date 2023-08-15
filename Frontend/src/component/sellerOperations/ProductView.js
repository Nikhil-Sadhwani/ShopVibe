import {React,  useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../componentCss/formStyle.css';

import { useContext } from 'react';
import logContext from '../../context/logInOut/logContext';
import alertContext from '../../context/alertContext';

export default function ProductView() {
    const LObj = useContext(logContext);
    const AObj = useContext(alertContext);
    
    const [products , setProducts] = useState([]);
    useEffect(() => {
        
        getProduct();
        // eslint-disable-next-line
    },[]);

    const getProduct =  () =>{
        fetch(`http://localhost/api/productimage.php/${LObj.loginB.email}`).then((res)=>res.json()).then((data)=>{setProducts(data)}).catch(error=>{console.log(error)});
    }

    const handleDelete = async (id , imageName) => {
        
        await axios.delete(`http://localhost/api/productimage.php/${id}/${imageName}`);
        AObj.showAlert("Product is deleted" , "success");
        getProduct();
    }

  return (
    <>
    <div className="container marginTop100">

        <div className="row">
            <div className="col-12 mb-5">
                <h1 className='display-6 fw-bolder text-center'>Your Product</h1>
                <hr/>
            </div>
        </div>
        <div className="row">
            {(products != null) ? products.map((product,index)=> 
                <div key={index} className="col-md-3 mb-4">
                    <div className="card h-100 text-center p-4" >
                        <img src={`http://localhost/api/images/${product.image}`} className="card-img-top" alt={product.title} height="250px"/>
                        <div className="card-body">
                            <h5 className="card-title mb-0">{product.title.substring(0,12)}</h5>
                            <p className="card-text lead fw-bold">${product.price}</p>
                            <Link to={`/productEdit/${product.id}`} className="btn btn-outline-primary mx-2">Edit </Link>
                            <button onClick={()=>handleDelete(product.id , product.image)} className="btn btn-outline-danger mx-2">Delete</button>
                        </div>
                    </div>
                </div>
            ) : 
            <div className="row">
                <div className="col-12 mb-5">
                    <h3 className='display-6 text-center'>No Item</h3>
                </div>
            </div>
            }

            <div className="col-md-3 mb-4">
                <div className="card h-100 text-center p-4" style={{height:"250px"}}>
                    <div className="card-body" style={{display: "flex", alignItems:"center",justifyContent: "center"}}> 
                        <Link to={`/uploadProduct`}>
                            <i className="fa-solid fa-circle-plus" style={{fontSize: "5rem",padding: "40px"}}/>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    </div>
        
            
    </>
  )
}
