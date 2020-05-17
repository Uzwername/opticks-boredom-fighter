import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
//
import Logo from '@/components/Logo';

const LogoWrapper = styled.div`
    flex-grow: 1;
`;

const WhiteIconButton = styled(IconButton)`
    && {
        color: #FFF
    };
`;

const LargeIcon = styled.svg`
    && {
        font-size: 3rem;
    };
`;

const IconButtonContainer = styled.div`
    padding: 0 5px;
`;

const Navbar = ({
    anchor,
    handleOpen,
    handleClose,
    isDropdownOpen,
    openModal
}) => {
    return (
        <>
            <AppBar
                position="static"
                color="secondary"
            >
                <Toolbar>
                    <LogoWrapper>
                        <Link to="/">
                            <Logo />
                        </Link>
                    </LogoWrapper>
                    <IconButtonContainer>
                        <Tooltip
                            title="Get one random activity"
                        >
                            <WhiteIconButton
                                onClick={openModal}
                                edge="end"
                                aria-label="Get one random activity"
                            >
                                <LargeIcon 
                                    as={EmojiObjectsIcon}
                                />
                            </WhiteIconButton>
                        </Tooltip>
                    </IconButtonContainer>
                    <IconButtonContainer>
                        <Tooltip
                            title="Open dropdown"
                        >
                            <WhiteIconButton
                                onClick={handleOpen}
                                edge="end"
                                aria-label="Open dropdown"
                            >
                                <LargeIcon 
                                    as={ExpandMoreIcon}
                                />
                            </WhiteIconButton>
                        </Tooltip>
                    </IconButtonContainer>
                    <Menu
                        id="dropdown-menu"
                        elevation={0}
                        anchorEl={anchor}
                        getContentAnchorEl={null}
                        keepMounted
                        open={isDropdownOpen}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        onClose={handleClose}
                    >
                        <MenuItem>Show Favorites</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </>
    );
};

Navbar.propTypes = {
    anchor: PropTypes.instanceOf(Element),
    handleOpen: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    isDropdownOpen: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
};

export default React.memo(Navbar);