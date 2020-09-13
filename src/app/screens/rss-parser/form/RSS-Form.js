// react
import React, { useEffect, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { listReset, parserListSelector } from '../../../slices/parser-list';
import { initialState, formReset, formInput, parserFormSelector } from '../../../slices/parser-form';

// material
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// app
import './RSS-Form.scss';

/**
 * RSS Parser Form
 * @returns {*}
 * @constructor
 */
const RSSParserForm = () => {
	// hooks
	const dispatch = useDispatch();
	const [inputUrl, setInputUrl] = useState(initialState.rssFeedURL);
	const { rssFeedURL } = useSelector(parserFormSelector);
	const { response, errors } = useSelector(parserListSelector);

	useEffect(() => {
	}, [dispatch, inputUrl]);

	/**
	 * on handle change event
	 * @param event
	 */
	const handleChange = (event) => {
		// destruct
		const { value } = event.target;

		// set hook: setState
		setInputUrl(value);
	};

	/**
	 * on submit form
	 */
	const handleSubmit = (event) => {
		// prevent default
		event.preventDefault();

		// do nothing if same input
		if (rssFeedURL === inputUrl) return;

		// reset list state
		dispatch(listReset());

		// reset form state
		dispatch(formReset());

		// apply RSS Feed URL
		dispatch(formInput(inputUrl));
	};

	return (
		<Container maxWidth="md">
			<form onSubmit={handleSubmit} className="rp-parser-form">
				<div className={`rp-content ${response['info'] || (errors && errors['message']) ? 'rp-on-result' : ''}`}>
					{/* Left */}
					<div className="rp-left">
						<TextField
							label="RSS URL*"
							id="text"
							type="text"
							name="rss-url"
							value={inputUrl}
							onChange={handleChange}
							onBlur={handleChange}
							variant="filled"
							InputLabelProps={{
								className: 'rp-input-label'
							}}
							InputProps={{
								className: 'rp-input-url'
							}}
							fullWidth />
					</div>

					{/* Right */}
					<div className="rp-right">
						<Button variant="contained" color="secondary" type="submit">
							Submit
						</Button>
					</div>
				</div>
			</form>
		</Container>
	);
};
export default RSSParserForm;
