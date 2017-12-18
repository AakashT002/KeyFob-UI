import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'react-md/lib/TextFields';
import {
  Button,
  SelectField,
  Checkbox,
  IconSeparator,
  Avatar,
  CardActions,
} from 'react-md';
import '../assets/stylesheets/UserTabContent.css';
import 'font-awesome/css/font-awesome.min.css';

const UserWidget = ({
  index,
  user,
  handleUserFieldChange,
  saveUser,
  roles,
  validateUserForm,
  isUserSaved,
  showAsSaved,
  isErrorForUser,
  UserFeedbackMessage,
  confirmUserDelete,
  inputRef,
  handleRoleChange,
}) => {
  const renderMessageForUser = () => {
    if (!isErrorForUser) {
      return (
        <IconSeparator
          label={UserFeedbackMessage}
          iconBefore
          className="UserWidget__register-pass"
        >
          <Avatar
            icon={<i className="material-icons UserWidget__saved-icon">done</i>}
            suffix="white"
          />
        </IconSeparator>
      );
    } else {
      return (
        <IconSeparator
          label={UserFeedbackMessage}
          iconBefore
          className="UserWidget__register-fail"
        >
          <Avatar
            icon={
              <i className="material-icons UserWidget__saved-icon">clear</i>
            }
            suffix="white"
          />
        </IconSeparator>
      );
    }
  };

  const isRoleSelected = roleId => {
    if (user.realmRoles.length > 0) {
      for (var r = 0; r < user.realmRoles.length; r++) {
        if (user.realmRoles[r].id === roleId) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  };

  const roleChecklist = () => {
    return roles.map((role, i) => {
      return (
        <Checkbox
          name={role.name}
          id={i}
          label={role.name}
          value={role.id}
          key={i}
          onChange={value =>
            handleRoleChange(value, role.name, role.id, index, i)}
          checked={isRoleSelected(role.id)}
        />
      );
    });
  };

  return (
    <div className="dividers__example section__user">
      <div className="user-widget-text-fields">
        <div className="user-attributes">
          <TextField
            id="userName"
            label="Username"
            placeholder="Username"
            disabled={user.id !== undefined && user.id.length > 0}
            required
            value={user.username}
            className="md-cell md-cell--bottom login-form__input half-fields"
            inputClassName="font_size__normal"
            onChange={value => handleUserFieldChange('username', value)}
            ref={index === 0 && user.username !== undefined ? inputRef : null}
          />
          <TextField
            id="email"
            placeholder="email"
            value={user.email}
            className="md-cell md-cell--bottom login-form__input half-fields"
            inputClassName="font_size__normal"
            label="Email Address"
            onChange={value => handleUserFieldChange('email', value)}
          />
        </div>
        <div className="user-attributes">
          <SelectField
            id="role-dropdown"
            label={
              user.realmRoles.length === 0
                ? 'User Roles'
                : user.realmRoles.length + ' Roles'
            }
            className="md-cell md-cell--bottom role-dropdown login-form__input third-fields"
            menuItems={roleChecklist()}
          />
          <TextField
            id="firstName"
            label="First Name"
            placeholder="first Name"
            value={user.firstName}
            className="md-cell md-cell--bottom login-form__input third-fields"
            inputClassName="font_size__normal"
            onChange={value => handleUserFieldChange('firstName', value)}
          />
          <TextField
            id="lastName"
            label="Last Name"
            placeholder="Last Name"
            value={user.lastName}
            className="md-cell md-cell--bottom login-form__input third-fields"
            inputClassName="font_size__normal"
            onChange={value => handleUserFieldChange('lastName', value)}
          />
        </div>
        <CardActions className="UserWidget__buttons">
          {showAsSaved === true && renderMessageForUser()}
          <Button
            className="UserWidget__save"
            label="SAVE"
            onClick={() => saveUser()}
            disabled={!validateUserForm(index) || isUserSaved !== false}
          />
          <Button
            className="UserWidget__remove"
            label="REMOVE"
            onClick={() => confirmUserDelete(index, user.id)}
          />
        </CardActions>
      </div>
    </div>
  );
};

UserWidget.propTypes = {
  handleUserFieldChange: PropTypes.func,
  index: PropTypes.number,
  user: PropTypes.object,
  dispatch: PropTypes.func,
  saveUser: PropTypes.func,
  roles: PropTypes.array,
  validateUserForm: PropTypes.func,
  isUserSaved: PropTypes.bool,
  showAsSaved: PropTypes.bool,
  isErrorForUser: PropTypes.bool,
  UserFeedbackMessage: PropTypes.string,
  confirmUserDelete: PropTypes.func,
  inputRef: PropTypes.func,
  handleRoleChange: PropTypes.func,
  ischecked: PropTypes.bool,
};

export default UserWidget;
