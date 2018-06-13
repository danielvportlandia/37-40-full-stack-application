import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as clientProfileActions from '../../actions/client-profile';
import * as routes from '../../routes';

import autoBind from '../../utils';
import ProfileForm from '../profile-form/profile-form';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };

    autoBind.call(this, Profile);
  }

  handleCreate(profile) {
    this.props.profileCreate(profile)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      });
  }

  handleUpdate(profile) {
    if (!profile.firstName || !profile.location || !profile.account) {
      throw new Error('Invalid Profile');
    }
    this.props.profileUpdate(profile);
    this.setState({ editing: false });
  }

  componentDidMount() {
    this.props.profileFetch()
      .catch(console.error);
  }

  render() {
    const { profile } = this.props;
    let JSXEditing = null;
    let JSXDisplay = null;
    let JSXProfile = null;

    if (profile) {
      JSXEditing = 
      <div>
        <ProfileForm profile={profile} onComplete={this.handleUpdate}/>
        <button onClick={() => this.setState({ editing: false })}>Cancel</button>
      </div>;
      JSXDisplay = 
      <div>
        {/* <img src={profile.avatar}/>
        <h1>{profile.firstName}</h1>
        <h2>{profile.location}</h2>
        <h2>{profile.phoneNumber}</h2>
        <h2>{profile.googleID}</h2> */}
        <button onClick={() => this.setState({ editing: true })}>Edit</button>
      </div>;
      JSXProfile = 
      <div>
        <img src={profile.avatar}/>
        <h1>{profile.firstName}</h1>
        <h2>{profile.location}</h2>
        <h2>{profile.phoneNumber}</h2>
        <h2>{profile.googleID}</h2>
        {this.state.editing ? JSXEditing : JSXDisplay }
      </div>;
    }

    return (
      <div>
        <h1>Profile</h1>
        { profile ? JSXProfile : <ProfileForm onComplete={this.handleCreate}/> }
        {/* <button type='submit' onSubmit={this.handleCreate}>{this.props.profile ? 'update' : 'create'} profile</button> */}
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  history: PropTypes.object,
  profileCreate: PropTypes.func,
  profileUpdate: PropTypes.func,
  profileFetch: PropTypes.func,
};

const mapStateToProps = state => ({
  profile: state.clientProfile,
});

const mapDispatchToProps = dispatch => ({
  profileCreate: profile => dispatch(clientProfileActions.createProfileRequest(profile)),
  profileUpdate: profile => dispatch(clientProfileActions.updateProfileRequest(profile)),
  profileFetch: () => dispatch(clientProfileActions.fetchProfileRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
