import React from 'react';
import styled from 'styled-components';
//
import Dashboard from '@/components/Dashboard';

const PageContainer = styled.main`
    display: flex;
    flex-direction: column;
    height: 100%;
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

const DashboardPage = () => {
    return (
        <PageContainer>
            <PageHeader>
                <UserGreeting>
                    Hello, Name!
                </UserGreeting>
            </PageHeader>
            <Dashboard />
        </PageContainer>
    ); 
}

export default React.memo(DashboardPage);