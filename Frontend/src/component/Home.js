import React, { useState } from 'react'
import photo1 from '../assert/trial_images/Home (2).png'
import photo2 from '../assert/trial_images/Home (3).png'
import photo3 from '../assert/trial_images/Home.png'
import CardCarousel from './CardCarousel';
import './componentCss/colorStyle.css';


import CircleCarousel from './CircleCarousel';

export default function Home() {

  const [circleProduct ] = useState([
    {title:"electronics" , image: require('../assert/trial_images/electronicF.webp') },
    {title:"fashion" , image: require('../assert/trial_images/fashion.webp') },
    {title:"homeFurniture" , image: require('../assert/trial_images/furniture.webp') },
    {title:"toyBeauty" , image: require('../assert/trial_images/beauty.webp') },
    {title:"appliances" , image: require('../assert/trial_images/appliances.webp') },
    {title:"mobile" , image: require('../assert/trial_images/mobile.webp')}
  ]);

  const [firstCarouselProduct] = useState([
    {id:2,  title:"electronics" , image: require('../assert/electronics/laptop/LFirst.webp') },
    {id:3,  title:"homeFurniture" , image: require('../assert/homeFurniture/carpet/C2.webp') },
    {id:4,  title:"toyBeauty" , image: require('../assert/toysBeauty/hairCare/H2.webp') },
    {id:5,  title:"appliances" , image: require('../assert/appliances/AC/ac1.png') },
    {id:6,  title:"mobile" , image: require('../assert/mobile/samsung/SG3.webp')},
    {id:1,  title:"fashion" , image: require('../assert/fashion/mens/M4.webp') },
  ]);

  const [secondCarouselProduct] = useState([
    {id:6,  title:"mobile" , image: require('../assert/mobile/realme/R3.webp')},
    {id:2,  title:"fashion" , image: require('../assert/fashion/womens/wimage4.jpg') },
    {id:3,  title:"homeFurniture" , image: require('../assert/homeFurniture/decorativeItem/D4.webp') },
    {id:4,  title:"toyBeauty" , image: require('../assert/toysBeauty/skinCare/SC4.png') },
    {id:1,  title:"electronics" , image: require('../assert/electronics/earPhones/earPhonesSecond.webp') },
    {id:5,  title:"appliances" , image: require('../assert/appliances/microwaves/micro3.png') },
  ]);

  const [thirdCarouselProduct ] = useState([
    {id:3,  title:"homeFurniture" , image: require('../assert/homeFurniture/tableSet/T3.webp') },
    {id:4,  title:"toyBeauty" , image: require('../assert/toysBeauty/toys/T4.webp') },
    {id:5,  title:"appliances" , image: require('../assert/appliances/microwaves/micro4.png') },
    {id:2,  title:"fashion" , image: require('../assert/fashion/kids/K3.webp') },
    {id:1,  title:"electronics" , image: require('../assert/electronics/speakers/speakerThird.png') },
    {id:6,  title:"mobile" , image: require('../assert/mobile/vivo/V4.webp')},
  ]);

  return (
    <>
      <div className="homeBg">
        <CircleCarousel product = {circleProduct}/>

        <div id="carouselExampleInterval" className="carousel slide my-5" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="2000">
              <img src={photo1} style={{height:"380px"}} className="d-block w-100" alt="Loding..."/>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src={photo2} style={{height:"380px"}}  className="d-block w-100" alt="Loding..."/>
            </div>
            <div className="carousel-item">
              <img src={photo3} style={{height:"380px"}}  className="d-block w-100" alt="Loding..."/>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>


        <CardCarousel Fproduct = {firstCarouselProduct} heading="Top Offers"/>
        <CardCarousel Fproduct = {secondCarouselProduct} heading="30% OFF"/>
        <CardCarousel Fproduct = {thirdCarouselProduct} heading="Top Brands"/>
      </div>
    </>
  )
}
