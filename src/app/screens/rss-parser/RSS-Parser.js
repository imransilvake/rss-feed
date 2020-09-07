// react
import React from 'react';

// app
import RSSParserForm from './form/RSS-Form';
import RSSParserList from './list/RSS-List';

/**
 * RSS Parser
 * @returns {*}
 * @constructor
 */
const RSSParser = () => {
	return (
		<section className="rp-wrapper">
			{/* Form */}
			<RSSParserForm />

			{/* List */}
			<RSSParserList />
		</section>
	);
};
export default RSSParser;
