import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils';

const defaultState = {
  firstName: '',
  firstNameDirty: false,
  firstNameError: 'First name is required',

  avatar: '',
  avatarDirty: false,

  phoneNumber: '',
  phoneNumberDirty: false,

  location: '',
  locationDirty: false,
  locationError: 'Location is required',

  googleID: '',
  googleIDDirty: false,
};

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.profile ? props.profile : defaultState;
    autoBind.call(this, ProfileForm);
  }

  handleValidation(name, value) {
    switch (name) {
      case 'firstName':
        if (value === '') {
          return 'First name required';
        }
        return null;

      case 'location':
        if (value === '') {
          return 'Location is required';
        }
        return null;
      
      case 'phoneNumber':
        if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value)) { // eslint-disable-line
          return 'invalid phone number format';
        }
        return null;

      default:
        return null;
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.handleValidation(name, value),
    });
  }

  handleSubmit(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onComplete(this.state);
    
    // if (!this.state.firstNameError && !this.state.locationError) {
    //   this.props.onComplete(this.state);
    //   this.setState(defaultState);
    // } else {
    //   this.setState({
    //     firstNameDirty: true,
    //     locationDirty: true,
    //   });
    // }
  }

  render() {
    return (
      <form className='profileForm' onSubmit={this.handleSubmit}>
        <input
          name='firstName'
          placeholder='first name'
          type='text'
          value={this.state.firstName}
          onChange={this.handleChange}
        />
        <input
          name='avatar'
          placeholder='Profile image'
          type='text'
          value={this.state.avatar}
          onChange={this.handleChange}
        />
        <input
          name='phoneNumber'
          placeholder='Phone number'
          type='text'
          value={this.state.phoneNumber}
          onChange={this.handleChange}
        />
        <input
          name='location'
          placeholder='location'
          type='text'
          value={this.state.location}
          onChange={this.handleChange}
        />
        <input
          name='googleID'
          placeholder='googleID'
          type='text'
          value={this.state.googleID}
          onChange={this.handleChange}
        />
        <button type='submit'>{this.props.profile ? 'update' : 'create'} profile</button>
      </form>
    );
  }
}

ProfileForm.propTypes = {
  onComplete: PropTypes.func,
  profile: PropTypes.object,
};

export default ProfileForm;
