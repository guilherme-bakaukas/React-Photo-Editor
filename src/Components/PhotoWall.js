import React from "react";
import Photo from './Photo.js'
import {Link} from 'react-router-dom'
import '../Styles/stylesheet.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PhotoWall(props){
    return(
        <div>
            <Link className="addIcon" to="AddPhoto">
            <FontAwesomeIcon icon="circle-plus" color="silver" size="5x"/>
            </Link>
            <div className="photoGrid">
                {props.posts
                .sort(function(x,y){
                    return y.id - x.id
                })
                .map((post,index) => <Photo key = {index} post = {post} {...props} index={index}/>)}
            </div>
        </div>
    )
}