import {
  loginSuccess,
  loginRequest,
  loginFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,
  followRequest,
  followSuccess,
  followFailure,
  unfollowRequest,
  unfollowSuccess,
  unfollowFailure,
  loadFollowersRequest,
  loadFollowersSuccess,
  loadFollowersFailure,
  loadFollowingsRequest,
  loadFollowingsSuccess,
  loadFollowingsFailure,
  removeFollowerRequest,
  removeFollowerSuccess,
  removeFollowerFailure,
  editNicknameRequest,
  editNicknameSuccess,
  editNicknameFailure
} from "../reducers/user";
import { takeLatest, all, fork, call, delay, put ,takeEvery} from "redux-saga/effects";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080/api';

function* watchLogIn() {
  yield takeLatest(loginRequest().type, login);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.payload);
    yield put(loginSuccess(result.data));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function loginAPI(data) {
  console.log(data);
  return axios.post("/user/login", data, {
    withCredentials: true
  });
}

function* watchSignUp() {
  yield takeLatest(signUpRequest().type, signUp);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.payload);
    // yield delay(2000);
    yield put(signUpSuccess());
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

function signUpAPI(data) {
  return axios.post("http://127.0.0.1:8080/api/user", data);
}

function* watchLogout() {
  yield takeLatest(logoutRequest().type, logout);
}

function* logout() {
  try {
    yield call(logOutAPI);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure());
  }
}

function logOutAPI() {
  return axios.post(
    "/user/logout",
    {},
    { withCredentials: true }
  );
}

function* watchLoadUser() {
  yield takeEvery(loadUserRequest().type, loadUser);
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI,action.payload);
    console.log(result.data);
    const payload = {
      payload:result.data,
      me:!action.payload,
    }
    yield put(loadUserSuccess(payload));
  } catch (error) {
    yield put(loadUserFailure(error));
  }
}

function loadUserAPI(userId) {
  console.log("api request "+(userId ? `/api/user/${userId}`:"/api/user"))
  return axios.get(userId?`/user/${userId}`:"/user", { withCredentials: true });
}

function* watchFollow() {
  yield takeEvery(followRequest().type, follow);
}

function* follow(action) {
  try {
    const result = yield call(followAPI,action.payload);
    yield put(followSuccess(result.data));
  } catch (error) {
    yield put(followFailure());
  }
}

function followAPI(userId) {
  return axios.post(`/user/${userId}/follow`,{}, { withCredentials: true });
}

function* watchUnfollow() {
  yield takeEvery(unfollowRequest().type, unfollow);
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI,action.payload);
    yield put(unfollowSuccess(result.data));
  } catch (error) {
    yield put(unfollowFailure());
  }
}

function unfollowAPI(userId) {
  return axios.delete(`/user/${userId}/follow`, { withCredentials: true });
}

function* watchLoadFollowers() {
  yield takeEvery(loadFollowersRequest().type, loadFollowers);
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI,action.payload,action.offset);
    yield put(loadFollowersSuccess(result.data));
  } catch (error) {
    yield put(loadFollowersFailure());
  }
}

function loadFollowersAPI(userId,offset=0,limit=3) {
  return axios.get(`/user/${userId||0}/followers?offset=${offset}&limit=${limit}`, { withCredentials: true });
}

function* watchLoadFollowings() {
  yield takeEvery(loadFollowingsRequest().type, loadFollowings);
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI,action.payload,action.offset);
    yield put(loadFollowingsSuccess(result.data));
  } catch (error) {
    yield put(loadFollowingsFailure());
  }
}

function loadFollowingsAPI(userId,offset=0,limit=3) {
  return axios.get(`/user/${userId||0}/followings?offset=${offset}&limit=${limit}`, { withCredentials: true });
}

function* watchRemoveFollower() {
  yield takeEvery(removeFollowerRequest().type, removeFollower);
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI,action.payload);
    yield put(removeFollowerSuccess(result.data));
  } catch (error) {
    yield put(removeFollowerFailure());
  }
}

function removeFollowerAPI(userId) {
  return axios.delete(`/user/${userId}/follower`, { withCredentials: true });
}

function* watchEditNickname(){
  yield takeLatest(editNicknameRequest().type,editNickName);
}

function* editNickName(action){
  try {
    console.log(action);
    const result = yield call(editNicknameAPI,action.payload);
    yield put(editNicknameSuccess(result.data));
  } catch (error) {
    yield put(editNicknameFailure());
  }
}

function editNicknameAPI(nickName){
  return axios.patch('/user/nickname',{nickName},{withCredentials:true});
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogout),
    fork(watchLoadUser),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollower),
    fork(watchEditNickname)
  ]);
}
