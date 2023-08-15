import React, { useContext } from 'react'
import './componentCss/paymentStyle.css';
import { useSelector } from 'react-redux';
import alertContext from '../context/alertContext';
import { useNavigate } from 'react-router-dom';

const  PaymentForm = ()=> {
    const AObj = useContext(alertContext);
    const navigate = useNavigate();
    const state = useSelector((state) => state.handleCart);
    const handlePay = () => {
        AObj.showAlert("Payemnt successful" , "success");
        navigate("/");
    }
  return (
    <>
    <div className="paymentcontainer">

    <form action=""  onSubmit={handlePay}>

        <div className="rowpayment">
            <h4 className='classh4'>Product</h4> 
            {state.map((product) => {
                return(<>
                    <div className="input-group input-group-icon">
                        <div>
                            <img src={`http://localhost/api/images/${product.image}`} style={{width:"145px"}} alt="loading.." />
                        </div>
                        <div style={{padding:"30px"}}>
                            <h6>{product.title}</h6>
                            <p className="lead">
                            {product.qty} X ${product.price} =${product.qty * product.price}
                            </p>
                        </div>
                    </div>
                
                </>);
            })}

            
        </div>
        <div className="rowpayment">

                <h4 className='classh4'>Phone Number</h4> 
            <div className="input-group input-group-icon">

                <input  className='classinput' type="text" placeholder="Enter Phone number" required/>
                <div className="input-icon">
                    <i className="fa fa-phone"></i>
                </div>
            </div> 
                <h4 className='classh4'>Address</h4> 
            <div className="input-group input-group-icon">
                
                <input  className='classinput' type="text" placeholder="Enter Address" required/>
                <div className="input-icon">
                    <i className="fa fa-envelope"></i>
                </div>
            </div> 

        </div>
        <div className="rowpayment">

            <h4 className='classh4'>Payment Details</h4>
            <div className="input-group">
                <input className='classinput' type="radio" name="payment-method" value="card" checked="true" id="payment-method-card" required />
                <label className='classlabel' htmlFor="payment-method-card">
                    <span>
                        <i className="fa fa-cc-visa"></i>
                        | Credit Card
                    </span>
                </label>
                <input className='classinput' type="radio" name="payment-method" value="paypal" id="payment-method-paypal" required/>
                <label className='classlabel' htmlFor="payment-method-paypal">
                    <span>
                        <i className="fa fa-cc-paypal"></i>
                        | Paypal
                    </span>
                </label>
            </div>
            <div className="input-group input-group-icon">
                <input className='classinput' type="text" placeholder="Card Number" required/>
                <div className="input-icon">

                    <i className="fa fa-credit-card"></i>
                </div>
            </div>
            <div className="col-half">

                <div className="input-group input-group-icon">
                    <input className='classinput' type="text" placeholder="Card CVC" required/>
                    <div className="input-icon">
                        <i className="fa fa-user"></i>
                    </div>
                </div>
            </div>
            <div className="col-half">
                <div className="input-group input-group-icon">
                    
                    <input  className='classinput' type="text" placeholder="Expire date" required/>
                    <div className="input-icon">
                        <i class="fa-solid fa-calendar-days"></i>
                    </div>
                </div> 
            </div>
        </div>
        <div className="rowpayment">

            <h4 className='classh4'> Terms and Conditions</h4>
            <div className="input-group"></div>
                <input type="checkbox" id="terms" required/>
                <label htmlFor="terms">I accept the terms and conditions for signing up to this service, and hereby confirm I have read the privacy policy.</label> 
        </div>
        <button className='btn my-2 gradientColor' type='submit' style={{display:"block" , width:"100%" ,fontSize: "20px" , fontWeight: "bold"}}>Pay Now</button>
        
    </form>
    </div>

    </>
  )
}

export default PaymentForm;
