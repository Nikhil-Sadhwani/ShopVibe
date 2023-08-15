import React from 'react'
import { Link, useNavigate, useParams} from 'react-router-dom';


import { useContext } from 'react';
import showContext from '../context/showItem/showContext';
import logContext from '../context/logInOut/logContext';
import axios from 'axios';
import alertContext from '../context/alertContext';

export default function ShowAllProduct() {

    const Obj = useContext(showContext);
    const LObj = useContext(logContext);
    const AObj = useContext(alertContext);
    const navigate = useNavigate();

    const subCat = {
        electronics : { one :"earPhones" , two: "laptop" , three:"speaker"},

        fashion : { one :"kids" , two: "mens" , three:"womens"},

        homeFurniture : { one :"carpet" , two: "decoration" , three:"tableSet"},

        toyBeauty : { one :"toys" , two: "skinCare" , three:"hairCare"},

        mobile : { one :"samsung" , two: "realme" , three:"vivo"},

        kitchen : { one :"cookware" , two: "dinnerSet" , three:"glasses"},
        
        appliances : { one :"AC" , two: "iron" , three:"microwave"},

    };

    const {category} = useParams();

    const handleDelete = async (id , image) => {
        await axios.delete(`http://localhost/api/productimage.php/${id}/${image}`);
        AObj.showAlert("Product deleted successfully" , "success");
        navigate(`/`);
    }

    return(
        <>
        {Obj.filter !== null ? 
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                   <button className="btn btn-outline-dark me-2" onClick={() => Obj.setFliter(Obj.data)}>All</button>
                   <button className="btn btn-outline-dark me-2" onClick={() => Obj.filterProduct(subCat[category]['one'])}>{ (subCat[category]['one']).charAt(0).toUpperCase() + (subCat[category]['one']).substring(1)}</button>
                   
                   <button className="btn btn-outline-dark me-2" onClick={() => Obj.filterProduct(subCat[category]['two'])}>{ (subCat[category]['two']).charAt(0).toUpperCase() + (subCat[category]['two']).substring(1)}</button>
                   
                   <button className="btn btn-outline-dark me-2" onClick={() => Obj.filterProduct(subCat[category]['three'])}>{ (subCat[category]['three']).charAt(0).toUpperCase() + (subCat[category]['three']).substring(1)}</button>
                   
               </div>
               { Obj.filter.map((product,key) => {
                   return(
        
                       <div key={key} className="col-md-4 mb-4">
                           <div className="card h-100 text-center p-4" >
                           <img src={`http://localhost/api/images/${product.image}`} className="card-img-top" alt={product.title} height="250px"/>
                           <div className="card-body">
                               <h5 className="card-title mb-0">{product.title.substring(0,12)}</h5>
                               <p className="card-text lead fw-bold">${product.price}</p>
                               <Link to={`/productDetails/${product.id}`} className="btn btn-outline-dark">Buy Now</Link>
                               {LObj.role !== "admin" ? <></>
                               : <>
                                <Link to={`/productEdit/${product.id}`} className="btn btn-outline-primary mx-2">Edit </Link>
                                <button onClick={()=>handleDelete(product.id , product.image)} className="btn btn-outline-danger mx-2 ">Delete</button>
                                </>
                                }
                               </div>
                           </div>
                       </div>
                     
                   );
                   }) 
               }
            </>
             :
             <div className="row">
                <div className="col-12 mb-5">
                    <h3 className='display-6 text-center'>No Result</h3>
                </div>
            </div>
            
        }
            
        </>
    );
}
