import { useState } from "react";
import logContext from "./logContext";

const LogState = (props) => {

    const [loginB , setLoginB] = useState({
        bool : false,
        email : "",
        id:"",
        pass:""
    });
    const [role , setRole] = useState("");

    const handleLogInOut = (email , id , role , pass) => {
        if(loginB.bool === false ){
            setLoginB({
                bool : true,
                email : email,
                id: id,
                pass : pass
            });
            setRole(role);
        }
        else{
            setLoginB({
                bool : false,
                email : "",
                id:"",
                pass:""
            });
            setRole("");
        }
    }

    return(
        <logContext.Provider value={{loginB,setRole ,role , handleLogInOut}} >
            {props.children}
        </logContext.Provider>
    )
}

export default LogState;