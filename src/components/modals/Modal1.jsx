import React from "react";
import './CSS/Modal1.css';
 function Modal1(props) {
  return (
    <div className="body">
        <div className="content">
            <button onClick={()=>props.cModal1(false)}>X</button>
            <div className="heading">
                 <h1 className="head1">Wind</h1>
                <h1 className="head1">{props.Wind} Km/H</h1>
            </div>
        </div>
    </div>
  )
}
export default Modal1;