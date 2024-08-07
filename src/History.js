import React from "react"



function History(props){
    return(
        <div className="tab-container">
            <p >{props.expression} = {props.result}</p>
            
        </div>
    )
}



export default History