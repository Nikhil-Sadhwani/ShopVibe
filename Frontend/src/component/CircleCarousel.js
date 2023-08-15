import React from 'react'
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import './componentCss/LinkStyle.css';
import './componentCss/CardStructure.css'



export default function CircleCarousel(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 898,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 612,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };


  return (
    <>
    <div style={{marginTop:"56px"}}>

      <Slider {...settings}>
        {props.product.map((proNum,key) => 
          <div key={key} style={{display:"flex" , marginBottom:"20px" }}>
                <div style={{margin:"auto" , marginTop:"21px"}}>
                  <Link to={`/product/${proNum.title}`} className='link'>
                    <img src={proNum.image} alt="Loading..." style={{borderRadius:"50%" , width: "86px" , height: "77px" ,margin:"auto"}} />
                    <p style={{textAlign: "center" , margin: "0px"}}>{(proNum.title).charAt(0).toUpperCase() + (proNum.title).substring(1)}</p>
                  </Link>
                </div>
          </div>
        )}
      </Slider>
    </div>
    </>
  )
}
