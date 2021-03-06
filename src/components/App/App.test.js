import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
//
import App from '.';
import rootReducer from '@/redux/reducers';

test('renders learn react link', () => {
    const store = configureStore({
        reducer: rootReducer
    });
    const { getByText } = render(
        <Provider store={store} >
            <App />
        </Provider>
    );
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
