import React, { useState,useEffect } from 'react';
import AlertCard from './AlertCard';
// import petsee_logo from './images/petsee_logo.png'

function Alerts({email}){

    const [alerts,setAlerts]=useState([])
   

    //Get the alerts from the backend
    useEffect(()=>{
        fetch('http://localhost:9292/alerts')
        .then(res=>res.json())
        .then(data=> {
            setAlerts(data)
         })
    },[])
    

    let alertCards=alerts.map(alert=>{
         return <AlertCard key={alert.id} alert={alert} email={email} alerts={alerts} setAlerts={setAlerts}/>
     })


    return(
        <div className='alertList'>

            <div>{alertCards}</div>

         </div>
    )



}
export default Alerts;