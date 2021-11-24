import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import App from './App';
import { Provider as ContextProvider } from './Context';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';
// Layout
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';

const theme = createTheme({
	palette: {
		//mode: 'dark',
		primary: {
			light: '#6d6d6d',
			main: '#1b1b1b', //424242
			dark: '#1b1b1b',
			contrastText: '#000'
		},
		secondary: {
			light: '#ffff5a',
			main: '#ffff00',
			dark: '#c7cc00',
			contrastText: '#000'
		}
	}
});

ReactDOM.render(
	<React.StrictMode>
		<ContextProvider>
			<CookiesProvider>
				<ThemeProvider theme={theme}>
					<Router>
						<App />
					</Router>
				</ThemeProvider>
			</CookiesProvider>
		</ContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
