import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//
import Logo from '@/components/Logo';

const LogoWrapper = styled.div`
    flex-grow: 1;
`;

const Navbar = ({anchor, handleOpen, handleClose, isDropdownOpen}) => {

    return (
        <AppBar
            position="static"
            color="secondary"
        >
            <Toolbar>
                <LogoWrapper>
                    <Logo />
                </LogoWrapper>
                <IconButton
                    onClick={handleOpen}
                    edge="end"
                    aria-label="Open dropdown"
                    style={{
                        color: '#FFF'
                    }}
                >
                    <ExpandMoreIcon />
                </IconButton>
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
    );
};

Navbar.propTypes = {
    anchor: PropTypes.instanceOf(Element),
    handleOpen: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    isDropdownOpen: PropTypes.bool.isRequired,
};

export default React.memo(Navbar);