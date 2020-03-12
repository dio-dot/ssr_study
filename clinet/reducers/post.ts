import { loadUserRequest } from "./user";
import { produce } from "immer";
const ADD_POST_REQUEST = "ADD_POST_REQUEST" as const;
const ADD_POST_SUCCESS = "ADD_POST_SUCCESS" as const;
const ADD_POST_FAILURE = "ADD_POST_FAILURE" as const;

const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST" as const;
const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS" as const;
const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE" as const;

const LOAD_MAIN_POST_REQUEST = "LOAD_MAIN_POST_REQUEST" as const;
const LOAD_MAIN_POST_SUCCESS = "LOAD_MAIN_POST_SUCCESS" as const;
const LOAD_MINA_POST_FAILURE = "LOAD_MAIN_POST_FAILURE" as const;

const LOAD_HASHTAG_POST_REQUEST = "LOAD_HASHTAG_POST_REQUEST" as const;
const LOAD_HASHTAG_POST_SUCCESS = "LOAD_HASHTAG_POST_SUCCESS" as const;
const LOAD_HASHTAG_POST_FAILURE = "LOAD_HASHTAG_POST_FAILURE" as const;

const LOAD_USER_POST_REQUEST = "LOAD_USER_POST_REQUEST" as const;
const LOAD_USER_POST_SUCCESS = "LOAD_USER_POST_SUCCESS" as const;
const LOAD_USER_POST_FAILURE = "LOAD_USER_POST_FAILURE" as const;

const LOAD_COMMENTS_REQUEST = "LOAD_COMMENTS_REQUEST" as const;
const LOAD_COMMENTS_SUCCESS = "LOAD_COMMENTS_SUCCESS" as const;
const LOAD_COMMENTS_FAILURE = "LOAD_COMMENTS_FAILURE" as const;

const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST" as const;
const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS" as const;
const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE" as const;

const REMOVE_IMAGE = "REMOVE_IMAGE" as const;

const LIKE_POST_REQUEST = "LIKE_POST_REQUEST" as const;
const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS" as const;
const LIKE_POST_FAILURE = "LIKE_POST_FAILURE" as const;

const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST" as const;
const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS" as const;
const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE" as const;

const RETWEET_REQUEST = "RETWEET_REQUEST" as const;
const RETWEET_SUCCESS = "RETWEET_SUCCESS" as const;
const RETWEET_FAILURE = "RETWEET_FAILURE" as const;

const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST" as const;
const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS" as const;
const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE" as const;

const LOAD_POST_REQUEST = "LOAD_POST_REQUEST" as const;
const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS" as const;
const LOAD_POST_FAILURE = "LOAD_POST_FAILURE" as const;

export const addPostRequest = (payload?: object) => ({
  type: ADD_POST_REQUEST,
  payload
});
export const addPostSuccess = (payload: any) => ({
  type: ADD_POST_SUCCESS,
  payload
});
export const addPostFailure = (payload: string) => ({
  type: ADD_POST_FAILURE,
  payload
});
export const addCommentRequest = (payload?: any) => ({
  type: ADD_COMMENT_REQUEST,
  payload
});
export const addCommentSuccess = (payload: any) => ({
  type: ADD_COMMENT_SUCCESS,
  payload
});
export const addCommentFailure = (payload: string) => ({
  type: ADD_COMMENT_FAILURE,
  payload
});
export const loadMainPostRequest = (payload?: any) => ({
  type: LOAD_MAIN_POST_REQUEST,
  payload
});
export const loadMainPostSuccess = (payload: any) => ({
  type: LOAD_MAIN_POST_SUCCESS,
  payload
});
export const loadMainPostFailure = () => ({ type: LOAD_MINA_POST_FAILURE });
export const loadHashtagPostRequest = (payload?: string) => ({
  type: LOAD_HASHTAG_POST_REQUEST,
  payload
});
export const loadHashtagPostSuccess = (payload: any) => ({
  type: LOAD_HASHTAG_POST_SUCCESS,
  payload
});
export const loadHashtagPostFailure = () => ({
  type: LOAD_HASHTAG_POST_FAILURE
});
export const loadUserPostRequest = (payload?: number) => ({
  type: LOAD_USER_POST_REQUEST,
  payload
});
export const loadUserPostSuccess = (payload: any) => ({
  type: LOAD_USER_POST_SUCCESS,
  payload
});
export const loadUserPostFailure = () => ({ type: LOAD_USER_POST_FAILURE });
export const loadCommentsRequest = (payload?: number) => ({
  type: LOAD_COMMENTS_REQUEST,
  payload
});
export const loadCommentsSuccess = (payload: any) => ({
  type: LOAD_COMMENTS_SUCCESS,
  payload
});
export const loadCommentsFailure = () => ({ type: LOAD_COMMENTS_FAILURE });
export const uploadImagesRequest = (payload?: any) => ({
  type: UPLOAD_IMAGES_REQUEST,
  payload
});
export const uploadImagesSuccess = (payload?: any) => ({
  type: UPLOAD_IMAGES_SUCCESS,
  payload
});
export const uploadImagesFailure = () => ({ type: UPLOAD_IMAGES_FAILURE });
export const removeImage = (payload?: any) => ({ type: REMOVE_IMAGE, payload });
export const likePostRequest = (payload?: any) => ({
  type: LIKE_POST_REQUEST,
  payload
});
export const likePostSuccess = (payload: any) => ({
  type: LIKE_POST_SUCCESS,
  payload
});
export const likePostFailure = () => ({ type: LIKE_POST_FAILURE });
export const unlikePostRequest = (payload?: any) => ({
  type: UNLIKE_POST_REQUEST,
  payload
});
export const unlikePostSuccess = (payload: any) => ({
  type: UNLIKE_POST_SUCCESS,
  payload
});
export const unlikePostFailure = () => ({ type: UNLIKE_POST_FAILURE });
export const retweetRequest = (payload?: any) => ({
  type: RETWEET_REQUEST,
  payload
});
export const retweetSuccess = (payload: any) => ({
  type: RETWEET_SUCCESS,
  payload
});
export const retweetFailure = () => ({ type: RETWEET_FAILURE });
export const removePostRequest = (payload?: any) => ({
  type: REMOVE_POST_REQUEST,
  payload
});
export const removePostSuccess = (payload?: any) => ({
  type: REMOVE_POST_SUCCESS,
  payload
});
export const removePostFailure = (payload?: any) => ({
  type: REMOVE_POST_FAILURE,
  payload
});

