import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import LoopIcon from '@material-ui/icons/Loop';

const OverlayContainer = styled.div`
    visibility: ${props => props.isShown ? 'visible' : 'hidden'};
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1200;
    background-color: rgba(0, 0, 0, .5);
    color: #FFF;
    transition: visibility .4s;
`;

OverlayContainer.propTypes = {
  isShown: PropTypes.bool.isRequired,
};

const rotate = keyframes`
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const IconWrapper = styled.div`
    animation: 1.5s ${rotate} linear infinite;
`;

const Overlay = ({ isShown }) => {
    return (
        <OverlayContainer
            aria-modal="true"
            aria-label="Loading..."
            isShown={ isShown }
        >
            <IconWrapper>
                <LoopIcon
                    style={{fontSize: '5rem'}}
                />
            </IconWrapper>
        </OverlayContainer>
    );
};

Overlay.propTypes = {
    isShown: PropTypes.bool.isRequired,
};

export default React.memo(Overlay);