import { loadUserRequest } from "./user"

const ADD_POST_REQUEST = 'ADD_POST_REQUEST' as const
const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS' as const
const ADD_POST_FAILURE = 'ADD_POST_FAILURE' as const

const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST' as const
const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS' as const
const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE' as const

const LOAD_MAIN_POST_REQUEST = 'LOAD_MAIN_POST_REQUEST' as const
const LOAD_MAIN_POST_SUCCESS = 'LOAD_MAIN_POST_SUCCESS' as const
const LOAD_MINA_POST_FAILURE = 'LOAD_MAIN_POST_FAILURE' as const

const LOAD_HASHTAG_POST_REQUEST = 'LOAD_HASHTAG_POST_REQUEST' as const
const LOAD_HASHTAG_POST_SUCCESS = 'LOAD_HASHTAG_POST_SUCCESS' as const
const LOAD_HASHTAG_POST_FAILURE = 'LOAD_HASHTAG_POST_FAILURE' as const

const LOAD_USER_POST_REQUEST = 'LOAD_USER_POST_REQUEST' as const
const LOAD_USER_POST_SUCCESS = 'LOAD_USER_POST_SUCCESS' as const
const LOAD_USER_POST_FAILURE = 'LOAD_USER_POST_FAILURE' as const

const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST' as const
const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS' as const
const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE' as const

const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST' as const
const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS' as const
const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE' as const

const REMOVE_IMAGE = 'REMOVE_IMAGE' as const;

const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST' as const;
const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS' as const;
const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE' as const;

const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST' as const;
const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS' as const;
const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE' as const;

const RETWEET_REQUEST = 'RETWEET_REQUEST' as const;
const RETWEET_SUCCESS = 'RETWEET_SUCCESS' as const;
const RETWEET_FAILURE = 'RETWEET_FAILURE' as const;

const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST' as const;
const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS' as const;
const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE' as const;


export const addPostRequest = (payload?:object)=>({type:ADD_POST_REQUEST,payload})
export const addPostSuccess = (payload:any)=>({type:ADD_POST_SUCCESS,payload})
export const addPostFailure = (payload:string)=>({type:ADD_POST_FAILURE,payload})
export const addCommentRequest = (payload?:any)=>({type:ADD_COMMENT_REQUEST,payload})
export const addCommentSuccess = (payload:any)=>({type:ADD_COMMENT_SUCCESS,payload})
export const addCommentFailure = (payload:string)=>({type:ADD_COMMENT_FAILURE,payload})
export const loadMainPostRequest = ()=>({type:LOAD_MAIN_POST_REQUEST});
export const loadMainPostSuccess = (payload:any)=>({type:LOAD_MAIN_POST_SUCCESS,payload})
export const loadMainPostFailure = ()=>({type:LOAD_MINA_POST_FAILURE})
export const loadHashtagPostRequest = (payload?:string)=>({type:LOAD_HASHTAG_POST_REQUEST,payload})
export const loadHashtagPostSuccess = (payload:any)=>({type:LOAD_HASHTAG_POST_SUCCESS,payload})
export const loadHashtagPostFailure = ()=>({type:LOAD_HASHTAG_POST_FAILURE})
export const loadUserPostRequest = (payload?:number)=>({type:LOAD_USER_POST_REQUEST,payload})
export const loadUserPostSuccess = (payload:any)=>({type:LOAD_USER_POST_SUCCESS,payload})
export const loadUserPostFailure = ()=>({type:LOAD_USER_POST_FAILURE})
export const loadCommentsRequest = (payload?:number)=>({type:LOAD_COMMENTS_REQUEST,payload})
export const loadCommentsSuccess = (payload:any)=>({type:LOAD_COMMENTS_SUCCESS,payload})
export const loadCommentsFailure = ()=>({type:LOAD_COMMENTS_FAILURE})
export const uploadImagesRequest = (payload?:any)=>({type:UPLOAD_IMAGES_REQUEST,payload})
export const uploadImagesSuccess = (payload?:any)=>({type:UPLOAD_IMAGES_SUCCESS,payload})
export const uploadImagesFailure = ()=>({type:UPLOAD_IMAGES_FAILURE})
export const removeImage = (payload?:any)=>({type:REMOVE_IMAGE,payload})
export const likePostRequest = (payload?:any) =>({type:LIKE_POST_REQUEST,payload})
export const likePostSuccess = (payload:any) =>({type:LIKE_POST_SUCCESS,payload})
export const likePostFailure = ()=>({type:LIKE_POST_FAILURE})
export const unlikePostRequest = (payload?:any) =>({type:UNLIKE_POST_REQUEST,payload})
export const unlikePostSuccess = (payload:any) =>({type:UNLIKE_POST_SUCCESS,payload})
export const unlikePostFailure = ()=>({type:UNLIKE_POST_FAILURE})
export const retweetRequest = (payload?:any)=>({type:RETWEET_REQUEST,payload})
export const retweetSuccess = (payload:any)=>({type:RETWEET_SUCCESS,payload})
export const retweetFailure = ()=>({type:RETWEET_FAILURE})
export const removePostRequest = (payload?:any)=>({type:REMOVE_POST_REQUEST,payload})
export const removePostSuccess = (payload?:any) => ({type:REMOVE_POST_SUCCESS,payload})
export const removePostFailure = (payload?:any) =>({type:REMOVE_POST_FAILURE,payload})