export const loadPostRequest = (payload?:any)=>({
    type:LOAD_POST_REQUEST,
    payload
})
export const loadPostSuccess = (payload?:any)=>({
    type:LOAD_POST_SUCCESS,
    payload
})
export const loadPostFailure = (payload?:any)=>({
    type:LOAD_POST_FAILURE,
    payload
})

type PostAction =
  | ReturnType<typeof addCommentRequest>
  | ReturnType<typeof addCommentSuccess>
  | ReturnType<typeof addCommentFailure>
  | ReturnType<typeof addPostRequest>
  | ReturnType<typeof addPostSuccess>
  | ReturnType<typeof addPostFailure>
  | ReturnType<typeof loadMainPostRequest>
  | ReturnType<typeof loadMainPostSuccess>
  | ReturnType<typeof loadMainPostFailure>
  | ReturnType<typeof loadHashtagPostRequest>
  | ReturnType<typeof loadHashtagPostSuccess>
  | ReturnType<typeof loadHashtagPostFailure>
  | ReturnType<typeof loadUserPostRequest>
  | ReturnType<typeof loadUserPostSuccess>
  | ReturnType<typeof loadUserPostFailure>
  | ReturnType<typeof loadCommentsRequest>
  | ReturnType<typeof loadCommentsSuccess>
  | ReturnType<typeof loadCommentsFailure>
  | ReturnType<typeof uploadImagesRequest>
  | ReturnType<typeof uploadImagesSuccess>
  | ReturnType<typeof uploadImagesFailure>
  | ReturnType<typeof removeImage>
  | ReturnType<typeof likePostRequest>
  | ReturnType<typeof likePostSuccess>
  | ReturnType<typeof likePostFailure>
  | ReturnType<typeof unlikePostRequest>
  | ReturnType<typeof unlikePostSuccess>
  | ReturnType<typeof unlikePostFailure>
  | ReturnType<typeof retweetRequest>
  | ReturnType<typeof retweetSuccess>
  | ReturnType<typeof retweetFailure>
  | ReturnType<typeof removePostRequest>
  | ReturnType<typeof removePostSuccess>
  | ReturnType<typeof removePostFailure>
  | ReturnType<typeof loadPostRequest>
  | ReturnType<typeof loadPostSuccess>
  | ReturnType<typeof loadPostFailure>;

type PostState = {
  mainPosts: Array<Post>;
  imagePaths: Array<any>;
  addPostErrorReason: string;
  addingPost: boolean;
  addedPost: boolean;
  addCommentErrorReason: string;
  addingComment: boolean;
  addedComment: boolean;
  hasMorePost: boolean;
  singlePost:any;
};

const initialState: PostState = {
  addCommentErrorReason: "",
  addingPost: false,
  addedPost: false,
  addPostErrorReason: "",
  addingComment: false,
  addedComment: false,
  mainPosts: [],
  imagePaths: [],
  hasMorePost: false,
  singlePost:null,
};

