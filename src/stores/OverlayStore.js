import { observable, action } from 'mobx';

class OverlayStore {
  @observable displaySpinner = false;

  @action setLoadingSpinner(status) {
    this.displaySpinner = status;
  }
}

export default new OverlayStore();