type PostAction = 
ReturnType<typeof addCommentRequest>|
ReturnType<typeof addCommentSuccess>|
ReturnType<typeof addCommentFailure>|
ReturnType<typeof addPostRequest>|
ReturnType<typeof addPostSuccess>|
ReturnType<typeof addPostFailure>|
ReturnType<typeof loadMainPostRequest>|
ReturnType<typeof loadMainPostSuccess>|
ReturnType<typeof loadMainPostFailure>|
ReturnType<typeof loadHashtagPostRequest>|
ReturnType<typeof loadHashtagPostSuccess>|
ReturnType<typeof loadHashtagPostFailure>|
ReturnType<typeof loadUserPostRequest>|
ReturnType<typeof loadUserPostSuccess>|
ReturnType<typeof loadUserPostFailure>|
ReturnType<typeof loadCommentsRequest>|
ReturnType<typeof loadCommentsSuccess>|
ReturnType<typeof loadCommentsFailure>|
ReturnType<typeof uploadImagesRequest>|
ReturnType<typeof uploadImagesSuccess>|
ReturnType<typeof uploadImagesFailure>|
ReturnType<typeof removeImage>|
ReturnType<typeof likePostRequest>|
ReturnType<typeof likePostSuccess>|
ReturnType<typeof likePostFailure>|
ReturnType<typeof unlikePostRequest>|
ReturnType<typeof unlikePostSuccess>|
ReturnType<typeof unlikePostFailure>|
ReturnType<typeof retweetRequest>|
ReturnType<typeof retweetSuccess>|
ReturnType<typeof retweetFailure>|
ReturnType<typeof removePostRequest>|
ReturnType<typeof removePostSuccess>|
ReturnType<typeof removePostFailure>

type PostState = {
    mainPosts:Array<Post>,
    imagePaths:Array<any>,
    addPostErrorReason:string,
    addingPost:boolean,
    addedPost:boolean,
    addCommentErrorReason:string,
    addingComment:boolean,
    addedComment:boolean,
}

const initialState:PostState = {
    addCommentErrorReason:"",
    addingPost:false,
    addedPost:false,
    addPostErrorReason:"",
    addingComment:false,
    addedComment:false,
    mainPosts:[],
    imagePaths:[],
}

