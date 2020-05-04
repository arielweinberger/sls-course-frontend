import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import {
  Modal,
  makeStyles,
  Fade,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: 0,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    borderRadius: 10,
  },
}));

const BidModal = ({ auctionStore, onCancel }) => {
  const classes = useStyles();
  const auction = auctionStore.biddingOn;

  if (!auction) {
    return null;
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={!!auction}
      onClose={() => auctionStore.setBiddingOn(null)}
      closeAfterTransition
    >
      <Fade in={!!auction}>
        <div className={classes.paper}>
          <h2>Bid on "{auction.title}"</h2>
          <form noValidate autoComplete="off">
            <FormControl fullWidth className={classes.margin}>
              <InputLabel htmlFor="standard-adornment-amount">
                Bid Amount
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                value={auctionStore.bidAmount}
                onChange={(e) => auctionStore.setBidAmount(e.target.value)}
                type="number"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
            <br/><br/>
            <div>
              <Button
                style={{ float: 'right' }}
                onClick={() => auctionStore.placeBid()}
              >
                  Place Bid
              </Button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default inject(["auctionStore"])(observer(BidModal));
