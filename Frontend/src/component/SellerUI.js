import React, { useContext } from 'react'
import ProductView from './sellerOperations/ProductView'
import logContext from '../context/logInOut/logContext'
import RegistrationSeller from './sellerOperations/RegistrationSeller'
import GoLogin from './sellerOperations/GoLogin'

export default function SellerUI() {

  const LObj = useContext(logContext);

  return (
    <>
      {LObj.loginB.bool ? (LObj.role === "admin" || LObj.role === "seller")?  <ProductView/>:
        <RegistrationSeller/> :
        <GoLogin/>
      }   
    </>

  )
}
