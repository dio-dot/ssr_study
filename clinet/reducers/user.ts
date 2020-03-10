export const LOG_IN_REQUEST = "LOG_IN_REQEUST" as const;
const LOG_IN_SUCCESS = "LOG_IN_SUCCESS" as const;
const LOG_IN_FAILURE = "LOG_IN_FAILURE" as const;

const LOG_OUT_REQUEST = "LOG_OUT_REQEUST" as const;
const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS" as const;
const LOG_OUT_FAILURE = "LOG_OUT_FAILURE" as const;

const SIGN_UP_REQUEST = "SIGN_UP_REQEUST" as const;
const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS" as const;
const SIGN_UP_FAILURE = "SIGN_UP_FAILURE" as const;

const LOAD_USER_REQUEST = "LOAD_USER_REQEUST" as const;
const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS" as const;
const LOAD_USER_FAILURE = "LOAD_USER_FAILURE" as const;

const LOAD_FOLLOWERS_REQUEST = "LOAD_FOLLOWERS_REQEUST" as const;
const LOAD_FOLLOWERS_SUCCESS = "LOAD_FOLLOWERS_SUCCESS" as const;
const LOAD_FOLLOWERS_FAILURE = "LOAD_FOLLOWERS_FAILURE" as const;

const LOAD_FOLLOWINGS_REQUEST = "LOAD_FOLLOWINGS_REQEUST" as const;
const LOAD_FOLLOWINGS_SUCCESS = "LOAD_FOLLOWINGS_SUCCESS" as const;
const LOAD_FOLLOWINGS_FAILURE = "LOAD_FOLLOWINGS_FAILURE" as const;

const FOLLOW_USER_REQUEST = "FOLLOW_USER_REQEUST" as const;
const FOLLOW_USER_SUCCESS = "FOLLOW_USER_SUCCESS" as const;
const FOLLOW_USER_FAILURE = "FOLLOW_USER_FAILURE" as const;

const UNFOLLOW_USER_REQUEST = "UNFOLLOW_USER_REQEUST" as const;
const UNFOLLOW_USER_SUCCESS = "UNFOLLOW_USER_SUCCESS" as const;
const UNFOLLOW_USER_FAILURE = "UNFOLLOW_USER_FAILURE" as const;

const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQEUST" as const;
const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS" as const;
const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE" as const;

const ADD_POST_TO_ME = "ADD_POST_TO_ME" as const;
const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME' as const;

const EDIT_NICKNAME_REQUEST = "EDIT_NICKNAME_REQUEST" as const;
const EDIT_NICKNAME_SUCCESS = "EDIT_NICKNAME_SUCCESS" as const;
const EDIT_NICKNAME_FAILURE = "EDIT_NICKNAME_FAILURE" as const;
export const loginRequest = (payload?: object) => ({
  type: LOG_IN_REQUEST,
  payload
});
export const loginSuccess = (payload?: object) => ({
  type: LOG_IN_SUCCESS,
  payload
});
export const loginFailure = (payload: string) => ({
  type: LOG_IN_FAILURE,
  payload
});
export const logoutRequest = () => ({ type: LOG_OUT_REQUEST });
export const logoutSuccess = () => ({ type: LOG_OUT_SUCCESS });
export const logoutFailure = () => ({ type: LOG_OUT_FAILURE });
export const signUpRequest = (payload?: object) => ({
  type: SIGN_UP_REQUEST,
  payload
});
export const signUpSuccess = () => ({ type: SIGN_UP_SUCCESS });
export const signUpFailure = (payload: string) => ({
  type: SIGN_UP_FAILURE,
  payload
});
export const loadUserRequest = (payload?:any) => ({ type: LOAD_USER_REQUEST,payload });
export const loadUserSuccess = (payload:any) => ({ type: LOAD_USER_SUCCESS ,payload });
export const loadUserFailure = (payload:string) => ({ type: LOAD_USER_FAILURE ,payload});

