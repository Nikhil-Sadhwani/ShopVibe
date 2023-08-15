import React from 'react'
import { Link } from 'react-router-dom';


import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';

import { useContext } from 'react';
import showContext from '../context/showItem/showContext';
import logContext from '../context/logInOut/logContext';

import './componentCss/productShow.css';

export default function ShowProduct() {

    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addCart(product));
    }

    const Obj = useContext(showContext);
    const LObj = useContext(logContext);

    return (
        <>
            <div className='colFirst'
            >
                <img src={`http://localhost/api/images/${Obj.product.image}`} alt={Obj.product.title} height="400px" width="400px"/>
            </div>
            <div className='colSecond'
            >
                <h4 className="text-uppercase text-black-50">
                    {Obj.product.category}
                </h4>
                <h1 className="display-5">{Obj.product.title}</h1>

                <h3 className="display-6 fw-bold my-4">
                    ${Obj.product.price}
                </h3>
                <p className="lead">{Obj.product.description}</p>
                {LObj.loginB.bool ? <>
                    <button className="btn btn-outline-dark me-2" onClick={()=>addProduct(Obj.product)}>Add to Cart</button>
                    <Link className='btn btn-dark me-2' to="/cart"> Go to cart</Link>
                </>
                    :
                    <>
                    <Link className='btn btn-outline-dark me-2' to="/signin"> Sign In</Link>
                    <Link className='btn btn-outline-dark me-2' to="/signup"> Sign Up</Link>
                    </>
                }
            </div>

        </>
    );
}
