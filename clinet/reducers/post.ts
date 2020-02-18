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

export const addPostRequest = (payload?:object)=>({type:ADD_POST_REQUEST,payload})
export const addPostSuccess = (payload:any)=>({type:ADD_POST_SUCCESS,payload})
export const addPostFailure = (payload:string)=>({type:ADD_POST_FAILURE,payload})
export const addCommentRequest = (payload?:number)=>({type:ADD_COMMENT_REQUEST,payload})
export const addCommentSuccess = (payload:number)=>({type:ADD_COMMENT_SUCCESS,payload})
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
ReturnType<typeof loadUserPostFailure>

type PostState = {
    mainPosts:Array<Post>,
    imagePaths?:Array<string>,
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
    mainPosts:[]
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
                mainPosts:[action.payload,...state.mainPosts]
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
            const postIndex = state.mainPosts.findIndex((v)=>(v.id===action.payload))
            const post = state.mainPosts[postIndex]
            const Comments = [...post.Comments,{id:1,User:{id:1,nickname:'2'},createdAt:(new Date()).toDateString(),cotent:'dummyContent'}]
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
        default :{
            return {...state}
        }
    }
}

export default reducer;