export const followRequest = (payload?:any)=>({type:FOLLOW_USER_REQUEST,payload});
export const followSuccess = (payload?:any)=>({type:FOLLOW_USER_SUCCESS,payload});
export const followFailure = ()=>({type:FOLLOW_USER_FAILURE});

export const unfollowRequest = (payload?:any)=>({type:UNFOLLOW_USER_REQUEST,payload});
export const unfollowSuccess = (payload?:any)=>({type:UNFOLLOW_USER_SUCCESS,payload});
export const unfollowFailure = ()=>({type:UNFOLLOW_USER_FAILURE});

export const loadFollowersRequest = (payload?:any,offset?:any)=>({type:LOAD_FOLLOWERS_REQUEST,payload});
export const loadFollowersSuccess = (payload?:any)=>({type:LOAD_FOLLOWERS_SUCCESS,payload});
export const loadFollowersFailure = (payload?:any)=>({type:LOAD_FOLLOWERS_FAILURE,payload});

export const loadFollowingsRequest = (payload?:any,offset?:any)=>({type:LOAD_FOLLOWINGS_REQUEST,payload,offset});
export const loadFollowingsSuccess = (payload?:any)=>({type:LOAD_FOLLOWINGS_SUCCESS,payload});
export const loadFollowingsFailure = (payload?:any)=>({type:LOAD_FOLLOWINGS_FAILURE,payload});

export const removeFollowerRequest = (payload?:any)=>({type:REMOVE_FOLLOWER_REQUEST,payload});
export const removeFollowerSuccess = (payload?:any)=>({type:REMOVE_FOLLOWER_SUCCESS,payload});
export const removeFollowerFailure = (payload?:any)=>({type:REMOVE_FOLLOWER_FAILURE,payload});

export const addPostToMe = (payload:any) => ({type:ADD_POST_TO_ME,payload});
export const removePostOfMe = (payload:any)=>({type:REMOVE_POST_OF_ME,payload}); 

export const editNicknameRequest = (payload?:any) => ({type:EDIT_NICKNAME_REQUEST,payload});
export const editNicknameSuccess = (payload:any) =>({type:EDIT_NICKNAME_SUCCESS,payload});
export const editNicknameFailure = (payload?:any) =>({type:EDIT_NICKNAME_FAILURE});

type UserAction =
  | ReturnType<typeof loginRequest>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFailure>
  | ReturnType<typeof signUpRequest>
  | ReturnType<typeof signUpSuccess>
  | ReturnType<typeof signUpFailure>
  | ReturnType<typeof logoutRequest>
  | ReturnType<typeof logoutSuccess>
  | ReturnType<typeof logoutFailure>
  | ReturnType<typeof loadUserRequest>
  | ReturnType<typeof loadUserSuccess>
  | ReturnType<typeof loadUserFailure>
  | ReturnType<typeof followRequest>
  | ReturnType<typeof followSuccess>
  | ReturnType<typeof followFailure>
  | ReturnType<typeof unfollowRequest>
  | ReturnType<typeof unfollowSuccess>
  | ReturnType<typeof unfollowFailure>
  | ReturnType<typeof addPostToMe>
  | ReturnType<typeof removePostOfMe>
  | ReturnType<typeof loadFollowersRequest>
  | ReturnType<typeof loadFollowersSuccess>
  | ReturnType<typeof loadFollowersFailure>
  | ReturnType<typeof loadFollowingsRequest>
  | ReturnType<typeof loadFollowingsSuccess>
  | ReturnType<typeof loadFollowingsFailure>
  | ReturnType<typeof removeFollowerRequest>
  | ReturnType<typeof removeFollowerSuccess>
  | ReturnType<typeof removeFollowerFailure>
  | ReturnType<typeof editNicknameFailure>
  | ReturnType<typeof editNicknameRequest>
  | ReturnType<typeof editNicknameSuccess>

