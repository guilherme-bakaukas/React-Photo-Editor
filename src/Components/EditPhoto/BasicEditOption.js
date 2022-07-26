import React from "react";

export default function BasicEditOption(props){
    
    return(
        <button className={`basic-edit-item ${props.active ? 'active' : ''}`} onClick={props.handleClick}>
            {props.name}
        </button>
    )
}