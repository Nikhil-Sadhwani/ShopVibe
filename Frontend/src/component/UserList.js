import axios from "axios"
import { useEffect , useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './componentCss/formStyle.css';

export default function UserList(){
    const [users , setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getUsers();
    } , []);

    function getUsers(){
        axios.get('http://localhost/api/user.php').then(function(response){
            // console.log(response.data);
            setUsers(response.data);
        });
    }

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost/api/user.php/${id}`);
        navigate("/");
    }

    return (
        <>
        <div className="container marginTop100" style={{textAlign:"center"}}>

        
            <h1>User List</h1>
            <hr />
            <div className="tableClass">

                <table style={{margin:"auto"}}>
                    
                        <tr>
                            <th>SNo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Moblie Number</th>
                            <th>Actions</th>
                        </tr>
                    
                        {users.map((user , key) => 
                            <tr key={key}>
                                <td>{key+1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>{user.mobileNumber}</td>
                                <td>
                                <Link to={`/editdetails/${user.id}`} className="btn btn-outline-primary mx-2 my-2">Edit </Link>
                                <button onClick={()=>handleDelete(user.id )} className="btn btn-outline-danger mx-2 my-2 me-2">Delete</button>
                                </td>
                            </tr>

                        )}
                

                </table>
            </div>
            </div>
        </>
    )
}
