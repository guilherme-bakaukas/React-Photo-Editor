import Posts from '../data/posts'
import {combineReducers} from 'redux'

function errorInfo(state={show: false, message: ''}, action){
    switch(action.type){
        case 'UPDATE_ERROR_STATUS' : return {show: action.show, message: action.message} 
        default: return state
    }
}

function loading(state=true, action){
    switch(action.type){
        case 'SET_LOADING' : return action.value
        default: return state
    }

}

function posts(state=Posts, action){
    switch(action.type){
        case 'REMOVE_POST': return [...state.slice(0, action.index), ...state.slice(action.index + 1)]
        case 'ADD_POST': return [...state, action.post]
        case 'LOAD_POSTS': return action.posts
        case 'UPDATE_POST_STYLE':
            const post_index = state.findIndex((element) => element.id === action.post.id)

            const new_post = {...action.post, style: action.style}
            console.log([...state.slice(0, post_index), new_post, ...state.slice(post_index + 1)])

            return [...state.slice(0, post_index), new_post, ...state.slice(post_index + 1)]
        case 'UPDATE_POST_IMAGE':

            const index = state.findIndex((element) => element.id === action.post.id)

            const updated_post_image = {...action.post, imageLink: action.new_imageLink}
            console.log([...state.slice(0, index), updated_post_image, ...state.slice(index + 1)])

            return [...state.slice(0, index), updated_post_image, ...state.slice(index + 1)]
            
        default: return(state)
    }
}


const rootReducer = combineReducers({posts, loading, errorInfo})

export default rootReducer