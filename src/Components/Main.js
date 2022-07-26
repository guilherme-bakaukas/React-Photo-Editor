import React, {Component} from 'react'
import PhotoWall from './PhotoWall'
import '../Styles/stylesheet.css'
import AddPhoto from './AddPhoto'
import {Route, Routes, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../redux/actions'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCirclePlus, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import '../Styles/stylesheet.css'
import PhotoEditingOptions from './PhotoEditingOptions'
import GridLoader from 'react-spinners/GridLoader'

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
                    {this.state.loading ? (
                        <div className='loading-container'>
                        <GridLoader
                        size={20}
                        loading={this.state.loading}
                        color={"#36D7B7"}
                        />
                    </div>) : (<Routes>
            
                        <Route path = "/" element={               
                            <React.Fragment>
                                <PhotoWall {...this.props}/>
                            </React.Fragment>}/>

                        <Route path = "/AddPhoto/*" element={<AddPhoto {...this.props}/>}/>

                        <Route path = "/single/:id/*" element={<PhotoEditingOptions loading = {this.state.loading} {...this.props}/>}/>

                        </Routes>)
                    }

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