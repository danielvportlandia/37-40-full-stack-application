import superagent from 'superagent';
import * as routes from '../routes';

const setToken = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

const removeToken = () => ({
  type: 'TOKEN_REMOVE',
});

const signupRequest = user => (store) => {
  return superagent.post(`${API_URL}${routes.SIGNUP_ROUTE}`)
    .send(user)
    // .withCredentials()
    .then((response) => {
      return store.dispatch(setToken(response.text));
    });
};

const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}${routes.LOGIN_ROUTE}`)
    .auth(user.username, user.password)
    // .withCredentials()
    .then((response) => {
      return store.dispatch(setToken(response.text));
    });
};

export { setToken, removeToken, signupRequest, loginRequest };
