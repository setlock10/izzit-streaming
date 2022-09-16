import React from 'react';
// import petsee_logo from './images/petsee_logo.png'

function Login({email,setEmail}){

    function handleChange(e){
        setEmail(e.target.value)
    }

    return(
        <div>
           <span><label>enter your email address:  </label><input type="search" value={email} onChange={(e)=>handleChange(e)} ></input></span> 
         </div>
    )



}
export default Login;