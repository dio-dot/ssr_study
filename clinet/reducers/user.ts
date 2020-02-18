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

const LOAD_FOLLOWER_REQUEST = "LOAD_FOLLOWER_REQEUST" as const;
const LOAD_FOLLOWER_SUCCESS = "LOAD_FOLLOWER_SUCCESS" as const;
const LOAD_FOLLOWER_FAILURE = "LOAD_FOLLOWER_FAILURE" as const;

const FOLLOW_USER_REQUEST = "FOLLOW_USER_REQEUST" as const;
const FOLLOW_USER_SUCCESS = "FOLLOW_USER_SUCCESS" as const;
const FOLLOW_USER_FAILURE = "FOLLOW_USER_FAILURE" as const;

const UNFOLLOW_USER_REQUEST = "UNFOLLOW_USER_REQEUST" as const;
const UNFOLLOW_USER_SUCCESS = "UNFOLLOW_USER_SUCCESS" as const;
const UNFOLLOW_USER_FAILURE = "UNFOLLOW_USER_FAILURE" as const;

const REMOVE_FOLLOW_REQUEST = "REMOVE_FOLLOW_REQEUST" as const;
const REMOVE_FOLLOW_SUCCESS = "REMOVE_FOLLOW_SUCCESS" as const;
const REMOVE_FOLLOW_FAILURE = "REMOVE_FOLLOW_FAILURE" as const;

const ADD_POST_TO_ME = "ADD_POST_TO_ME" as const;

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
export const loadUserRequest = (payload?:any) => ({ type: LOAD_USER_REQUEST });
export const loadUserSuccess = (payload:object) => ({ type: LOAD_USER_SUCCESS ,payload });
export const loadUserFailure = (payload:string) => ({ type: LOAD_USER_FAILURE ,payload});

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
  | ReturnType<typeof loadUserFailure>;

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
        return{
            ...state,
            me:action.payload
        }
    }
    case LOAD_USER_FAILURE:{
        return{
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
