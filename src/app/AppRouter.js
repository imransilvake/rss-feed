// react
import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

// app
import ENV from '../environment/index';

// lazy load components
const Error404 = lazy(() => import('./screens/404/Error404'));

const RSSParser = lazy(() => {
	return new Promise(resolve => {
	  setTimeout(() => resolve(import('./screens/rss-parser/RSS-Parser')), 300000);
	});
  });

/**
 * Routing of the app
 * @returns {*}
 * @constructor
 */
const AppRouter = () => {
	return (
		<Switch>
			<Route exact path={ENV().ROUTING.HOME} component={RSSParser} />
			<Route exact from="*" component={Error404} />
		</Switch>
	);
};
export default AppRouter;
