import {database, storage} from '../database/config'
import { ref, remove, update, get } from "firebase/database";
import {ref as storageRef, deleteObject} from "firebase/storage"
import axios from 'axios'

const urlBase = 'http://localhost:3000'
//action creators => display an action to reducer

export function startUpdatingPostImage(post, new_imageLink){
    return (dispatch) => {
        return update(ref(database, `posts/${post.id}`), {imageLink: new_imageLink}).then(() => {
            //delete previous image
            const postImageRef = storageRef(storage, post.imageLink);
            deleteObject(postImageRef).then(() => {
                //update posts state
                dispatch(updatePostImage(post, new_imageLink))
            }).catch((error) => {
                console.log(error)
            });
        })
    }
}

export function startAddingPostImage(post){
    return (dispatch) => {
        return axios.post(`${urlBase}/addImage`, post).then(res=>{
            console.log(res.data)
            post["imageLink"] = res.data
            dispatch(startAddingPost(post))
        })
    }
}

export const startAddingPost = (post) => {
    return (dispatch) => {
        return update(ref(database, 'posts'), {[post.id]: post}).then(() => {
            dispatch(addPost(post))
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

export function startRemovingPost(index, id, imageLink) {
    return(dispatch) => {
        return remove(ref(database, `posts/${id}`)).then(() => {
            
            const postImageRef = storageRef(storage, imageLink);
            // Delete image from storage
            deleteObject(postImageRef).then(() => {
                dispatch(removePost(index))
            })
        })
    }
}

export function startUpdatingPost(post, style){
    return (dispatch) => {
        return update(ref(database, `posts/${post.id}`), {...post , style: style}).then(() => {
            dispatch(updatePost(post, style))
        })
    }
}

export function startSetLoading(value){
    return (dispatch) => {
        return dispatch(setLoading(value))
    }
}

export function startUpdatingErrorStatus(show, message){
    return (dispatch) => {
        return dispatch(updateErrorStatus(show, message))
    }
}

export function updatePostImage(post, new_imageLink){
    return {
        type: 'UPDATE_POST_IMAGE',
        post,
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

export const addPost = (post) => {
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

export function setLoading(value){
    return{
        type: 'SET_LOADING',
        value
    }
}

export function updateErrorStatus(show ,message){
    return{
        type: 'UPDATE_ERROR_STATUS',
        show,
        message
    }
}
