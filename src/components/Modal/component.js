import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const DialogTitleContainer = styled(DialogTitle)`
    & > .MuiTypography-root{
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }
`;

const CloseIconContainer = styled.div`
    margin: 0 5px;
`;

const StrongDetail = styled.strong`
    font-weight: 500;
    color: #000;
`;

const MaybeHighlightedDialogConatiner = styled(Dialog)`
    &&.favored .MuiPaper-root {
        background-color: rgb(255, 226, 236);
    }
    && .MuiPaper-root {
        transition: background-color .6s;
    }
`;

const Modal = ({
    onClose,
    addFavorite,
    isFavoriteActivity,
    isOpen,
    ...props
}) => {

    const content = props.content || {};
    const isNetworkError = (content.active && content.title === '500');
    const shouldFavoriteButtonBeDisplayed = !(isNetworkError || isFavoriteActivity );
    
    return (
        <MaybeHighlightedDialogConatiner
            open={isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onClose={onClose}
            className={
                isFavoriteActivity ?
                    'favored' :
                    ''
            }
        >
            <DialogTitleContainer id="alert-dialog-title">
                { isNetworkError ? 'Oops, bad luck this time' :  "Looks like we've got something interesting for you!" }
                <CloseIconContainer>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </CloseIconContainer>
            </DialogTitleContainer>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                { isNetworkError ? (
                    <>
                        An error happened while we've
                        been trying to get a fun activity
                        for you.
                        No worries! The rest of the page is not affected.
                        <br />
                        <br />
                        Please close this modal
                        and try again. It will likely work
                        fine next time.
                    </>
                    ) : (
                    <>
                        Activity: <StrongDetail>{ content.activity }</StrongDetail>
                        <br />
                        <br />
                        Type:  <StrongDetail style={{textTransform: 'capitalize'}}>{ content.type }</StrongDetail>
                        <br />
                        Price: <StrongDetail>${ content.price }</StrongDetail>
                        <br />
                        Participants num.: <StrongDetail>{ content.participants }</StrongDetail>
                        <br />
                        Accessibility: <StrongDetail>{ content.accessibility }</StrongDetail>
                    </>
                )}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {
                    shouldFavoriteButtonBeDisplayed && (
                        <Button
                            color="secondary"
                            onClick={addFavorite}
                        >
                            Add to favorites
                        </Button>
                    )
                }
                <Button
                    color="secondary"
                    onClick={onClose}
                >
                    Close
                </Button>
            </DialogActions>
        </MaybeHighlightedDialogConatiner>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    content: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    addFavorite: PropTypes.func.isRequired,
    isFavoriteActivity: PropTypes.bool,
};

export default React.memo(Modal);