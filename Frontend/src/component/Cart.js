import React, { useContext } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';

import { useDispatch } from 'react-redux';
import { addCart , delCart  } from '../redux/action';
import alertContext from '../context/alertContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './componentCss/colorStyle.css';
import logContext from '../context/logInOut/logContext';

export default function Cart() {
    const state = useSelector((state) => state.handleCart);
    const LObj = useContext(logContext);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addCart(product));
    }
    const delProduct = (product) => {
        dispatch(delCart(product));
    }


  return (

    <div className='container marginTop100'>
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className='display-6 fw-bolder text-center'>Cart</h1>
            <hr/>
          </div>
        </div>
        {state.length === 0 ||  !LObj.loginB.bool? 
            <div className="row">
                <div className="col-12 mb-5">
                    <h3 className='display-6 text-center'>No Item</h3>
                </div>
            </div>
            :<>
            {state.map((product) => {
                return (
               <>
               <div className="row mb-5" style={{background:"white", padding:"34px"}}>
                    <div className="col-md-6">
                        <img src={`http://localhost/api/images/${product.image}`} alt={product.title} height={200} width={180} />
                    </div>
                    <div className="col-md-6" style={{padding:"17px"}}>
                        <h3>{product.title}</h3>
                        <p className="lead fw-bold">
                            {product.qty} X ${product.price} =${product.qty * product.price}
                        </p>
                        <button className="btn btn-outline-dark me-4" 
                        onClick={()=>delProduct(product)}
                        ><i className='fa fa-minus'></i></button>
                        <button className="btn btn-outline-dark me-4" 
                        onClick={()=>addProduct(product)}
                        ><i className='fa fa-plus'></i></button>
                    </div>
                </div>
               </>
               );
            })}
            <Link className='btn my-2 gradientColor' to={`/payment`} style={{display:"block" , width:"100%" ,fontSize: "20px" , fontWeight: "bold"}}>Buy</Link>
            </>
        }
       
    </div>
  )
}
