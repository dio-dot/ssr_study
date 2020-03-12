import { all, fork, takeLatest, put ,delay,call, throttle} from "redux-saga/effects";
import { addPostRequest, addPostSuccess, addPostFailure, addCommentRequest, addCommentSuccess, addCommentFailure, loadMainPostRequest, loadMainPostFailure, loadMainPostSuccess, loadHashtagPostRequest, loadHashtagPostSuccess, loadHashtagPostFailure, loadUserPostSuccess, loadUserPostFailure, loadUserPostRequest, loadCommentsRequest, loadCommentsFailure, loadCommentsSuccess, uploadImagesRequest, uploadImagesFailure, uploadImagesSuccess, likePostSuccess, likePostRequest, likePostFailure, unlikePostRequest, unlikePostFailure, unlikePostSuccess, retweetSuccess, retweetFailure, retweetRequest, removePostRequest, removePostSuccess, removePostFailure, loadPostRequest, loadPostSuccess, loadPostFailure } from "../reducers/post";
import axios from "axios";
import { addPostToMe, removePostOfMe } from "../reducers/user";

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
    yield throttle(2000,loadMainPostRequest().type,loadMainPosts);
}

function* loadMainPosts(action){
    try {
        const result = yield call(loadMainPostAPI,action.payload)
        yield put(loadMainPostSuccess(result.data));
    } catch (error) {
        yield put(loadMainPostFailure())
    }
}

function loadMainPostAPI(lastId=0,limit=10){
    return axios.get(`http://localhost:8080/api/posts?lastId=${lastId}&limit=${limit}`);
}
function* watchLoadPost(){
    yield takeLatest(loadPostRequest().type,loadPost);
}

function* loadPost(action){
    try {
        const result = yield call(loadPostAPI,action.payload)
        yield put(loadPostSuccess(result.data));
    } catch (error) {
        yield put(loadPostFailure())
    }
}

function loadPostAPI(postId){
    return axios.get(`http://localhost:8080/api/post/${postId}`);
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

function loadHashtagPostsAPI(hashtag){//lastId 적용해야됨
    return axios.get(`http://localhost:8080/api/hashtag/${encodeURIComponent(hashtag)}`,)
}

function* watchLoadUserPosts(){//lastId 적용해야됨
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
    return axios.get(`http://localhost:8080/api/user/${userId||0}/posts`,{})
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

function* watchRemovePost(){
    yield takeLatest(removePostRequest().type,removePost)
}

function* removePost(action){
    try {
        const result = yield call(removePostAPI,action.payload)
        yield put(removePostSuccess(result.data));
        yield put(removePostOfMe(result.data));
    } catch (error) {
        yield put(removePostFailure());
    }
}

function removePostAPI(postId){
    return axios.delete(`http://localhost:8080/api/post/${postId}`,{
        withCredentials:true
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
        fork(watchRetweet),
        fork(watchRemovePost),
        fork(watchLoadPost),
    ])
}