import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'typeface-roboto';
// Layout
import { createTheme, ThemeProvider } from '@mui/material/styles';
//Session context
import { SessionProvider } from './SessionContext';

const theme = createTheme({
	palette: {
		primary: {
			light: '#63a4ff',
			main: '#1976d2',
			dark: '#004ba0',
			contrastText: '#000'
		},
		secondary: {
			light: '#4f5b62',
			main: '#263238',
			dark: '#000a12',
			contrastText: '#000'
		},
		background: {
			login: '#546e7a' //primary.main
		}
	},
	night: {
		primary: {
			light: '#4f5b62',
			main: '#263238',
			dark: '#000a12',
			contrastText: '#000'
		},
		secondary: {
			light: '#63a4ff',
			main: '#1976d2',
			dark: '#004ba0',
			contrastText: '#000'
		}
	},
	day: {
		primary: {
			light: '#ffffff',
			main: '#f5f5f5',
			dark: '#000a12',
			contrastText: '#000'
		},
		secondary: {
			light: '#63a4ff',
			main: '#1976d2',
			dark: '#004ba0',
			contrastText: '#000'
		}
	}
});

ReactDOM.render(
	<React.StrictMode>
		<SessionProvider>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</SessionProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
