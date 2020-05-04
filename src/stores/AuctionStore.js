import { action, observable } from 'mobx';
import Axios from 'axios';
import AuthStore from './AuthStore';
import OverlayStore from './OverlayStore';

const axios = Axios.create({
  baseURL: process.env.REACT_APP_AUCTIONS_ENDPOINT,
});

class AuctionStore {
  @observable auctions = [];
  @observable biddingOn = null;
  @observable bidAmount = 0;

  @action
  async fetchAuctions() {
    try {
      const result = await axios.get('/auctions?status=OPEN', {
        headers: {
          Authorization: AuthStore.token,
        }
      });

      this.auctions = result.data;
    } catch (error) {
      alert('Could not fetch auctions! Check console for more details.');
      console.error(error);
    }

    if (this.biddingOn) {
      this.auctions.forEach(auction => {
        if (auction.id === this.biddingOn.id) {
          this.bidAmount = auction.highestBid.amount + 1;
        }
      });
    }
  }

  @action
  setBiddingOn(auction) {
    this.biddingOn = auction;

    if (auction) {
      this.bidAmount = auction.highestBid.amount + 1;
    } else {
      this.bidAmount = 0;
    }
  }

  @action
  setBidAmount(amount) {
    this.bidAmount = amount;
  }

  @action
  async placeBid() {
    const id = this.biddingOn.id;
    const amount = this.bidAmount;

    OverlayStore.setLoadingSpinner(true);

    try {
      await axios.patch(`/auction/${id}/bid`, { amount }, {
        headers: {
          Authorization: AuthStore.token,
        }
      });
    } catch (error) {
      alert('Could not place bid! Check console for more details.');
      console.error(error);
    }

    this.fetchAuctions();
    this.biddingOn = null;
    this.bidAmount = 0;
    OverlayStore.setLoadingSpinner(false);
  }

  async createAuction(title, pictureBase64) {
    let auctionId;
    OverlayStore.setLoadingSpinner(true);

    try {
      const createAuctionResult = await axios.post('/auction', { title }, {
        headers: {
          Authorization: AuthStore.token,
        }
      });
      
      const auction = createAuctionResult.data;
      auctionId = auction.id;
      
      await axios.patch(`/auction/${auctionId}/picture`, pictureBase64, {
        headers: {
          Authorization: AuthStore.token,
        },
      });
    } catch (error) {
      alert('Could not create auction! Check console for more details.');
      console.error(error);
    }

    OverlayStore.setLoadingSpinner(false);
  }
}

export default new AuctionStore();