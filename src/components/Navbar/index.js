import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//
import Navbar from './component';
import { makeAPICall } from '@/utils';
import overlaySlice from '@/redux/slices/overlay';
import modalSlice from '@/redux/slices/modal';

const NavbarContainer = ({
    openModal,
    showOverlay,
    hideOverlay
}) => {
    
    const [anchor, setAnchor] = useState(null);

    const setClickedAsAnchor = e => setAnchor(e.currentTarget);
    const unsetAnchor = () => setAnchor(null);
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
            anchor={anchor}
            handleOpen={setClickedAsAnchor}
            handleClose={unsetAnchor}
            isDropdownOpen={Boolean(anchor)}
            openModal = {getRandomActivityAndOpenModal}
        />
    );
};

NavbarContainer.propTypes = {
    openModal: PropTypes.func.isRequired,
    showOverlay: PropTypes.func.isRequired,
    hideOverlay: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: (payload) => dispatch(modalSlice.actions.set({
            open: true,
            activity: payload
        })),
        showOverlay: () => dispatch(overlaySlice.actions.show()),
        hideOverlay: () => dispatch(overlaySlice.actions.hide()),
    };
};


export default connect(null, mapDispatchToProps)(NavbarContainer);