import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as authActions from '../../actions/auth';
import AuthForm from '../auth-form/auth-form';
import autoBind from '../../utils';
import * as routes from '../../routes';

class AuthLanding extends React.Component {
  constructor(props) {
    super(props);

    autoBind.call(this, AuthLanding);
  }
  // ----------------------------------------------------------------------------
  // MEMBER FUNCTIONS (METHODS)
  // ----------------------------------------------------------------------------
  handleLogin(user) {
    return this.props.doLogin(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      })
      .catch(console.error);
  }

  handleSignup(user) {
    return this.props.doSignup(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      })
      .catch(console.error);
  }

  // ----------------------------------------------------------------------------
  // LIFE CYCLE HOOKS
  // ----------------------------------------------------------------------------
  render() {
    const rootJSX = <div>
      <h2>WELCOME TO OUR APP!</h2>
      <Link to='/signup'>SIGN UP FOR OUR APP!</Link>
      <Link to='/login'>LOGIN TO OUR APP!</Link>
    </div>;

    const signupJSX = <div>
      <h2>SIGN UP</h2>
      <AuthForm onComplete={this.handleSignup}/>
      <p>Already have an account?</p>
      <Link to='/login'>LOGIN TO OUR APP!</Link>
    </div>;

    const loginJSX = <div>
      <h2>LOGIN</h2>
      <AuthForm type='login' onComplete={this.handleLogin}/>
      <p>Do not have an account?</p>
      <Link to='/signup'>LOGIN TO OUR APP!</Link>
    </div>;

    const { location } = this.props;
    return (
      <div className='authLanding'>
        { location.pathname === routes.ROOT_ROUTE ? rootJSX : undefined }
        { location.pathname === routes.SIGNUP_ROUTE ? signupJSX : undefined }
        { location.pathname === routes.LOGIN_ROUTE ? loginJSX : undefined }                
      </div>
    );
  }
}

AuthLanding.propTypes = {
  doLogin: PropTypes.func,
  doSignup: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  doSignup: user => dispatch(authActions.signupRequest(user)),
  doLogin: user => dispatch(authActions.loginRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLanding);
