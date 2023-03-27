//액션 타입 선언
import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { startLoading, finishLoading } from "./loading";
import * as api from "../lib/api";
import createRequestThunk from "../lib/createRequestThunk";
import createRequestSaga from "../lib/createRequestSaga";

const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

// export const getPost = createRequestThunk(GET_POST, api.getPost);

// export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);

const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);
// function* getPostSaga(action) {
//   yield put(startLoading(GET_POST)); //로딩 시작
//   try {
//     const post = yield call(api.getPost, action.payload); //api.getPost(action.payload)를 의미
//     yield put({
//       type: GET_POST_SUCCESS,
//       payload: post.data,
//     });
//   } catch (error) {
//     yield put({
//       type: GET_POST_FAILURE,
//       payload: error,
//       error: true,
//     });
//   }

//   yield put(finishLoading(GET_POST)); //로딩 끝
// }

// function* getUsersSaga() {
//   yield put(startLoading(GET_USERS));
//   try {
//     const users = yield call(api.getUsers);
//     yield put({
//       type: GET_USERS_SUCCESS,
//       payload: users.data,
//     });
//   } catch (error) {
//     yield put({
//       type: GET_USERS_FAILURE,
//       payload: error,
//       error: true,
//     });
//   }
//   yield put(finishLoading(GET_USERS));
// }

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}
// export const getPost = (id) => async (dispatch) => {
//   dispatch({ type: GET_POST }); //요청 시작 알림
//   try {
//     const response = await api.getPost(id);
//     dispatch({ type: GET_POST_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: GET_POST_FAILURE, payload: error, error: true });
//     throw error;
//   }
// };

// export const getUsers = (id) => async (dispatch) => {
//   dispatch({ type: GET_USERS }); //요청 시작 알림
//   try {
//     const response = await api.getUsers();
//     dispatch({ type: GET_USERS_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: GET_USERS_FAILURE, payload: error, error: true });
//     throw error;
//   }
// };

const initialState = {
  post: null,
  users: null,
};

const sample = handleActions(
  {
    [GET_POST]: (state) => ({
      ...state,
    }),
    //요청 완료
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false,
      },
      post: action.payload,
    }),

    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false,
      },
      users: action.payload,
    }),
  },

  initialState
);
export default sample;