export type UserState = {
//   loggedIn: boolean;
  loggingIn: boolean;
  loggingOut: boolean;
  logInErrorReason: string;

  signedUp: boolean;
  signingUp: boolean;
  signUpErrorReason: string;

  me: any;
  userInfo:any;
  followerList:any;
  followingList:any;
  // {
  //     id:string|undefined,
  //     nickname:string,
  //     Post:Array<string>,
  //     Followers:Array<string>,
  //     Followings:Array<string>,
  // }
};

const initialState: UserState = {
//   loggedIn: false,
  loggingIn: false,
  loggingOut: false,
  logInErrorReason: "",
  signedUp: false,
  signingUp: false,
  signUpErrorReason: "",
  me: null,
  userInfo:null,
  followerList:null,
  followingList:null,
};

const reducer = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state,
        loggingIn: true,
        logInErrorReason: ""
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        loggingIn: false,
        // loggedIn: true,
        me: action.payload
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        loggingIn: false,
        // loggedIn: false,
        me: null,
        logInErrorReason: action.payload
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        loggingOut: true
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        loggingOut:false,
        // loggedIn: false,
        me: null
      };
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        loggingOut:false
      };
    }
    case LOAD_USER_REQUEST:{
        return {
            ...state
        }
    }
    case LOAD_USER_SUCCESS:{
      if(action.payload.me){
        return{
          ...state,
          me:action.payload.payload
        } 
      }
      return{
        ...state,
        userInfo:action.payload.payload
      }
    }
    case LOAD_USER_FAILURE:{
        return{
            ...state
        }
    }
    case FOLLOW_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case FOLLOW_USER_SUCCESS: {
      return {
        ...state,
        me:{
          ...state.me,
          Followings:[{id:action.payload},...state.me.Followings,]
        }
      };
    }
    case FOLLOW_USER_FAILURE: {
      return {
        ...state,
      };
    }
    case UNFOLLOW_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case UNFOLLOW_USER_SUCCESS: {
      return {
        ...state,
        me:{
          ...state.me,
          Followings:state.me.Followings.filter(v=>v.id!==action.payload)
        },
        followingList:state.followerList.filter(v=>v.id!==action.payload),
      };
    }
    case UNFOLLOW_USER_FAILURE: {
      return {
        ...state,
      };
    }
    case LOAD_FOLLOWERS_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_FOLLOWERS_SUCCESS: {
      return {
        ...state,
        followerList:state.followerList?state.followerList.concat(action.payload):action.payload
      };
    }
    case LOAD_FOLLOWERS_FAILURE: {
      return {
        ...state,
      };
    }
    case LOAD_FOLLOWINGS_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_FOLLOWINGS_SUCCESS: {
      return {
        ...state,
        followingList:state.followingList?state.followingList.concat(action.payload):action.payload
      };
    }
    case LOAD_FOLLOWINGS_FAILURE: {
      return {
        ...state,
      };
    }
    case REMOVE_FOLLOWER_REQUEST: {
      return {
        ...state,
      };
    }
    case REMOVE_FOLLOWER_SUCCESS: {
      return {
        ...state,
        me:{
          ...state.me,
          Followers:state.me.Followers.filter(v=>v.id!==action.payload)
        },
        followerList:state.followerList.filter(v=>v.id!==action.payload)
      };
    }
    case REMOVE_FOLLOWER_FAILURE: {
      return {
        ...state,
      };
    }
    case ADD_POST_TO_ME:{
      console.log("ADD_POST_TO_ME"+action.payload);
      return {
        ...state,
        me:{
          ...state.me,
          Posts:[...state.me.Posts,{"id":action.payload}]
        }
      }
    }
    case REMOVE_POST_OF_ME:{
      return {
        ...state,
        me:{
          ...state.me,
          Posts:state.me.Posts.filter(v=>v.id!==action.payload)
        }
      }
    }
    case EDIT_NICKNAME_REQUEST:{
      return {
        ...state
      }
    }
    case EDIT_NICKNAME_SUCCESS:{
      return{
        ...state,
        me:{
          ...state.me,
          nickname:action.payload
        }
      }
    }
    case EDIT_NICKNAME_FAILURE:{
      return {
        ...state
      }
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default reducer;
