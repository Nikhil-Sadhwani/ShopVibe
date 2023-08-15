import React from 'react'
import CardStructure from './CardStructure';
import './componentCss/CardStructure.css';
import Slider from "react-slick";


export default function CardCarousel(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1531,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1233,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 941,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 612,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
    <div className='d-flex align-items-center'>
      <div style={{width: "234px" , textAlign: "center" , marginLeft: "18px"}}>

        <h2 style={{width: "185px", marginLeft: "10px"}}>
          {props.heading}
        </h2>
      </div>
      <div className='overflow-hidden' style={{width: "96%",height:"420px" , margin:"auto" , marginBottom:"49px" }}>

        <Slider {...settings}>
          {props.Fproduct.map((proNum ) => 
            <div key={proNum.id}>
                <CardStructure product = {proNum}/>
            </div>
          )}
        </Slider>
      </div>
    </div>
    </>
  )
}