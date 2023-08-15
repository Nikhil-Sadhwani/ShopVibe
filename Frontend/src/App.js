import "./CSS/Slider/slick.css"; 
import "./CSS/Slider/slick-theme.css";
import './component/componentCss/colorStyle.css';
import './App.css';

import Home from './component/Home';
import SellerUI from './component/SellerUI';
import Signup from './component/Signup';
import EditUser from './component/EditUser';
import Signin from './component/Signin';
import NavBar from './component/NavBar';
import { BrowserRouter , Routes , Route  } from 'react-router-dom';

import AlertState from './context/AlertState';
import LogState from './context/logInOut/LogState';
import ShowState from './context/showItem/ShowState';

import CategoryPage from "./component/CategoryPage";
import ProductDetails from "./component/ProductDetails";
import Cart from "./component/Cart";
import ProductView from './component/sellerOperations/ProductView';
import UpdateProduct from "./component/sellerOperations/UpdateProduct";
import UploadProduct from './component/sellerOperations/UploadProduct';
import Search from "./component/Search";
import UserList from "./component/UserList";
import EditPass from "./component/EditPass";
import PaymentForm from "./component/PaymentForm";

function App() {
  

  return (
    <>
     
      <ShowState>
        <LogState>

          <AlertState>

            <BrowserRouter>
                <NavBar/>
                

                <Routes>

                    <Route exact path='/' element={<Home/>}  />
                    <Route exact path='/sellerUI' element={<SellerUI/>}  />
                    <Route exact path='/editdetails/:id' element={<EditUser/>}  />
                    <Route exact path='/editpassword' element={<EditPass/>}  />
                    <Route exact path='/userlist' element={<UserList/>}/>
                    <Route exact path='/signup' element={<Signup/>}/>
                    <Route exact path='/signin' element={<Signin />}/>

                    <Route exact path='/product/:category' element={<CategoryPage />}/>
                    <Route exact path='/productDetails/:id' element={<ProductDetails />}/>

                    <Route exact path='/uploadProduct' element={<UploadProduct />}/>
                    <Route exact path='/productView' element={<ProductView />}/>
                    <Route exact path='/productEdit/:id' element={<UpdateProduct />}/>

                    <Route exact path='/cart' element={<Cart />}/>
                    <Route exact path='/searchedItems/:name' element={<Search/>} />

                    <Route exact path='/payment' element={<PaymentForm/>} />
                    
                </Routes>
            </BrowserRouter>

          </AlertState>
        </LogState>

      </ShowState>

    </>
  );
}

export default App;
