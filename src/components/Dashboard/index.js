import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//
import overlay from '@/redux/slices/overlay';
import Dashboard from './component';

const columns = [
    { title: 'Activity', field: 'activity' },
    { title: 'Type', field: 'type' },
    { title: 'Price', field: 'price', type: 'currency' },
    { title: 'Participants num.', field: 'participants', type: 'numeric' },
    { title: 'Accessibility', field: 'accessibility', type: 'numeric' }
];

const getBoredData = async (errorCallback, successCallback, alwaysCallback=null, url='https://bored-api.firebaseapp.com/api/activity/list/10') => {
    try {
        const res = await fetch(url);
        const json = await res.json();

        localStorage.setItem('cachedBoredResults', JSON.stringify(json));
        successCallback(json);
    } catch {
        errorCallback({
            active: true,
            title: '500',
            message: 'Please reload the page',
        })
    }
    
    if (alwaysCallback) alwaysCallback();
}

const DashboardController = ({ dispatch }) => {
    const [fatalError, setFatalError] = useState({
        active: false,
    });
    const [boredData, setBoredData] = useState(
        localStorage.getItem('cachedBoredResults') ?
            JSON.parse(localStorage.getItem('cachedBoredResults')) :
            []
    );

    const closeOverlay = () => dispatch(overlay.actions.hide());

    const tableOptions = {
        pageSize: 10,
        pageSizeOptions: boredData.length > 10 ? [10, 20, 30] : [],
        selection: true,
        selectionProps: rowData => ({
            disabled: rowData.id === '7526324',
        }),
        rowStyle: rowData => (
          (rowData.id === '7526324') ? {
              backgroundColor: 'rgb(255, 226, 236)'
          } : {} 
        )
    };

    const tableActions = [
          {
            icon: 'add',
            tooltip: 'Show more activities',
            position: 'toolbar',
            onClick () {
                
            }
        },
        {
            icon: 'favorite_border',
            tooltip: 'Add to favorites',
            position: 'toolbarOnSelect',
            onClick (event, rowData) {
                console.log(rowData)
            }
        },
        {
            icon: 'favorite_border',
            tooltip: 'Add to favorites',
            position: 'row',
            onClick (event, rowData) {
                console.log(rowData);
            }
        }
    ];

    useEffect(() => {
        if (!boredData.length) {
            console.log(overlay.actions.show());
            dispatch(overlay.actions.show());
            getBoredData(setFatalError, setBoredData, closeOverlay);
        }
    }, [boredData]);

    return (
        <Dashboard
            title=""
            actions={tableActions}
            columns={columns}
            data={boredData}
            options={tableOptions}
            fatalError={fatalError}
        />
    );
};

DashboardController.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(DashboardController);