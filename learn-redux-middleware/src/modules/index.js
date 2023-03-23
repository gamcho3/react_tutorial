import { combineReducers } from "redux";
import counter from "./counter";
import sample from "./sample";
import loading from "./loading";
//객체의 이름을 결정
const rootReducer = combineReducers({
  counter,
  sample,
  loading,
});

export default rootReducer;
