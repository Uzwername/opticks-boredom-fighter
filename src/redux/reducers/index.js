import { combineReducers } from 'redux';
import overlaySlice from '@/redux/slices/overlay';
import favoriteListSlice from '@/redux/slices/favoriteList';
import modalSlice from '@/redux/slices/modal';

export default combineReducers({
    overlay: overlaySlice.reducer,
    favoriteList: favoriteListSlice.reducer,
    modal: modalSlice.reducer,
});