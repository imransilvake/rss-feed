// react
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// redux
import { parserFormSelector } from '../../../slices/parser-form';
import { fetchApi, parserListSelector } from '../../../slices/parser-list';

// material
import Container from '@material-ui/core/Container';

// app
import './RSS-List.scss';
import '../../../utilities/Array-Methods';
import Loader from '../../../../assets/images/loader.gif';
import RSSListItem from './rss-list-item/RSS-List-Item';
import paginatedList from '../../../utilities/Pagination';
import RSSListPagination from './rss-list-pagination/RSS-List-Pagination';

/**
 * RSS Parser List
 * @returns {*}
 * @constructor
 */
const RSSParserList = () => {
	// hooks
	const dispatch = useDispatch();
	const { rssFeedURL, page } = useSelector(parserFormSelector);
	const { loading, response, errors } = useSelector(parserListSelector);

	// triggers on submit
	useEffect(() => {
		if (rssFeedURL) {
			dispatch(fetchApi(rssFeedURL)); // fetch RSS Feed
		}
	}, [dispatch, rssFeedURL]);

	// scroll to top of list
	useEffect(() => {
		const element = document.getElementById('rp-items');
		if (element) {
			window.scroll({
				top: element.scrollTop,
				behavior: 'smooth'
			});
		}
	}, [page]);

	/**
	 * get total count of list items
	 */
	const getListItemsSize = () => {
		return response && response['items'] && response['items'].length;
	};

	/**
	 * display feed list
	 */
	const displayFeed = () => {
		// validate response
		if (response && response['info']) {
			return (
				<div className="rp-content">
					{/* feed info */}
					{response['info'] && (
						<div className="rp-info">
							<div className="rp-title-date">
								{/* title */}
								{response['info'].title && (
									<h1 className="rp-title rp-ellipses">{response['info'].title}</h1>
								)}

								{/* date */}
								{response['info'].lastBuildDate && (
									<p className="rp-date">{response['info'].lastBuildDate}</p>
								)}
							</div>

							{/* description */}
							{response['info'].description && <p>{response['info'].description}</p>}

							{/* link */}
							{response['info'].link && (
								<a href={`${response['info'].link}`} target="_blank" rel="noopener noreferrer">
									{response['info'].link}
								</a>
							)}
						</div>
					)}

					{/* feed items & Pagination */}
					{response['items'] && (
						<div className="rp-items-pagination">
							{/* pagination */}
							{getListItemsSize() > 20 && <RSSListPagination positionStart />}

							{/* feed items */}
							<div id="rp-items" className={getListItemsSize() <= 20 ? 'rp-end' : null}>
								{paginatedList(response['items'], page).map((item, index) => (
									<RSSListItem item={item} key={item.guid ? item.guid : index} />
								))}
							</div>

							{/* pagination */}
							{getListItemsSize() > 20 && <RSSListPagination />}
						</div>
					)}
				</div>
			);
		}

		// validate error(s)
		return errors && (
			<div className="rp-error">
				{!errors['message'] && (<h3>Unknown Error</h3>)}
				{errors['message'] && (<h3>{errors['message']}</h3>)}
				{
					errors['message'] && (
						<p>The requested resource could not be found but may be available in the future.</p>
					)
				}
			</div>
		);
	};

	return (
		<Container maxWidth="md">
			<section className="rp-parser-list">
				{/* RSS Feed | Error */}
				{displayFeed()}

				{/* Loader */}
				{loading && (
					<div className="rp-load-more">
						<img src={Loader} alt="load more" />
					</div>
				)}
			</section>
		</Container>
	);
};
export default RSSParserList;
