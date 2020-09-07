// redux
import { combineReducers } from 'redux';

// app
import parserProxyReducer from './parser-proxy';
import parserFormReducer from './parser-form';

// combine reducers
const rootReducer = combineReducers({
	parserProxy: parserProxyReducer,
	parserForm: parserFormReducer
});
export default rootReducer;
