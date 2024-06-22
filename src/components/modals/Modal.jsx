import React from 'react'
import './CSS/Modal.css'

 function Modal(props) {
  return (
    <div className='modalBackground'>
        <div className="modalContainer">
            <button onClick={()=>props.closeModal(false)}>X</button>
            <div className='title'>
                <h1 className='head'>humidity</h1>
                  <h1 className='head'>{props.Humidity}%</h1>
            </div>
            
        </div>
    </div>
  )
}
export default Modal;
