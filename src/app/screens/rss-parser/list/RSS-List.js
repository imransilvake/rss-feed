// react
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// redux
import { parserFormSelector, formNextPage } from '../../../slices/parser-form';
import { fetchApi, parserProxySelector } from '../../../slices/parser-proxy';

// material
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

// app
import './RSS-List.scss';
import Loader from '../../../../assets/images/loader.gif';

/**
 * RSS Parser List
 * @returns {*}
 * @constructor
 */
const RSSParserList = () => {
	// hooks
	const dispatch = useDispatch();
	const { rssFeedURL, page } = useSelector(parserFormSelector);
	const { loading, response, errors } = useSelector(parserProxySelector);

	// triggers on form submit
	useEffect(() => {
		if (rssFeedURL) {
			// fetch RSS Feed
			dispatch(fetchApi(rssFeedURL));
		}
	}, [dispatch, rssFeedURL]);

	/**
     * on change page number
     * @param {*} page
     */
	const pageNumber = (pageNo) => {
		// trigger page
		dispatch(formNextPage(pageNo));
	};

	/**
	 * display feed data
	 */
	const displayFeedData = () => {
		// validate response
		if (response && response['title']) {
			return (
				<div className="rp-content">
					{/* feed info */}
					{response['title'] && (
						<div className="rp-info">
							{/* title */}
							{response.title && <h1 className="rp-ellipses">{response.title}</h1>}

							{/* description */}
							{response.description && <p className="rp-ellipses">{response.description}</p>}

							{/* link */}
							{response.link && (<Link to={response.link} target="_blank">{response.link}</Link>)}

							{/* date */}
							{response.lastBuildDate && <p className="rp-ellipses">{response.lastBuildDate}</p>}
						</div>
					)}

					{/* feed items */}
					{response['items'] && (
						<div className="rp-items">
							{response['items'].map((item, index) => (
								<div className="rp-item" key={item.guid ? item.guid : index}>
									{/* title */}
									{item.title && <h4 className="rp-ellipses">{item.title}</h4>}

									{/* content */}
									{item.content && (
										<div dangerouslySetInnerHTML={{
											__html: item.content
										}} />
									)}
								</div>
							))}
						</div>
					)}

					{/* pagination */}
					<div className="rp-pagination">
						<Button
							variant="contained"
							color="secondary"
							onClick={() => pageNumber(page - 1)}
							disabled={page === 0}>
							Prev
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => pageNumber(page + 1)}>
							Next
						</Button>
					</div>
				</div>
			);
		}

		// validate error(s)
		return errors && (
			<div className="rp-error">
				{ !errors['message'] && (<h3>Unknown Error</h3>) }
				{ errors['message'] && (<h3>{ errors['message'] }</h3>) }
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
				{ displayFeedData() }

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
