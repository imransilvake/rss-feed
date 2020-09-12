// react
import React from 'react';

// app
import './RSS-List-Item.scss';

/**
 * RSS List Item
 * @param {*} item
 */
const RSSListItem = ({ item }) => {
	return (
		<div className="rp-item">
			<div className="rp-title-date">
				{/* title */}
				{item.title && <h4 className="rp-title rp-ellipses">{item.title}</h4>}

				{/* Date */}
				{item.pubDate && <p className="rp-date">{item.pubDate}</p>}
			</div>

			{/* summary */}
			{item.summary && (
				<p
					className="rp-summary"
					dangerouslySetInnerHTML={{
						__html: item.summary
					}} />
			)}
			{item['itunes:summary'] && (
				<p
					className="rp-summary"
					dangerouslySetInnerHTML={{
						__html: item['itunes:summary']
					}} />
			)}

			{/* description */}
			{item.description && (
				<div dangerouslySetInnerHTML={{
					__html: item.description
				}} />
			)}

			{/* content */}
			{item.content && (
				<div dangerouslySetInnerHTML={{
					__html: item.content
				}} />
			)}

			{/* Link */}
			{item.link && (
				<a href={item.link} target="_blank" rel="noopener noreferrer" className="rp-link">
					{item.link}
				</a>
			)}
		</div>
	);
};
export default RSSListItem;
