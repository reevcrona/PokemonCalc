import React from "react"



function History(props){
    return(
        <div onClick={() => props.find(props.id)} className="tab-container">
            <p className="tab-p">{props.expression} = {props.result}</p>
            
        </div>
    )
}



export default History