import { all, fork, takeLatest, put ,delay,call} from "redux-saga/effects";
import { addPostRequest, addPostSuccess, addPostFailure, addCommentRequest, addCommentSuccess, addCommentFailure, loadMainPostRequest, loadMainPostFailure, loadMainPostSuccess, loadHashtagPostRequest, loadHashtagPostSuccess, loadHashtagPostFailure, loadUserPostSuccess, loadUserPostFailure, loadUserPostRequest, loadCommentsRequest, loadCommentsFailure, loadCommentsSuccess, uploadImagesRequest, uploadImagesFailure, uploadImagesSuccess, likePostSuccess, likePostRequest, likePostFailure, unlikePostRequest, unlikePostFailure, unlikePostSuccess, retweetSuccess, retweetFailure, retweetRequest } from "../reducers/post";
import axios from "axios";
import { addPostToMe } from "../reducers/user";

function* addPost(action){
    try {
        const result = yield call(addPostAPI,action.payload)
        yield put(addPostSuccess(result.data));
        yield put(addPostToMe(result.data.id));
    } catch (error) {
        yield put(addPostFailure(error));
    }
}

function* watchAddPost(){
    yield takeLatest(addPostRequest().type,addPost)
}

function addPostAPI(data){
    return axios.post('http://localhost:8080/api/post',data,{withCredentials:true})
}

function addCommentAPI(data){
    return axios.post(`http://localhost:8080/api/post/${data.id}/comment`,{content:data.content},{withCredentials:true})
}

function* addComment(action){
    try {
        // yield delay(200);
        const result = yield call(addCommentAPI,action.payload)
        yield put(addCommentSuccess(result.data));
    } catch (error) {
        console.error(error)
        yield put(addCommentFailure(error));
    }
}

function* watchAddComment(){
    yield takeLatest(addCommentRequest().type,addComment)
    // yield takeLatest('ADD_COMMENT_REQUEST',addComment)
}

function* watchLoadComments(){
    yield takeLatest(loadCommentsRequest().type,loadComments)
}

function* loadComments(action){
    try {
        const result = yield call(loadCommentsAPI,action.payload);
        yield put(loadCommentsSuccess({postId:action.payload,comments:result.data}));
    } catch (error) {
        yield put(loadCommentsFailure())
    }
}
function loadCommentsAPI(id){
    return axios.get(`http://localhost:8080/api/post/${id}/comments`);
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

function* watchUploadImages(){
    yield takeLatest(uploadImagesRequest().type,uploadImages);
}

function* uploadImages(action){
    try {
        const result = yield call(uploadIamgesAPI,action.payload)
        yield put(uploadImagesSuccess(
            result.data
        ));
    } catch (error) {
        console.error(error);
        yield put(uploadImagesFailure());
    }
}

function uploadIamgesAPI(images){
    return axios.post(`http://localhost:8080/api/post/images`,images,{
        withCredentials:true,
    })
}

function* watchLikePost(){
    yield takeLatest(likePostRequest().type,LikePost)
}

function* LikePost(action){
    try {
        const result = yield call(LikePostAPI,action.payload) 
        yield put(likePostSuccess({
            userId:result.data.userId,
            postId:action.payload
        }))
    } catch (error) {
        yield put(likePostFailure())
    }
}

function LikePostAPI(postId){
    return axios.post(`http://localhost:8080/api/post/${postId}/like`,{},{
        withCredentials:true,
    })
}

function* watchUnlikePost(){
    yield takeLatest(unlikePostRequest().type,unlikePost)
}

function* unlikePost(action){
    try {
        const result = yield call(unlikePostAPI,action.payload) 
        yield put(unlikePostSuccess(
            {
                userId:result.data.userId,
                postId:action.payload
            }
        ))
    } catch (error) {
        yield put(unlikePostFailure())
    }
}

function unlikePostAPI(postId){
    return axios.delete(`http://localhost:8080/api/post/${postId}/like`,{
        withCredentials:true,
    })    
}

function* watchRetweet(){
    yield takeLatest(retweetRequest().type,retweet)
}

function* retweet(action){
    try {
        const result = yield call(retweetAPI,action.payload) 
        yield put(retweetSuccess(result.data))
    } catch (error) {
        console.error(error);
        yield put(retweetFailure())
    }
}

function retweetAPI(postId){
    return axios.post(`http://localhost:8080/api/post/${postId}/retweet`,{},{
        withCredentials:true,
    })    
}


export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchLoadPosts),
        fork(watchAddComment),
        fork(watchLoadComments),
        fork(watchLoadHashtagPosts),
        fork(watchLoadUserPosts),
        fork(watchUploadImages),
        fork(watchLikePost),
        fork(watchUnlikePost),
        fork(watchRetweet)
    ])
}