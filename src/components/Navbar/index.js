import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//
import Navbar from './component';
import { makeAPICall } from '@/utils';
import overlaySlice from '@/redux/slices/overlay';
import modalSlice from '@/redux/slices/modal';
import favoriteListSlice from '@/redux/slices/favoriteList';

const NavbarContainer = ({
    favoriteList,
    openModal,
    showOverlay,
    hideOverlay,
    removeFromFavorites
}) => {
    
    const [anchor, setAnchor] = useState(null);
    const [isSlidePanelOpen, setIsSlidePanelOpen] = useState(false);

    // Dropdown handlers
    const handleDropdownOpen = e => setAnchor(e.currentTarget);
    const handleDropdownClose = () => setAnchor(null);
    // Slide panels handler
    const handleSlidePanelOpen = () => setIsSlidePanelOpen(true);
    const handleSlidePanelClose = () => {
        setIsSlidePanelOpen(false);
        handleDropdownClose();
    };
    // Modal handlers
    const getRandomActivityAndOpenModal = () => {

        const handleError = (error) => {
            hideOverlay();
            openModal([error]);
        };

        showOverlay();
        makeAPICall(
            handleError,
            openModal,
            hideOverlay,
            '/api/activity'
        );
    };

    return (
        <Navbar
            favoriteActivities={Object.values(favoriteList)}
            onDiscardFromFavorites={removeFromFavorites}
            anchor={anchor}
            openModal={getRandomActivityAndOpenModal}
            isDropdownOpen={Boolean(anchor)}
            onDropdownOpen={handleDropdownOpen}
            onDropdownClose={handleDropdownClose}
            isSlidePanelOpen={isSlidePanelOpen}
            onSlidePanelOpen={handleSlidePanelOpen}
            onSlidePanelClose={handleSlidePanelClose}
        />
    );
};

NavbarContainer.propTypes = {
    favoriteList: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
    showOverlay: PropTypes.func.isRequired,
    hideOverlay: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        favoriteList: state.favoriteList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: (payload) => dispatch(modalSlice.actions.set({
            open: true,
            activity: payload
        })),
        showOverlay: () => dispatch(overlaySlice.actions.show()),
        hideOverlay: () => dispatch(overlaySlice.actions.hide()),
        removeFromFavorites: (payload) => dispatch(favoriteListSlice.actions.remove(payload))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);