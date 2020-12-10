import React from "react";
import '../../styles/components/ErrorMsgPage.css'

export const ErrorMsgPage=props=>{
    return (
        <div className='error-block'>{props.errMsg}</div>
    );
}