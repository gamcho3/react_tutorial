import { combineReducers } from 'redux';

/**
 * 리듀서 등록
 */
import auth from './auth';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
