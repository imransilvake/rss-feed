// initial state
import { createSlice } from '@reduxjs/toolkit';

// initial state
export const initialState = {
	rssFeedURL: 'https://feeds.npr.org/510312/podcast.xml',
	page: 0
};

// slice for data with reducers
const parserFormSlice = createSlice({
	name: 'parserForm',
	initialState,
	reducers: {
		formInput: (state, action) => {
			state.rssFeedURL = action.payload;
		},
		formNextPage: (state, action) => {
			state.page = action.payload;
		},
		formReset: () => initialState
	}
});

// actions generated from the slice
export const { formInput, formNextPage, formReset } = parserFormSlice.actions;

// selector
export const parserFormSelector = (state) => state['parserForm'];

// reducer
export default parserFormSlice.reducer;
