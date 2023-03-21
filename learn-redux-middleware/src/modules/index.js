import { combineReducers } from "redux";
import counter from "./counter";
import sample from "./sample";
//객체의 이름을 결정
const rootReducer = combineReducers({
  counter,
  sample,
});

export default rootReducer;
