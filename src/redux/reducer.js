import Posts from '../data/posts'
import {combineReducers} from 'redux'

function posts(state=Posts, action){
    switch(action.type){
        case 'REMOVE_POST': return [...state.slice(0, action.index), ...state.slice(action.index + 1)]
        case 'ADD_POST': return [...state, action.post]
        case 'LOAD_POSTS': return action.posts
        case 'UPDATE_POST':
            let new_index = 0
            let new_post = {}

            state.map((post, index) => {
                if (post.id == action.id){
                    new_post = post
                    new_index = index
            }})

            new_post = {...new_post, style: action.style}
            console.log([...state.slice(0, new_index), new_post, ...state.slice(new_index + 1)])

            return [...state.slice(0, new_index), new_post, ...state.slice(new_index + 1)]
            
        default: return(state)
    }
}


const rootReducer = combineReducers({posts})

export default rootReducer