const reducer = (state:PostState = initialState,action:PostAction)=>{
    switch(action.type){
        case ADD_POST_REQUEST:{
            return{
                ...state,
                addingPost:true,
                addedPost:false,
                addPostErrorReason:''
            }
        }
        case ADD_POST_SUCCESS:{
            return{
                ...state,
                addingPost:false,
                addedPost:true,
                mainPosts:[action.payload,...state.mainPosts],
                imagePaths:[]
            }
        }
        case ADD_POST_FAILURE:{
            return{
                ...state,
                addingPost:false,
                addPostErrorReason:action.payload
            }
        }
        case ADD_COMMENT_REQUEST:{
            return{
                ...state,
                addingComment:true,
                addedComment:false,
                addCommentErrorReason:''
            }
        }
        case ADD_COMMENT_SUCCESS:{
            const postIndex = state.mainPosts.findIndex((v)=>(v.id===action.payload.PostId))
            const post = state.mainPosts[postIndex]
            const Comments = [...post.Comments,action.payload]
            const mainPosts = [...state.mainPosts]
            mainPosts[postIndex] = {...post,Comments}
            return{
                ...state,
                addingComment:false,
                addedComment:true,
                mainPosts
            }
        }
        case ADD_COMMENT_FAILURE:{
            return{
                ...state,
                addingComment:false,
                addedComment:false,
                addCommentErrorReason:action.payload
            }
        }
        case LOAD_MAIN_POST_REQUEST:{
            return{
                ...state
            }
        }
        case LOAD_MAIN_POST_SUCCESS:{
            return{
                ...state,
                mainPosts:action.payload
            }
        }
        case LOAD_MINA_POST_FAILURE:{
            return{
                ...state
            }
        }
        case LOAD_HASHTAG_POST_REQUEST:{
            return{
                ...state
            }
        }
        case LOAD_HASHTAG_POST_SUCCESS:{
            return{
                ...state,
                mainPosts:action.payload
            }
        }
        case LOAD_HASHTAG_POST_FAILURE:{
            return{
                ...state
            }
        }
        case LOAD_USER_POST_REQUEST:{
            return{
                ...state
            }
        }
        case LOAD_USER_POST_SUCCESS:{
            return{
                ...state,
                mainPosts:action.payload
            }
        }
        case LOAD_USER_POST_FAILURE:{
            return{
                ...state
            }
        }
        case LOAD_COMMENTS_REQUEST:{
            return{
                ...state
            }
        }
        case LOAD_COMMENTS_SUCCESS:{
            const postId = action.payload.postId
            const postIndex = state.mainPosts.findIndex(v=>v.id===postId)
            const mainPosts = [...state.mainPosts];
            const post = state.mainPosts[postIndex];
            mainPosts[postIndex]={...post,Comments:action.payload.comments}
            return{
                ...state,mainPosts
            }
        }
        case LOAD_COMMENTS_FAILURE:{
            return{
                ...state
            }
        }
        case UPLOAD_IMAGES_REQUEST:{
            return{
                ...state,
            }
        }
        case UPLOAD_IMAGES_SUCCESS:{
            return{
                ...state,
                imagePaths:[...state.imagePaths,...action.payload]
            }
        }
        case REMOVE_IMAGE:{
            return{
                ...state,
                imagePaths:state.imagePaths.filter((v,i)=>i!==action.payload)
            }
        }
        case UPLOAD_IMAGES_FAILURE:{
            return{
                ...state
            }
        }
        case LIKE_POST_REQUEST:{
            return{
                ...state
            }
        }
        case LIKE_POST_SUCCESS:{
            const postIndex = state.mainPosts.findIndex(v=>v.id ===action.payload.postId)
            const post = state.mainPosts[postIndex];
            const Likers = [{id:action.payload.userId},...post.Likers];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = {...post,Likers};
            return{
                ...state,
                mainPosts
            }
        }
        case LIKE_POST_FAILURE:{
            return{
                ...state
            }
        }
        case UNLIKE_POST_REQUEST:{
            return{
                ...state
            }
        }
        case UNLIKE_POST_SUCCESS:{
            const postIndex = state.mainPosts.findIndex(v=>v.id ===action.payload.postId)
            const post = state.mainPosts[postIndex];
            const Likers = post.Likers.filter(v=>v.id!==action.payload.userId);
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = {...post,Likers};
            return{
                ...state,
                mainPosts
            }
        }
        case UNLIKE_POST_FAILURE:{
            return{
                ...state
            }
        }
        case RETWEET_REQUEST:{
            return{
                ...state
            }
        }
        case RETWEET_SUCCESS:{
            return{
                ...state,
                mainPosts:[action.payload,...state.mainPosts]
            }
        }
        case RETWEET_FAILURE:{
            return{
                ...state
            }
        }
        case REMOVE_POST_REQUEST:{
            return{
                ...state
            }
        }
        case REMOVE_POST_SUCCESS:{
            return{
                ...state,
                mainPosts:state.mainPosts.filter(v=>v.id!==action.payload)
            }
        }
        case REMOVE_POST_FAILURE:{
            return{
                ...state
            }
        }
        default :{
            return {...state}
        }
    }
}

export default reducer;