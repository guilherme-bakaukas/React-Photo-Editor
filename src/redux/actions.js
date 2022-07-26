import {database} from '../database/config'
import { ref, remove, update, get } from "firebase/database";
import axios from 'axios'

const urlBase = 'http://localhost:3000'
//action creators => display an action to reducer

export function startUpdatingPostImage(post, new_id, new_imageLink){
    return (dispatch) => {
        return update(ref(database, `posts/${post.id}`), {id: new_id, imageLink: new_imageLink}).then(() => {
            dispatch(updatePostImage(post, new_id, new_imageLink))
        }).catch((error) => {
            console.log(error)
        })
    }
}

export function startAddingPostImage(post){
    return (dispatch) => {
        axios.post(`${urlBase}/addImage`, post).then(res=>{
            console.log(res.data)
            post["imageLink"] = res.data
            dispatch(startAddingPost(post))
        }).catch((error) => {
            console.log(error)
        })
    }
}

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

export function startUpdatingPost(post, style){
    return (dispatch) => {
        return update(ref(database, `posts/${post.id}`), {style: style}).then(() => {
            dispatch(updatePost(post, style))
        }).catch((error) => {
            console.log(error)
        })
    }
}

export function updatePostImage(post, new_id, new_imageLink){
    return {
        type: 'UPDATE_POST_IMAGE',
        post,
        new_id,
        new_imageLink
    }
}


export function updatePost(post, style){
    return {
        type: 'UPDATE_POST_STYLE',
        post,
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
