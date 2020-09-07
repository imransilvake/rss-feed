// redux
import { createSlice } from '@reduxjs/toolkit';

// app
import RSSParser from 'rss-parser';

// initial state
export const initialState = {
	loading: false,
	finished: false,
	response: {},
	errors: null
};

// slice for data with reducers
const parserProxySlice = createSlice({
	name: 'parserProxy',
	initialState,
	reducers: {
		proxyLoading: (state) => {
			state.loading = true;
		},
		proxySuccess: (state, { payload }) => {
			state.finished = payload.items && payload.items.length === 0;
			state.loading = false;
			state.response = payload;
			state.errors = null;
		},
		proxyFailure: (state, { payload }) => {
			state.loading = false;
			state.finished = true;
			state.response = {};
			state.errors = payload;
		},
		proxyReset: () => initialState
	}
});

// actions generated from the slice
export const { proxyLoading, proxySuccess, proxyFailure, proxyReset } = parserProxySlice.actions;

// selector
export const parserProxySelector = (state) => state['parserProxy'];

// reducer
export default parserProxySlice.reducer;

/**
 * asynchronous fetch api
 * @param {*} api
 */
export const fetchApi = (api) => {
	return async (dispatch) => {
		// dispatch: start fetch process
		dispatch(proxyLoading());

		// Note: some RSS feeds can't be loaded in the browser due to CORS security.
		// To get around this, you can use a proxy.
		const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

		// RSS Parser
		const parser = new RSSParser();
		parser.parseURL(`${CORS_PROXY}${api}`, (err, result) => {
			// throw
			if (err) {
				// dispatch: error
				dispatch(proxyFailure({
					message: err.message
				}));

				return;
			}

			// dispatch: result
			dispatch(proxySuccess(result));
		});
	};
};
