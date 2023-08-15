import React , {useEffect} from 'react'
import { useParams } from 'react-router-dom'

import { useContext } from 'react';
import showContext from '../context/showItem/showContext';
import Loading from './Loading';
import ShowProductDetails from './ShowProductDetails';
import './componentCss/formStyle.css';
import './componentCss/productShow.css';

export default function ProductDetails() {

    const {id} = useParams();
    const Obj = useContext(showContext);

    useEffect(() =>{
      Obj.getProduct(id);
      // eslint-disable-next-line
    } , []);

  return (
        <div className='rowClass'
        //  style={{ height:"100vh",display: "grid",
        //   gridTemplateColumns: "auto auto",
        //   padding: "10px"}}
        >
            {Obj.loading ? <Loading/> : <ShowProductDetails/>} 
        </div>
  )
}
