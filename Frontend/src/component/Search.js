import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import logContext from '../context/logInOut/logContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './componentCss/formStyle.css';
import alertContext from '../context/alertContext';

export default function Search() {
    const {name} = useParams();
    const LObj = useContext(logContext);
    const AObj = useContext(alertContext);
    const navigate = useNavigate();
    const [productList , setProductList] = useState([]);
    useEffect(() => {
        getData();
        // eslint-disable-next-line
    },[]);

    const getData = async () => {
        await axios.get(`http://localhost/api/productimage.php`).then((res)=>{setProductList(res.data)});
    }

    const handleDelete = async (id , image) => {
        await axios.delete(`http://localhost/api/productimage.php/${id}/${image}`);
        AObj.showAlert("Product deleted successfully" , "success");
        navigate(`/`);
    }

  return (
    <>
        <div className="container row marginTop100" style={{display:"flex" , alignItems:"center" , height:"100vh" ,justifyContent: "space-between" , margin:"auto"}}>
        {productList.filter((product)=>{
                    if(product.title.toLowerCase().includes(name.toLowerCase())){
                        return product;
                    }
                    return false;
                }).map((product)=>{
                    return(<>
                        <div className="col-md-3 mb-4">
                            <div className="card h-100 text-center p-4" key={product.id} >
                            <img src={`http://localhost/api/images/${product.image}`} className="card-img-top" alt={product.title} height="250px"/>
                            <div className="card-body">
                                <h5 className="card-title mb-0">{product.title.substring(0,12)}</h5>
                                <p className="card-text lead fw-bold">${product.price}</p>
                                <Link to={`/productDetails/${product.id}`} className="btn btn-outline-dark">Buy Now</Link>
                                {LObj.role !== "admin" ? <></>
                                : <>
                                <Link to={`/productEdit/${product.id}`} className="btn btn-outline-primary mx-2">Edit </Link>
                                <button onClick={()=>handleDelete(product.id , product.image)} className="btn btn-outline-danger mx-2 mt-2">Delete</button>
                                </>
                                }
                                </div>
                            </div>
                        </div>
                    </>);
            
                })}
            
        </div>
    </>
  )
}
