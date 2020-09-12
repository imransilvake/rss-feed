// redux
import { createSlice } from '@reduxjs/toolkit';

// app
import RSSFeedParser from '../utilities/RSS-Feed-Parser';

// initial state
export const initialState = {
	loading: false,
	finished: false,
	response: {},
	errors: null
};

// slice for data with reducers
const parserListSlice = createSlice({
	name: 'parserList',
	initialState,
	reducers: {
		listLoading: (state) => {
			state.loading = true;
		},
		listSuccess: (state, { payload }) => {
			state.finished = payload.items && payload.items.length === 0;
			state.loading = false;
			state.response = payload;
			state.errors = null;
		},
		listFailure: (state, { payload }) => {
			state.loading = false;
			state.finished = true;
			state.response = {};
			state.errors = payload;
		},
		listReset: () => initialState
	}
});

// actions generated from the slice
export const { listLoading, listSuccess, listFailure, listReset } = parserListSlice.actions;

// selector
export const parserListSelector = (state) => state['parserList'];

// reducer
export default parserListSlice.reducer;

/**
 * asynchronous fetch api
 * @param {*} api
 */
export const fetchApi = (api) => {
	return async (dispatch) => {
		// dispatch: start fetch process
		dispatch(listLoading());

		// Note: some RSS feeds can't be loaded in the browser due to CORS security.
		// To get around this, you can use a proxy.
		const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

		// response from api
		const response = await fetch(`${CORS_PROXY}${api}`);

		// return on error
		if (response && response.status === 404) {
			// dispatch: error
			dispatch(listFailure({
				message: '404: Page not found'
			}));
			return;
		}

		// response in string
		const res = await response.text();

		// convert string -> XML -> JS Object
		const rssFeedParser = new RSSFeedParser(res);
		const xmlToJs = rssFeedParser.getJSObject();

		// dispatch: result
		dispatch(listSuccess(xmlToJs));
	};
};
