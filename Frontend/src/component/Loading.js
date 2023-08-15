import React from 'react'
import Skeleton from 'react-loading-skeleton';


export default function Loading() {
  return (
    <>
        <div className="col-md-6">
            <Skeleton height={400}/>
        </div>
        <div className="col-md-6" style={{lineHeight:2}}>
            <Skeleton height={50} width={300}/>
            <Skeleton height={75} />
            <Skeleton height={25} width={150}/>
            <Skeleton height={50} />
            <Skeleton height={150}/>
            <Skeleton height={50} width={100}/>
            <Skeleton height={50} width={100} style={{marginLeft:6}}/>
        </div>
    </>
  )
}
