// react
import React, { Suspense } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

// material
import LinearProgress from '@material-ui/core/LinearProgress';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

// app
import './App.scss';
import Logo from '../assets/svg/logo.svg';
import ENV from '../environment';
import AppRouter from './AppRouter';
import ScrollToTop from './components/scroll-to-top/Scroll-To-Top';

// material theme configuration
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#ff7816',
			contrastText: '#ffffff'
		},
		secondary: {
			main: '#ff7816',
			contrastText: '#ffffff'
		},
		error: {
			main: '#e74c3c'
		}
	}
});

/**
 * App Container
 * @returns {*}
 * @constructor
 */
const App = () => {
	return (
		<section className="rp-app-root">
			<MuiThemeProvider theme={theme}>
				<Suspense fallback={(<LinearProgress />)}>
					<BrowserRouter>
						{/* Header */}
						<header className="rp-header">
							<Link to={ENV().ROUTING.HOME}>
								<img src={Logo} alt="app-logo" />
							</Link>
						</header>

						{/* Router */}
						<AppRouter />

						{/* Footer */}
					</BrowserRouter>
				</Suspense>

				{/* Scroll To Top */}
				<ScrollToTop />
			</MuiThemeProvider>
		</section>
	);
};
export default App;
