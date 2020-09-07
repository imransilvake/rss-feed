/**
 * mock response
 * @returns {*}
 */
const mockSuccessResponse = () => {
	return {
		title: 'A',
		items: [
			{
				title: 'one'
			},
			{
				title: 'two'
			}
		]
	};
};

/**
 * mock fail response
 * @returns {*}
 */
const mockFailResponse = () => {
	return {
		items: null
	};
};

export {
	mockSuccessResponse,
	mockFailResponse
};
