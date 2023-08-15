import {Link} from 'react-router-dom';
import { React , useContext, useState } from 'react';
import logContext from '../context/logInOut/logContext';

import './componentCss/navbar.css';
import './componentCss/colorStyle.css'

import Alert from './Alert';

import { useSelector } from 'react-redux/es/hooks/useSelector';

export default function NavBar() {

    const LObj = useContext(logContext);
    const state = useSelector((state) => state.handleCart);
    const handleLogOut = () => {
        LObj.handleLogInOut(LObj.loginB.email);
    }

    const [searchItem , setSearchItem] = useState("");

  return (
    <>
        <nav className="navbar navbar-expand-lg  fixed-top navColor" >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">ShopVibe</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{margin:"auto"}}>
                    <li className="nav-item navbar-item">
                    <Link className="nav-link" aria-current="page" to="/">Home</Link>
                    </li>
                    {(LObj.role === "admin" || LObj.role === "seller") ?
                        <li className="nav-item navbar-item">
                        <Link className="nav-link" to="/sellerUI">Your Products</Link>
                        </li> :
                        <li className="nav-item navbar-item">
                        <Link className="nav-link" to="/sellerUI">Became a seller</Link>
                        </li>
                    }

                </ul>
                <form className="d-flex" role="search" style={{marginRight:"19px" , width: "700px"}}>
                    <input className="form-control me-2" value={searchItem} onChange={(e)=>{setSearchItem(e.target.value)}} type="search" placeholder="Search"/>

                    {searchItem!=="" ? 
                    <Link to={`/searchedItems/${searchItem}`} type="search" className="btn btn-outline-dark">Search</Link>
                    :  
                    <Link style={{pointerEvents : "none"}} to={`/searchedItems/${searchItem}`} type="search" className="btn btn-outline-dark" >Search</Link>
                    } 
                </form>
                <ul className="navbar-nav  mb-2 mb-lg-0">

                    <li className="nav-item dropdown navbar-item">
                        <Link className="nav-link dropdown-toggle" style={{padding: "0" , fontSize: "26px"}} to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-regular fa-circle-user" style={{fontSize: "32px" , marginTop: "3px"}}/>
                        </Link>
                        {!LObj.loginB.bool ?<ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/signin">Sign in</Link></li>
                            <li><Link className="dropdown-item" to="/signup">Sign up</Link></li>
                            
                        </ul> : <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to={`/editdetails/${LObj.loginB.id}`}>Edit Details</Link></li>
                            <li><Link className="dropdown-item" to={`/editpassword`}>Change Password</Link></li>

                            {LObj.role === "admin" ? <>
                            <li><Link className="dropdown-item" to="/signup">Create User</Link></li>
                            <li><Link className="dropdown-item" to="/userlist">User List</Link></li>
                            </>
                                :
                            <></>
                            }
                            <li><Link className="dropdown-item" to="/signin" onClick={handleLogOut}>Log Out</Link></li>
                            </ul>}
                        </li>
                        <li className="nav-item navbar-item">
                    <Link className="nav-link" to='/cart'><i className="fa-solid fa-cart-shopping" style={{marginRight:"2px"}}/>Cart ({LObj.loginB.bool? state.length:0})</Link>
                    </li>
                </ul>
                </div>
            </div>
        <Alert />
        </nav>
    </>
  )
}
