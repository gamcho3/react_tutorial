import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import counter, { counterSaga } from "./counter";
import sample, { sampleSaga } from "./sample";
import loading from "./loading";
//객체의 이름을 결정
const rootReducer = combineReducers({
  counter,
  sample,
  loading,
});

export function* rootSaga() {
  yield all([counterSaga(), sampleSaga()]);
}

export default rootReducer;
