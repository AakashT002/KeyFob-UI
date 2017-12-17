import React from 'react';
import PropTypes from 'prop-types';
import { CardActions, TextField, Button, SelectField } from 'react-md';
import '../assets/stylesheets/TeamForm.css';

const TeamForm = ({ team }) => {
  return (
    <div className="TeamForm">
      <div className="TeamForm__forms-section">
        <section className="TeamForm__team-section">
          <CardActions className="TeamForm__team--detail" id="TeamForm_div">
            <TextField
              //disabled={disableButton === undefined || disableButton === true}
              id="team"
              required
              //label={isDirty ? 'New Team Name' : ''}
              className="md-cell  TeamForm__team-name"
              value={team.name}
              //ref={index === 0 ? inputRef : null}
              //onChange={value => handleTeamChange(value, index)}
            />
            <SelectField
              id="description"
              label="Assign Domain(s)"
              required
              className="md-cell TeamForm__select"
              value=""
              //menuItems={CLIENT_TYPES}
              //onChange={value => handleFieldChange('description', value)}
            />
          </CardActions>
          {/*<div className="Roles__message">
            {isDirty === false ? renderFeedbackMessage(index) : null}
          </div>*/}
          <CardActions className="TeamForm__bottom-section">
            <Button
              className="TeamForm__save"
              /*disabled={
                roleName === '' ||
                disableButton === undefined ||
                disableButton === true
              }*/
              flat
              //onClick={() => onRoleSave(index)}
            >
              SAVE
            </Button>
            <Button
              className="TeamForm__remove"
              flat
              //onClick={() => confirmRoleDelete(index, roleId)}
            >
              REMOVE
            </Button>
          </CardActions>
        </section>
      </div>
    </div>
  );
};

TeamForm.propTypes = {
  team: PropTypes.object,
};

export default TeamForm;