const reducer = (state: PostState = initialState, action: PostAction) => {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_POST_REQUEST: {
        (draft.addingPost = true),
          (draft.addedPost = false),
          (draft.addPostErrorReason = "");
        break;
      }
      case ADD_POST_SUCCESS: {
        (draft.addingPost = false),
          (draft.addedPost = true),
          draft.mainPosts.unshift(action.payload);
        draft.imagePaths = [];
        break;
      }
      case ADD_POST_FAILURE: {
        (draft.addingComment = false),
          (draft.addPostErrorReason = action.payload);
        break;
      }
      case ADD_COMMENT_REQUEST: {
        (draft.addingComment = true),
          (draft.addedComment = false),
          (draft.addCommentErrorReason = "");
        break;
      }
      case ADD_COMMENT_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          v => v.id === action.payload.PostId
        );
        draft.mainPosts[postIndex].Comments.push(action.payload);
        (draft.addingComment = false), (draft.addedComment = true);
        break;
      }
      case ADD_COMMENT_FAILURE: {
        draft.addingComment = false,
        draft.addedComment = false,
        draft.addCommentErrorReason = action.payload;
        break;
      }
      case LOAD_MAIN_POST_REQUEST: {
        draft.mainPosts = action.payload === 0 ? [] : draft.mainPosts,
        draft.hasMorePost = action.payload ? draft.hasMorePost : true;
        break;
      }
      case LOAD_MAIN_POST_SUCCESS: {
        action.payload.forEach((v)=>{
            draft.mainPosts.push(v);
        })
        // draft.mainPosts = draft.mainPosts.concat(action.payload);
        draft.hasMorePost = action.payload.length === 10;
        break;
      }
      case LOAD_MINA_POST_FAILURE: {
        break;
      }
      case LOAD_HASHTAG_POST_REQUEST: {
        break;
      }
      case LOAD_HASHTAG_POST_SUCCESS: {
        draft.mainPosts = action.payload;
        break;
      }
      case LOAD_HASHTAG_POST_FAILURE: {
        break;
      }
      case LOAD_USER_POST_REQUEST: {
        break;
      }
      case LOAD_USER_POST_SUCCESS: {
        draft.mainPosts = action.payload;
        break;
      }
      case LOAD_USER_POST_FAILURE: {
        break;
      }
      case LOAD_COMMENTS_REQUEST: {
        break;
      }
      case LOAD_COMMENTS_SUCCESS: {
        const postId = action.payload.postId;
        const postIndex = state.mainPosts.findIndex(v => v.id === postId);
        draft.mainPosts[postIndex].Comments = action.payload.comments;
        break;
      }
      case LOAD_COMMENTS_FAILURE: {
        break;
      }
      case UPLOAD_IMAGES_REQUEST: {
        break;
      }
      case UPLOAD_IMAGES_SUCCESS: {
        action.payload.forEach(p => {
          draft.imagePaths.push(p);
        });
        // draft.imagePaths = draft.imagePaths.concat(action.payload)
        break;
      }
      case REMOVE_IMAGE: {
        const index = draft.imagePaths.findIndex((v, i) => {
          i === action.payload;
        });
        draft.imagePaths.splice(index, 1);
        break;
        // return{
        //     ...state,
        //     imagePaths:state.imagePaths.filter((v,i)=>i!==action.payload)
        // }
      }
      case UPLOAD_IMAGES_FAILURE: {
        break;
      }
      case LIKE_POST_REQUEST: {
        break;
      }
      case LIKE_POST_SUCCESS: {
        const postIndex = state.mainPosts.findIndex(
          v => v.id === action.payload.postId
        );
        draft.mainPosts[postIndex].Likers.unshift({id:action.payload.userId})
        break;
      }
      case LIKE_POST_FAILURE: {
        break;
      }
      case UNLIKE_POST_REQUEST: {
        break;
      }
      case UNLIKE_POST_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          v => v.id === action.payload.postId
        );
        const likeIndex = draft.mainPosts[postIndex].Likers.filter(
          v => v.id === action.payload.userId
        );
        draft.mainPosts[postIndex].Likers.splice(likeIndex, 1);
        break;
      }
      case UNLIKE_POST_FAILURE: {
        break;
      }
      case RETWEET_REQUEST: {
        break;
      }
      case RETWEET_SUCCESS: {
        draft.mainPosts.unshift(action.payload);
        break;
      }
      case RETWEET_FAILURE: {
        break;
      }
      case REMOVE_POST_REQUEST: {
        break;
      }
      case REMOVE_POST_SUCCESS: {
        const index = draft.mainPosts.findIndex((v)=>v.id===action.payload)
        draft.mainPosts.splice(index,1);
      }
      case REMOVE_POST_FAILURE: {
        break;
      }
      case LOAD_POST_REQUEST: {
        break;
      }
      case LOAD_POST_SUCCESS: {
        draft.singlePost = action.payload;
        break;
      }
      case LOAD_POST_FAILURE: {
        break;
      }
      default: {
        break;
      }
    }
  });
};

export default reducer;
