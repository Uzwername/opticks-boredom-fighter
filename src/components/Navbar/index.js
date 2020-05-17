import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//
import Logo from '@/components/Logo';

const LogoWrapper = styled.div`
    flex-grow: 1;
`;

const Navbar = () => {
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
                    edge="end"
                    aria-label="Open dropdown"
                    style={{
                        color: '#FFF'
                    }}
                >
                    <ExpandMoreIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default React.memo(Navbar);