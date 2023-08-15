import { useState } from "react";
import showContext from './showContext';

const ShowState = (props) => {

    // Show Particular product 
    const [product , setProduct] = useState([]);
    const [loading , setLoading] = useState(false);

    const getProduct = async (id) => {
        setLoading(true);
        await fetch(`http://localhost/api/productimage.php/${id}`).then((res)=>res.json()).then((response)=>{setProduct(response[0].data)}).catch((err)=>{console.log(err)});
        setLoading(false);
    }

    // Show All Product
    const [data , setData] = useState([]);
    const [filter , setFliter] = useState(data);
    const [category , setCategory] = useState("");

    const getAllProduct = async (cat) => {
        setLoading(true);
        const response = await fetch(`http://localhost/api/productimage.php/${cat}`);
        setData(await response.clone().json());
        setFliter(await response.json());
        setCategory(cat);
        setLoading(false);
    }
    const productFetching = (cat) =>{
        getAllProduct(cat);
        // console.log(data);
        // console.log(filter);
    }

    const filterProduct =(cat) => {
        const updatedList = data.filter((x) => x.subCategory === cat);
        setFliter(updatedList);
    }

    return (
        <showContext.Provider value={{product , loading , getProduct ,category, data , filter,setFliter , productFetching , filterProduct}}>
            {props.children}
        </showContext.Provider>
    );
}

export default ShowState;