
import {React, useContext } from 'react';
import alertContext from '../context/alertContext';


export default function Alert(props) {
    const CObj = useContext(alertContext);

    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  return (
    <>
        <div style={{height: '50px' 
        ,marginTop: "100px" 
        , position: "absolute" , zIndex: "15" , width: "100%"}}>
            {CObj.alert && <div className={`alert alert-${CObj.alert.type} alert-dismissible fade show`} role='alert'>
                <strong>{capitalize(CObj.alert.type)}</strong>: {CObj.alert.msg}
            </div>}

        </div>
    </>
  )
}
