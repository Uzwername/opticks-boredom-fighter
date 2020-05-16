import React from 'react';
import MaterialTable from 'material-table';
import ErrorPage from '@/pages/Error';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ErrorContainer = styled.div`
    display: flex;
    flex-grow: 1;
`;

const Dashboard = (props) => {
    return(
        props.fatalError.active ? (
            <ErrorContainer>
                <ErrorPage
                    {...props.fatalError}
                />
            </ErrorContainer>
        ) : (
            <MaterialTable
                {...props}
            />
        )
    );
};

Dashboard.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string,
    actions: PropTypes.array,
    columns: PropTypes.array,
    options: PropTypes.object,
    fatalError: PropTypes.shape({
        active: PropTypes.bool.isRequired,
        title: PropTypes.string,
        message: PropTypes.string,
    }).isRequired,
};

export default React.memo(Dashboard);