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
import Drawer from '@material-ui/core/Drawer';
//
import Logo from '@/components/Logo';
import FavoriteActivityCard from '@/components/FavoriteActivityCard';

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

const DrawerContentBox = styled.div`
    padding: 20px 5%;
`;

const FavoriteListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 1fr);
    grid-gap: 25px;
    @media (min-width: 500px) {
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }
`;

const drawerStylesObject = {
    style: {
        width: '70%'
    }
};

const Navbar = ({
    favoriteActivities,
    anchor,
    onDropdownOpen,
    onDropdownClose,
    isDropdownOpen,
    openModal,
    isSlidePanelOpen,
    onSlidePanelOpen,
    onSlidePanelClose,
    onDiscardFromFavorites
}) => {

    const favoriteActivitiesList = favoriteActivities.map(
        activity => (
            <FavoriteActivityCard
                key={activity.id}
                activity={activity}
                onDiscardFromFavorites={onDiscardFromFavorites}
            />
        )
    );

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
                                onClick={onDropdownOpen}
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
                        onClose={onDropdownClose}
                    >
                        <MenuItem
                            onClick={onSlidePanelOpen}
                        >
                            Show Favorites
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="right"
                open={isSlidePanelOpen}
                onClose={onSlidePanelClose}
                PaperProps={drawerStylesObject}
                SlideProps={drawerStylesObject}
            >
                <DrawerContentBox>
                    <h1>
                        Favorite Activities
                    </h1>
                    <br />
                    <FavoriteListContainer>
                        { favoriteActivitiesList }
                    </FavoriteListContainer>
                </DrawerContentBox>
            </Drawer>
        </>
    );
};

Navbar.propTypes = {
    favoriteActivities: PropTypes.array.isRequired,
    onDiscardFromFavorites: PropTypes.func.isRequired,
    anchor: PropTypes.instanceOf(Element),
    openModal: PropTypes.func.isRequired,
    onDropdownOpen: PropTypes.func.isRequired,
    onDropdownClose: PropTypes.func.isRequired,
    isDropdownOpen: PropTypes.bool.isRequired,
    isSlidePanelOpen: PropTypes.bool.isRequired,
    onSlidePanelOpen: PropTypes.func.isRequired,
    onSlidePanelClose: PropTypes.func.isRequired,
};

export default React.memo(Navbar);