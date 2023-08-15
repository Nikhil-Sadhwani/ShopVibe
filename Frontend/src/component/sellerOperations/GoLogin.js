import React from 'react'
import '../componentCss/formStyle.css';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

export default function GoLogin() {
  return (
    <>
        <div className='container marginTop100' style={{textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh"}}>
            <h1>Go And Login First</h1>
            <div style={{width: "28%",
    display: "flex",
    justifyContent: "space-between"}}>
              <motion.div animate={{x:[0,80]}} transition={{type:"spring"}} style={{display:"inline-block"}}>
                <Link to={`/signin`} className='btn btn-primary me-3'>Sign In</Link>
              </motion.div>
              <motion.div animate={{x:[0,-80]}} transition={{type:"spring"}} style={{display:"inline-block"}}>
                <Link to={`/signup`} className='btn btn-primary me-3'>Sign Up</Link>
              </motion.div>
            </div>
        </div>
    </>
  )
}
