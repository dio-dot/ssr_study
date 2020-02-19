import { all, fork, takeLatest, put ,delay,call} from "redux-saga/effects";
import { addPostRequest, addPostSuccess, addPostFailure, addCommentRequest, addCommentSuccess, addCommentFailure, loadMainPostRequest, loadMainPostFailure, loadMainPostSuccess, loadHashtagPostRequest, loadHashtagPostSuccess, loadHashtagPostFailure, loadUserPostSuccess, loadUserPostFailure, loadUserPostRequest } from "../reducers/post";
import axios from "axios";

function* addPost(action){
    console.log(action);
    try {
        const result = yield call(addPostAPI,action.payload)
        yield put(addPostSuccess(result.data));
    } catch (error) {
        yield put(addPostFailure(error));
    }
}

function* watchAddPost(){
    yield takeLatest(addPostRequest().type,addPost)
}

function addPostAPI(postData){
    return axios.post('http://localhost:8080/api/post',postData,{withCredentials:true})
}

function* addComment(action){
    try {
        yield delay(100);
        yield put(addCommentSuccess(action.payload));
    } catch (error) {
        yield put(addCommentFailure(error));
    }
}

function* watchAddComment(){
    yield takeLatest(addCommentRequest().type,addComment)
    // yield takeLatest('ADD_COMMENT_REQUEST',addComment)
}

function* watchLoadPosts(){
    yield takeLatest(loadMainPostRequest().type,loadMainPosts);
}

function* loadMainPosts(){
    try {
        const result = yield call(loadMainPostAPI)
        yield put(loadMainPostSuccess(result.data));
    } catch (error) {
        yield put(loadMainPostFailure())
    }
}

function loadMainPostAPI(){
    return axios.get('http://localhost:8080/api/posts');
}

function* watchLoadHashtagPosts(){
    yield takeLatest(loadHashtagPostRequest().type,loadHashtagPosts)
}

function* loadHashtagPosts(action){
    try {
        const result = yield call(loadHashtagPostsAPI,action.payload)
        yield put(loadHashtagPostSuccess(result.data))
    } catch (error) {
        yield put(loadHashtagPostFailure())
    }
}

function loadHashtagPostsAPI(hashtag){
    return axios.get(`http://localhost:8080/api/hashtag/${hashtag}`,)
}

function* watchLoadUserPosts(){
    yield takeLatest(loadUserPostRequest().type,loadUserPosts)
}

function* loadUserPosts(action){
    try {
        const result = yield call(loadUserPostsAPI,action.payload)
        yield put(loadUserPostSuccess(result.data))
    } catch (error) {
        yield put(loadUserPostFailure())
    }
}

function loadUserPostsAPI(userId){
    return axios.get(`http://localhost:8080/api/user/${userId}/posts`,{})
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchLoadPosts),
        fork(watchAddComment),
        fork(watchLoadHashtagPosts),
        fork(watchLoadUserPosts)
    ])
}