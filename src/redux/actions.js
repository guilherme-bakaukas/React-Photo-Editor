import {database} from '../database/config'
import { ref, remove, update, get } from "firebase/database";
//action creators => display an action to reducer

export function startAddingPost(post){
    return (dispatch) => {
        return update(ref(database, 'posts'), {[post.id]: post}).then(() => {
            dispatch(addPost(post))
        }).catch((error) => {
            console.log(error)
        })
    }
}
export function startLoadingPosts() {
    return (dispatch) => {
        return get(ref(database, 'posts')).then((snapshot) => {
            let posts = []
            snapshot.forEach((childSnapshot) => {
                posts.push(childSnapshot.val())
            })
            dispatch(loadPosts(posts))
        })
    }
}

export function startRemovingPost(index, id) {
    return(dispatch) => {
        return remove(ref(database, `posts/${id}`)).then(() => {
            dispatch(removePost(index))
        })
    }
}

export function startUpdatingPost(id, style){
    return (dispatch) => {
        return update(ref(database, `posts/${id}`), {style: style}).then(() => {
            dispatch(updatePost(id, style))
        }).catch((error) => {
            console.log(error)
        })
    }
}

export function updatePost(id, style){
    console.log(id.type)
    return {
        type: 'UPDATE_POST',
        id,
        style
    }

}

export function removePost(index){
    return{
        type: 'REMOVE_POST',
        index
    }
}

export function addPost(post){
    console.log('Added')
    return{
        type: 'ADD_POST',
        post
    }
}


export function loadPosts(posts) {
    return {
        type: 'LOAD_POSTS',
        posts
    }
}
