import React from "react";
import './CSS/Modal2.css';

function Modal2(props) {
  return (
    <div className="background">
        <div className="cancel">
            <button onClick={()=>props.cModal2(false)}>X</button>
        </div>
        <div className="DESCRIPTION">
            
            <h1 className="head2">{props.Desc}</h1>
        </div>
        
    </div>
  )
}
export default Modal2;