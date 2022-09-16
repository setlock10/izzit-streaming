import React,{useEffect,useState} from 'react';

function AlertCard({email,alert,alerts, setAlerts}){
    console.log(alert)


    //Delete Alert
    function handleClick(){
        console.log(alert.alert_id)

        fetch (`http://localhost:9292/alerts/${alert.alert_id}`,{
            method: 'DELETE',
            headers: {'Content-type': 'application/json'}
        })

        setAlerts( (alerts) => alerts.filter(a=> a.alert_id!==alert.alert_id)  )
   }

   var disabled=true
   
   disabled=(email!==alert.user_email)?true:false

   


    return(
        <div className='alertCard'>
            <h3 className='alertItem'>{alert.movie_title}</h3>
            <h3 className='alertItem'>{alert.user_email}</h3>
            <h3 className='alertItem'>{alert.updated}</h3>
            <button disabled={(email!==alert.user_email)} onClick={()=>handleClick()}>delete alert</button>
            


        </div>
    )


}
export default AlertCard;