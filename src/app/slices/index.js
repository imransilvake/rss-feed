// redux
import { combineReducers } from 'redux';

// app
import parserListReducer from './parser-list';
import parserFormReducer from './parser-form';

// combine reducers
const rootReducer = combineReducers({
	parserForm: parserFormReducer,
	parserList: parserListReducer
});
export default rootReducer;
