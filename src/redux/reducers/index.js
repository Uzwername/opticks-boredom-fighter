import { combineReducers } from 'redux';
import overlaySlice from './../slices/overlay';

export default combineReducers({
    overlay: overlaySlice.reducer
});