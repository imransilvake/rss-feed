// initial state
import { createSlice } from '@reduxjs/toolkit';

// initial state
export const initialState = {
	rssFeedURL: '',
	page: 0
};

// slice for data with reducers
const parserFormSlice = createSlice({
	name: 'parserForm',
	initialState,
	reducers: {
		formInput: (state, { payload }) => {
			state.rssFeedURL = payload;
		},
		formNextPage: (state, { payload }) => {
			state.page = payload;
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
