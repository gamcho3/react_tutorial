//액션 타입 선언
import { handleActions } from "redux-actions";
import * as api from "../lib/api";
import createRequestThunk from "../lib/createRequestThunk";
const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

export const getPost = createRequestThunk(GET_POST, api.getPost);

export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

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
