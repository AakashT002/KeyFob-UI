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

  const isDomainSelected = domainId => {
    if (team.domains.length > 0) {
      for (var r = 0; r < team.domains.length; r++) {
        if (team.domains[r].id === domainId) {
          return true;
        }
      }
      return false;
    } else {
      return false;
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
          checked={isDomainSelected(domain.id)}
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
              label={team.id && team.id.length > 0 ? '' : 'New Team Name'}
              value={team.name}
              onChange={value => handleTeamChange(value, index)}
            />
            <SelectField
              id="domain-dropdown"
              label={
                team.domains.length === 0
                  ? 'Assign Domain(s)'
                  : team.domains.length + ' Domains'
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
};

export default TeamForm;
