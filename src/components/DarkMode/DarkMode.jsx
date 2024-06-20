import React from "react";
import 'boxicons';



import './DarkMode.css';

const DarkMode =()=>{
    const setDarkMode =()=>{
        document.querySelector('body').setAttribute('data-theme','dark');

    }
    const setLightMode=()=>{
        document.querySelector('body').setAttribute( 'data-theme' , 'light');
    }
    const toggleTheme=(e)=>{
        if(e.target.checked) setDarkMode();
        else{
            setLightMode();
        }
    };

    return(
      <div className="toggle-container">
        <input type="checkbox" id="check" className="toggle" onChange={toggleTheme}/>

        <label htmlFor="check">
            <span>
            <i class='bx bx-moon bx-flashing' ></i>
            <i class='bx bxs-sun bx-spin bx-flip-horizontal' ></i>
           </span>
        </label>
      </div>
    )

}
export default DarkMode;