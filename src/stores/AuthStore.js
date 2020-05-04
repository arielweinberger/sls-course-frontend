import { observable, action } from 'mobx';

class AuthStore {
  @observable token = null;
  @observable claims;
  @observable email;

  @action
  setToken(token) {
    this.token = token;
    console.log('Token set', token);
  }

  @action
  setClaims(claims) {
    this.claims = claims;
    this.email = claims.email;
  }
}

export default new AuthStore();