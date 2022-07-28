import React from "react";

export default function EditOption(props){
    
    return(
        <button className={`edit-item ${props.active ? 'active' : ''}`} onClick={props.handleClick}>
            {props.name}
        </button>
    )
}