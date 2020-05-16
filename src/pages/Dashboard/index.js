import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
//
import Dashboard from '@/components/Dashboard';

const PageContainer = styled.main`
    padding: 15px 2.5% 0;
`;

const PageHeader = styled.header`
    text-align: center;
    @media (min-width: 500px) {
        text-align: left;
    }
`;

const UserGreeting = styled.h2`
    color: #919191;
    font-weight: 500;
    margin-bottom: 20px;
`;

const PageNavigation = styled.nav`
    display: flex;
    justify-content: center;
    flex-wrap: wrap-reverse;
    @media (min-width: 500px) {
        justify-content: flex-end;
    }
`;

const IconWrapper = styled.div`
    padding: 5px;
`;

const DashboardPage = () => {
    return (
        <PageContainer>
            <PageHeader>
                <UserGreeting>
                    Hello, Name!
                </UserGreeting>
                <PageNavigation>
                    <IconWrapper>
                        <IconButton
                            aria-label="Add to favorite activities"
                        >
                            <FavoriteBorderIcon />
                        </IconButton>
                    </IconWrapper>
                    <TextField
                        variant="outlined"
                        type="text"
                        label="Search"
                        {
                        // value={values.password}
                        // onChange={handleChange('password')}
                        ...[]
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        {
                                        // onClick={handleClickShowPassword}
                                        // onMouseDown={handleMouseDownPassword}
                                        ...[]
                                        }
                                        >
                                        {<SearchIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </PageNavigation>
            </PageHeader>
            <Dashboard />
        </PageContainer>
    ); 
}

export default connect()(DashboardPage);