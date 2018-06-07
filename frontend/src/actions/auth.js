import superagent from 'superagent';
import * as routes from '../routes';
import { deleteCookie } from '../utils/cookie';
import { TOKEN_COOKIE_KEY } from '../constants';

const setToken = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

const removeToken = () => ({
  type: 'TOKEN_REMOVE',
});

const logout = () => {
  deleteCookie(TOKEN_COOKIE_KEY);
  return removeToken();
};

const signupRequest = user => (store) => {
  return superagent.post(`${API_URL}${routes.SIGNUP_ROUTE}`)
    .send(user)
    .withCredentials()
    .then((response) => {
      return store.dispatch(setToken(response.text));
    });
};

const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}${routes.LOGIN_ROUTE}`)
    .auth(user.username, user.password)
    .withCredentials()
    .then((response) => {
      return store.dispatch(setToken(response.text));
    });
};

export { setToken, removeToken, logout, signupRequest, loginRequest };
