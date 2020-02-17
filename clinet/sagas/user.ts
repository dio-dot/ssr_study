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
  loadUserFailure
} from "../reducers/user";
import { takeLatest, all, fork, call, delay, put } from "redux-saga/effects";
import axios from "axios";

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
  return axios.post("http://localhost:8080/api/user/login", data, {
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
    "http://localhost:8080/api/user/logout",
    {},
    { withCredentials: true }
  );
}

function* watchLoadUser() {
  yield takeLatest(loadUserRequest().type, loadUser);
}

function* loadUser() {
  try {
    const result = yield call(loadUserAPI);
    yield put(loadUserSuccess(result.data));
  } catch (error) {
    yield put(loadUserFailure(error));
  }
}

function loadUserAPI() {
  return axios.get("http://localhost:8080/api/user", { withCredentials: true });
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogout),
    fork(watchLoadUser),
    fork(watchSignUp)
  ]);
}
