import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'modal',
    initialState: {
        open: false,
        activity: [],
    },
    reducers: {
        set: (state, action) => action.payload,
        close: (state) => ({...state, open: false})
    }
});