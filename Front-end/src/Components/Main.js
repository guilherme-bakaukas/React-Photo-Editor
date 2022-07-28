import React, {Component} from 'react'
import PhotoWall from './PhotoWall'
import '../Styles/stylesheet.css'
import AddPhoto from './AddPhoto'
import {Route, Routes, Link} from 'react-router-dom'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCirclePlus, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import '../Styles/stylesheet.css'
import PhotoEditingOptions from './PhotoEditingOptions'
import GridLoader from 'react-spinners/GridLoader'
import { Alert } from "react-bootstrap"

library.add(faCirclePlus, faPenToSquare, faTrashCan);

class Main extends Component {

    // Load initial Posts from database
    componentDidMount() {
        console.log(this.props)
        this.props.startUpdatingErrorStatus(false, '')
        this.props.startSetLoading(true)
        this.props.startLoadingPosts().then(() =>{
            this.props.startSetLoading(false)
        })
    }

    componentDidUpdate(prevProps) {
        console.log(this.props)
        // In case something changes in posts, we should set loading component to false, because changes had already finished
        if (this.props.posts !== prevProps.posts){
            this.props.startSetLoading(false)
        }
    }

    render(){
        return(
            <div className='website'>
                <Alert show={this.props.errorInfo.show} variant="danger" onClose={() => this.props.startUpdatingErrorStatus(false, '')} dismissible>
                <Alert.Heading>Sorry, you got an error!</Alert.Heading>
                <p>
                {this.props.errorInfo.message}
                </p>
                </Alert>
                <h1>
                    <Link to="/"> Photowall </Link>
                </h1>
                    {this.props.loading ? (
                        <div className='loading-container'>
                        <GridLoader
                        size={20}
                        loading={this.props.loading}
                        color={"#9AAEA7"}
                        />
                    </div>) : (<Routes>
            
                        <Route path = "/" element={               
                            <React.Fragment>
                                <PhotoWall {...this.props}/>
                            </React.Fragment>}/>

                        <Route path = "/AddPhoto/*" element={<AddPhoto {...this.props}/>}/>

                        <Route path = "/single/:id/*" element={<PhotoEditingOptions {...this.props}/>}/>

                        </Routes>)
                    }

            </div>)
    }


}

export default (Main)