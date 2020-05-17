import React, {useState} from 'react';
import Navbar from './component';

const NavbarContainer = () => {
    
    const [anchor, setAnchor] = useState(null);

    const setClickedAsAnchor = e => setAnchor(e.currentTarget);
    const unsetAnchor = () => setAnchor(null);

    return (
        <Navbar
            anchor={anchor}
            handleOpen={setClickedAsAnchor}
            handleClose={unsetAnchor}
            isDropdownOpen={Boolean(anchor)}
        />
    );
};

export default NavbarContainer;