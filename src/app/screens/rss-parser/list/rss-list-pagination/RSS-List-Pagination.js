// react
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// redux
import { parserFormSelector, formNextPage } from '../../../../slices/parser-form';
import { parserListSelector } from '../../../../slices/parser-list';

// material
import Button from '@material-ui/core/Button';

// app
import './RSS-List-Pagination.scss';
import paginatedList from '../../../../utilities/Pagination';

/**
 * RSS List Pagination
 */
const RSSListPagination = ({ positionStart }) => {
	// hooks
	const dispatch = useDispatch();
	const { page } = useSelector(parserFormSelector);
	const { response } = useSelector(parserListSelector);

	return (
		<div
			id={positionStart ? 'rp-start' : null}
			className={positionStart ? 'rp-pagination rp-start' : 'rp-pagination'}>
			<Button
				variant="contained"
				color="secondary"
				onClick={() => dispatch(formNextPage(page - 1))}
				disabled={page === 0}>
				Prev
			</Button>
			<Button
				variant="contained"
				color="secondary"
				onClick={() => dispatch(formNextPage(page + 1))}
				disabled={paginatedList(response['items'], page).length !== 20}>
				Next
			</Button>
		</div>
	);
};
export default RSSListPagination;
