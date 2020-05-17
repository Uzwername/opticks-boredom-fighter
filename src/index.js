import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
import { save, load } from "redux-localstorage-simple"
//
import App from '@/components/App';
import rootReducer from '@/redux/reducers';
import './css/global.css';

const GlobalStyles = createGlobalStyle`
    p, div, h1, h2, h3, h4, h5, h6,
    span, pre, article, section, aside,
    main, footer, header, nav, html, body,
    #root, button {
        padding: 0;
        margin: 0;
        border: none;
        background: none;
    }

    html, body, #root {
        position: relative;
        height: 100%;
        width: 100%;
        font-family: 'Roboto', sans-serif;
        display: flex;
        flex-direction: column;
    }
`;

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3CC588',
        },
        secondary: {
            main: '#3F5FDE',
        },
    },
});

const store = configureStore({
    reducer: rootReducer,
    middleware: [
        ...getDefaultMiddleware(),
        save({
            states: ['favoriteList'],
            namespace: 'redux_local_state',
        })
    ],
    preloadedState: load({
        states: ['favoriteList'],
        namespace: 'redux_local_state',
    }),
});

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <React.StrictMode>
                <App />
                <GlobalStyles />
            </React.StrictMode>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);
