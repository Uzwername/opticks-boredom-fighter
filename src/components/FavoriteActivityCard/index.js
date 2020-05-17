import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';

const CardContainer = styled.div`
    padding: 10px;
    margin: 10px;
`;

const CardTitleContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`;

const CardTitle = styled.p`
    font-size: 1.3rem;
    font-weight: 500;
    color: #111;
    margin-bottom: 20px;
`

const DetailsTable = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 10px 20px;
`;

const StrongDetail = styled.strong`
    font-weight: 500;
    color: #000;
`;

const SpacedButton = styled(Button)`
    && {
        margin-top: 25px;
    }
`;

const FavoriteActivityCard = (props) => {
    
    const {
        activity,
        type,
        price,
        participants,
        accessibility
    } = props.activity;

    const handleDiscardFromFavorites = () => props.onDiscardFromFavorites(props.activity);

    return (
        <Paper
            elevation={3}
        >
            <CardContainer>
                <CardTitleContainer>
                    <CardTitle>
                        {activity}
                    </CardTitle>
                    <FavoriteBorderIcon />
                </CardTitleContainer>
                <DetailsTable>
                    <div>
                        Type: <StrongDetail style={{textTransform: 'capitalize'}}>{type}</StrongDetail>
                        <br/>
                        Price: <StrongDetail>${price}</StrongDetail>
                    </div>
                    <div>
                        Participants: <StrongDetail>{participants}</StrongDetail>
                        <br/>
                        Accessibility: <StrongDetail>{accessibility}</StrongDetail>
                    </div>
                </DetailsTable>
                <SpacedButton
                    variant="contained"
                    color="secondary"
                    onClick={handleDiscardFromFavorites}
                >
                    Discard
                </SpacedButton>
            </CardContainer>
        </Paper>
    );
};

FavoriteActivityCard.propTypes = {
    activity: PropTypes.shape({
        id: PropTypes.string.isRequired,
        activity: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        participants: PropTypes.number.isRequired,
        accessibility: PropTypes.number.isRequired,
    }),
    onDiscardFromFavorites: PropTypes.func.isRequired,
};

export default  React.memo(FavoriteActivityCard);