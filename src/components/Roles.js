import React from 'react';
import PropTypes from 'prop-types';
import { CardActions, TextField, Button } from 'react-md';
import '../assets/stylesheets/Roles.css';

const Roles = ({
  handleChange,
  index,
  onRoleSave,
  renderFeedbackMessage,
  roleName,
  roleId,
  isDirty,
  disableButton,
  inputRef,
  confirmRoleDelete,
}) => {
  return (
    <div className="RolesForm">
      <div className="RolesForm__forms-section">
        <section className="RolesForm__role-section">
          <CardActions className="RolesForm__role--detail" id="Roles_div">
            <TextField
              disabled={disableButton === undefined || disableButton === true}
              id="role"
              required
              placeholder="New Role Name"
              value={roleName}
              ref={index === 0 ? inputRef : null}
              onChange={value => handleChange(value, index)}
            />
          </CardActions>
          <div className="Roles__message">
            {isDirty === false ? renderFeedbackMessage(index) : null}
          </div>
          <CardActions className="RolesForm__bottom-section">
            <Button
              className="RolesForm__save"
              disabled={
                roleName === '' ||
                disableButton === undefined ||
                disableButton === true
              }
              flat
              onClick={() => onRoleSave(index)}
            >
              SAVE
            </Button>
            <Button
              className="RolesForm__remove"
              flat
              onClick={() => confirmRoleDelete(index, roleId)}
            >
              REMOVE
            </Button>
          </CardActions>
        </section>
      </div>
    </div>
  );
};

Roles.propTypes = {
  handleChange: PropTypes.func,
  index: PropTypes.number,
  renderFeedbackMessage: PropTypes.func,
  onRoleSave: PropTypes.func,
  roleValid: PropTypes.bool,
  roleName: PropTypes.string,
  roleId: PropTypes.string,
  isDirty: PropTypes.bool,
  disableButton: PropTypes.bool,
  inputRef: PropTypes.func,
  confirmRoleDelete: PropTypes.func,
};

export default Roles;
