import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//
import overlaySlice from '@/redux/slices/overlay';
import favoriteListSlice from '@/redux/slices/favoriteList';
import Dashboard from './component';
import { makeAPICall } from '@/utils';


const columns = [
    { title: 'Activity', field: 'activity' },
    { title: 'Type', field: 'type' },
    { title: 'Price', field: 'price', type: 'currency' },
    { title: 'Participants num.', field: 'participants', type: 'numeric' },
    { title: 'Accessibility', field: 'accessibility', type: 'numeric' }
];

const DashboardController = ({
    favoriteList,
    showOverlay,
    hideOverlay,
    addFavorite
}) => {
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
                    showOverlay();
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
                    makeAPICall(
                        setFatalError,
                        addNewDataToState,
                        hideOverlay,
                        '/api/activity/list'
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
                addFavorite(favored);
            }
        },
        {
            icon: 'favorite_border',
            tooltip: 'Add to favorites',
            position: 'row',
            onClick: (event, row) => {
                addFavorite({
                    ...row,
                    tableData: {...row.tableData}
                });
            }
        }
    ];
    
    useEffect(() => {
        if (!boredActivitiesList.length) {
            showOverlay();
            makeAPICall(setFatalError, setBoredActivitiesList, hideOverlay);
        }
    }, [boredActivitiesList, showOverlay, hideOverlay]);

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
    favoriteList: PropTypes.shape([
        PropTypes.object
    ]).isRequired,
    showOverlay: PropTypes.func.isRequired,
    hideOverlay: PropTypes.func.isRequired,
    addFavorite: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        favoriteList: state.favoriteList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showOverlay: () => dispatch(overlaySlice.actions.show()),
        hideOverlay: () => dispatch(overlaySlice.actions.hide()),
        addFavorite: (payload) => dispatch(favoriteListSlice.actions.add(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardController);