import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Countdown from "react-countdown";
import { Grid, CardHeader, Avatar } from '@material-ui/core';
import styled from 'styled-components';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  media: {
    height: 280,
  },
  bidButton: {
    width: '70%',
    background: 'linear-gradient(90deg, rgba(190,52,32,1) 0%, rgba(231,75,77,1) 48%, rgba(231,148,74,1) 100%)',
    borderWidth: 0,
    color: 'white',
  },
  cardActions: {
   width: '100%',
   display: 'flex',
   justifyContent: 'center',
   padding: 12,
  },
  detailsContainer: {
    display: 'flex',
    padding: 0,
  },
  details: {
    display: 'flex',
    flexBasis: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 10,
    textAlign: 'center',
  },
});

const Label = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: #919191;
`;

const Value = styled.span`
  font-size: 14px;
`;

const Auction = ({ auction, onBid, bidState }) => {
  const classes = useStyles();
  const amount = auction.highestBid.amount;

  const pictureUrl = auction.pictureUrl ? auction.pictureUrl : 'placeholder.png';

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {auction.seller[0].toUpperCase()}
            </Avatar>
          }
          title={auction.title}
        />
        <CardMedia
          className={classes.media}
          image={pictureUrl}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.detailsContainer}>
          <div className={classes.details}>
              <div>
                <Value>{amount === 0 ? 'No bids' : `$${amount}`}</Value>
                <Label>HIGHEST BID</Label>
              </div>
          </div>
          <div className={classes.details}>
            <div>
              <Countdown
                date={auction.endingAt}
                renderer={({ hours, minutes, seconds }) => (
                  <Value>
                    {hours} hours {minutes} mins {seconds} secs
                  </Value>
                )}
              />
              <Label>TIME REMAINING</Label>
            </div>
          </div>
          {/* <Grid container spacing={3} style={{ width: '100%', margin: 'auto' }}>
            <Grid item xs={4} style={{ textAlign: 'center' }}>
              <Value>{amount === 0 ? 'No bids' : `$${amount}`}</Value>
              <Label>HIGHEST BID</Label>
            </Grid>
            <Grid item xs={8} style={{ textAlign: 'center' }}>
              <p>
                <Countdown
                  date={auction.endingAt}
                  renderer={({ hours, minutes, seconds }) => (
                    <Value>
                     {hours} hours {minutes} mins {seconds} secs
                    </Value>
                  )}
                />
              </p>
              <Label>TIME REMAINING</Label>
            </Grid>
          </Grid> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className={classes.cardActions}>
          { (bidState === 'OWN_AUCTION' || bidState === 'HIGHEST_BIDDER') && (
            <Button
              disabled={true}
              onClick={() => onBid()}
            >
              {bidState === 'OWN_AUCTION' ? 'This is your auction' : 'You are the highest bidder'}
            </Button>
          )}

          { bidState === 'CAN_BID' && (
            <Button
              variant="outlined"
              className={classes.bidButton}
              onClick={() => onBid()}
            >
              Bid now!
            </Button>
          )}

        </div>
      </CardActions>
    </Card>
  );
};

export default Auction;
