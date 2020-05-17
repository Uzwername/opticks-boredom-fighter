import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//
import Modal from './component';
import favoriteListSlice from '@/redux/slices/favoriteList';
import modalSlice from '@/redux/slices/modal';

const ModalContainer = ({
    modalContent,
    favoriteList,
    closeModal,
    addFavorite 
}) => {

    const addActivityToFavorite = () => {
        addFavorite(modalContent.activity);
    };
    const closeModalAndUpdateStore = () => {
        closeModal();
    };

    return (
        <Modal
            isOpen={modalContent.open}
            content={modalContent.activity[0]}
            onClose={closeModalAndUpdateStore}
            addFavorite={addActivityToFavorite}
            isFavoriteActivity={
                Boolean(modalContent.activity.length) &&
                'id' in modalContent.activity[0] &&
                modalContent.activity[0].id in favoriteList
            }
        />
    );
};

ModalContainer.propTypes = {
    modalContent: PropTypes.object.isRequired,
    favoriteList: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    addFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        modalContent: state.modal,
        favoriteList: state.favoriteList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(modalSlice.actions.close()),
        addFavorite: (payload) => dispatch(favoriteListSlice.actions.add(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);