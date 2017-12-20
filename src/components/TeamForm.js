import React from 'react';
import PropTypes from 'prop-types';
import {
  CardActions,
  TextField,
  Button,
  SelectField,
  Checkbox,
  IconSeparator,
  Avatar,
} from 'react-md';
import '../assets/stylesheets/TeamForm.css';

const TeamForm = ({
  team,
  handleTeamChange,
  index,
  validateTeamForm,
  isTeamSaved,
  onTeamSave,
  isErrorForTeam,
  teamFeedbackMessage,
  showAsSaved,
  domains,
  handleDomainChange,
  confirmTeamDelete,
  mappedDomains,
  inputRef,
}) => {
  const renderMessageForTeam = () => {
    if (!isErrorForTeam) {
      return (
        <IconSeparator
          label={teamFeedbackMessage}
          iconBefore
          className="TeamForm__register-pass"
        >
          <Avatar
            icon={<i className="material-icons TeamForm__saved-icon">done</i>}
            suffix="white"
          />
        </IconSeparator>
      );
    } else {
      return (
        <IconSeparator
          label={teamFeedbackMessage}
          iconBefore
          className="TeamForm__register-fail"
        >
          <Avatar
            icon={<i className="material-icons TeamForm__saved-icon">clear</i>}
            suffix="white"
          />
        </IconSeparator>
      );
    }
  };

  const domainList = () => {
    return domains.map((domain, i) => {
      return (
        <Checkbox
          name={domain.clientId}
          id={i}
          label={domain.clientId.substr(0, domain.clientId.indexOf('-'))}
          value={domain.id}
          key={i}
          onChange={value =>
            handleDomainChange(value, domain.clientId, domain.id, index)}
          checked={!!mappedDomains && domain.clientId in mappedDomains}
        />
      );
    });
  };

  return (
    <div className="TeamForm">
      <div className="TeamForm__forms-section">
        <section className="TeamForm__team-section">
          <CardActions className="TeamForm__team--detail" id="TeamForm_div">
            <TextField
              id="team"
              required
              className="md-cell  TeamForm__team-name"
              placeholder="New Team Name"
              value={team.name}
              onChange={value => handleTeamChange(value, index)}
              ref={team.id === undefined ? inputRef : null}
            />
            <SelectField
              id="domain-dropdown"
              label={
                Object.keys(team.mappedDomains).length === 0
                  ? 'Assign Domain(s)'
                  : Object.keys(team.mappedDomains).length + ' Domains'
              }
              required
              className="md-cell TeamForm__select"
              menuItems={domainList()}
            />
          </CardActions>
          <CardActions className="TeamForm__bottom-section">
            {showAsSaved === true && renderMessageForTeam()}
            <Button
              className="TeamForm__save"
              disabled={!validateTeamForm(index) || isTeamSaved === true}
              flat
              onClick={() => onTeamSave(index)}
            >
              SAVE
            </Button>
            <Button
              className="TeamForm__remove"
              flat
              onClick={() => confirmTeamDelete(index, team.id)}
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
  handleTeamChange: PropTypes.func,
  team: PropTypes.object,
  confirmTeamDelete: PropTypes.func,
  index: PropTypes.number,
  validateTeamForm: PropTypes.func,
  isTeamSaved: PropTypes.bool,
  teamFeedbackMessage: PropTypes.string,
  isErrorForTeam: PropTypes.bool,
  showAsSaved: PropTypes.bool,
  onTeamSave: PropTypes.func,
  handleDomainChange: PropTypes.func,
  domains: PropTypes.array,
  mappedDomains: PropTypes.object,
  inputRef: PropTypes.func,
};

export default TeamForm;
