import React, {Component} from 'react'
import PhotoWall from './PhotoWall'
import '../Styles/stylesheet.css'
import AddPhoto from './AddPhoto'
import Single from './Single'
import {Route, Routes, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../redux/actions'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCirclePlus, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import '../Styles/stylesheet.css'

library.add(faCirclePlus, faPenToSquare, faTrashCan);

class Main extends Component {

    // add this state to render posts only before loading them (avoid error)
    state = {loading: true}

    // Load initial Posts from database
    componentDidMount() {
        this.props.startLoadingPosts().then(() =>{
            this.setState({loading: false})
        })
    }

    render(){
        return(
            <div className='website'>
                <h1>
                    <Link to="/"> Photowall </Link>
                </h1>
                <Routes>
        
                    <Route path = "/" element={               
                        <React.Fragment>
                            <PhotoWall {...this.props}/>
                        </React.Fragment>}/>
        
                    <Route path = "/AddPhoto/*" element={<AddPhoto {...this.props}/>}/>

                    <Route path = "/single/:id" element={<Single loading = {this.state.loading} {...this.props}/>}/>
        
                </Routes>
                
            </div>)
    }


}

function mapStateToProps(state){
    return{
        posts: state.posts
    } 
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actions, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Main)