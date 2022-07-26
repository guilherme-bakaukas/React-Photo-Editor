import {React, useState} from 'react'
import { useNavigate, useParams, Routes, Route} from "react-router-dom";
import EditOption from './EditOption'
import BasicEdit from './EditPhoto/BasicEdit';
import HistEqual from './EditPhoto/HistEqual'
import FreqFilter from './EditPhoto/FreqFilter'
import Halftone from './EditPhoto/Halftone'


const editOptions = [
    {
        name: "Basic Edit",
        route_name: ""
    },
    {
        name: "Histogram Equalization",
        route_name: "Hist_Equal"
    },
    {
        name: "Frequency Filter",
        route_name: "Freq_Filter"
    },
    {
        name: "Halftone",
        route_name: "Halftone"
    }
]

export default function PhotoEditingOptions(props){

    const navigate = useNavigate()
    const params = useParams()
    const id = params.id
    const posts = props.posts
    const post = posts.find((post) => post.id === parseInt(id))

    const [selectedKey, setSelectedKey] = useState(0)

    function handleEditSelection(route_name, index){
        setSelectedKey(index)
        navigate(`/single/${id}/${route_name}`)
    }

    if (props.loading === true){
        return <div className='loader'>...loading</div>
    } else if (post) {
        return (
            <div className=''>
                <div className='editOptionsBar'>
                    {editOptions.map((item ,index) => {
                    return(
                        <EditOption name = {item.name}
                        key = {index} 
                        active = {index === selectedKey}
                        handleClick = {() => handleEditSelection(item.route_name, index)}/>
                    )
                })}
                </div>

                <Routes>

                    <Route path = "/" element={<BasicEdit {...props} post = {post} id = {id} />}/>
                    <Route path = "/Hist_Equal" element={<HistEqual {...props} post = {post} id = {id} />}/>
                    <Route path = "/Freq_Filter" element={<FreqFilter {...props} post = {post} id = {id} />}/>
                    <Route path = "/Halftone" element={<Halftone {...props} post = {post} id = {id} />}/>

                </Routes>
            </div>
        )
    } else{
        return <h4>No post found...</h4>
    }

    
}