import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/reducers'
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

const store = configureStore({
    reducer: rootReducer
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
        <GlobalStyles />
    </React.StrictMode>,
    document.getElementById('root')
);
