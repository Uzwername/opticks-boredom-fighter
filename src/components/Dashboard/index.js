import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//
import overlaySlice from '@/redux/slices/overlay';
import favoriteListSlice from '@/redux/slices/favoriteList';
import Dashboard from './component';

const API_DOMAIN = 'https://bored-api.firebaseapp.com';

const columns = [
    { title: 'Activity', field: 'activity' },
    { title: 'Type', field: 'type' },
    { title: 'Price', field: 'price', type: 'currency' },
    { title: 'Participants num.', field: 'participants', type: 'numeric' },
    { title: 'Accessibility', field: 'accessibility', type: 'numeric' }
];

const getBoredActivitiesList = async (errorCallback, successCallback, alwaysCallback=null, url=`${API_DOMAIN}/api/activity/list/10`) => {
    try {
        const res = await fetch(url);
        const json = await res.json();

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

const DashboardController = ({ dispatch, favoriteList }) => {
    // In a real project, we could also
    // include cache expiration timestamp
    // as last item in the array (or as a separate key)
    const maybeFullListOfActivities = localStorage.getItem('full-list-of-bored-activities');
    const [fatalError, setFatalError] = useState({
        active: false,
    });
    const [boredActivitiesList, setBoredActivitiesList] = useState(
        maybeFullListOfActivities ?
            JSON.parse(maybeFullListOfActivities) :
            []
    );

    const tableOptions = {
        pageSize: 10,
        pageSizeOptions: boredActivitiesList.length > 10 ? [10, 20, 30] : [],
        selection: true,
        selectionProps: row => ({
            disabled: row.id in favoriteList
        }),
        rowStyle: rowData => (
            rowData.id in favoriteList ? {
                backgroundColor: 'rgb(255, 226, 236)'
            } : {} 
        )
    };

    const tableActions = [
          {
            icon: 'add',
            tooltip: 'Show more activities',
            position: 'toolbar',
            disabled: Boolean(maybeFullListOfActivities),
            onClick () {
                if (!maybeFullListOfActivities) {
                    dispatch(overlaySlice.actions.show());
                    const hideOverlay = () => dispatch(overlaySlice.actions.hide());
                    const addNewDataToState = allActivities => {
                        localStorage.setItem(
                            'full-list-of-bored-activities',
                            JSON.stringify(allActivities)
                        );
                        setBoredActivitiesList(allActivities);
                    };

                    // It rather makes sens to fetch all
                    // activities at once so, we can both cache them
                    // & avoid strange UX while having
                    // to filter incoming activities on per X
                    // random items basis.
                    getBoredActivitiesList(
                        setFatalError,
                        addNewDataToState,
                        hideOverlay,
                        `${API_DOMAIN}/api/activity/list`
                    );
                }
            }
        },
        {
            icon: 'favorite_border',
            tooltip: 'Add to favorites',
            position: 'toolbarOnSelect',
            onClick: (event, rowsData) => {
                const favored = rowsData.reduce(
                    (favoredItems, row) => {
                        if (row.id in favoriteList) return favoredItems;
                        return favoredItems.concat({
                            ...row,
                            tableData: {...row.tableData}
                        });
                    },
                    []
                );
                dispatch(favoriteListSlice.actions.add(favored));
            }
        },
        {
            icon: 'favorite_border',
            tooltip: 'Add to favorites',
            position: 'row',
            onClick: (event, row) => {
                dispatch(favoriteListSlice.actions.add({
                    ...row,
                    tableData: {...row.tableData}
                }));
            }
        }
    ];
    
    useEffect(() => {
        const closeOverlay = () => dispatch(overlaySlice.actions.hide());

        if (!boredActivitiesList.length) {
            dispatch(overlaySlice.actions.show());
            getBoredActivitiesList(setFatalError, setBoredActivitiesList, closeOverlay);
        }
    }, [boredActivitiesList, dispatch]);

    return (
        <Dashboard
            title=""
            actions={tableActions}
            columns={columns}
            data={boredActivitiesList}
            options={tableOptions}
            fatalError={fatalError}
        />
    );
};

DashboardController.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        favoriteList: state.favoriteList
    };
};

export default connect(mapStateToProps)(DashboardController);