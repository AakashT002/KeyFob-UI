import React from 'react';
import PropTypes from 'prop-types';
import {
  CardActions,
  TextField,
  Button,
  SelectField,
  Checkbox,
} from 'react-md';
import '../assets/stylesheets/TeamForm.css';

const TeamForm = ({ index, team, domains, handleDomainChange, confirmTeamDelete }) => {
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
            handleDomainChange(value, domain.clientId, domain.id, index)
          }
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
              value={team.name}
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
            <Button className="TeamForm__save" flat>
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
  team: PropTypes.object,
  confirmTeamDelete: PropTypes.func,
  index: PropTypes.number,
  handleDomainChange: PropTypes.func,
  domains: PropTypes.array,
};

export default TeamForm;
