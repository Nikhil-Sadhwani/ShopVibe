import React , { useEffect} from 'react'
import { useParams } from 'react-router-dom';

import { useContext } from 'react';
import showContext from '../context/showItem/showContext';
import ShowAllProduct from './ShowAllProduct';

import './componentCss/formStyle.css';


export default function Electronics() {

  const Obj = useContext(showContext);
  const {category} = useParams();

  useEffect(() => {
    Obj.productFetching(category);
    // eslint-disable-next-line
  } ,[]);

  const Loading = () => {
    return (
      <>
        Loading....
      </>
    );
  }


  return (
    <div>
      <div className="container marginTop100">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className='display-6 fw-bolder text-center'>{ (category).charAt(0).toUpperCase() + (category).substring(1)}</h1>
            <hr/>
          </div>
        </div>
        <div className="row justify-content-center">
          {Obj.loading ? <Loading/> : <ShowAllProduct/>}
        </div>
      </div>
    </div>
  )
}
