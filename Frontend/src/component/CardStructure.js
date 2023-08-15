import React from 'react'
import './componentCss/CardStructure.css';
import { Link } from 'react-router-dom';

const CardStructure= (props) => {
    const {title ,image ,id} = props.product;

    return (
      <>

      <div className="card" style={{width: "18rem" , margin: "auto"}} key={id}>
          <img src={image} className="" style={{
            height: "250px" , 
            padding:"18px"}} alt="Loading..."/>
          <div className="card-body " style={{textAlign:"center"}}>
              <h5 className="card-title">{title.charAt(0).toUpperCase() + title.substring(1)}</h5>

              <Link to={`/product/${title}`} className="btn btn-outline-dark">Show All</Link>
          </div>
      </div>

      </>
    )
}

export default CardStructure;