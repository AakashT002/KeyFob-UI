import React from 'react';
import PropTypes from 'prop-types';
import { CardActions, SelectField, IconSeparator, Avatar } from 'react-md';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';

import { CLIENT_TYPES } from '../utils/constants';
import 'font-awesome/css/font-awesome.min.css';
import '../assets/stylesheets/ClientForm.css';

const ClientForm = ({
  index,
  client,
  handleFieldChange,
  handleSave,
  validateClientForm,
  isError,
  feedbackMessage,
  showAsSaved,
  inputRef,
  confirmClientDelete,
}) => {
  const renderMessageForClient = () => {
    if (!isError) {
      return (
        <IconSeparator
          label={feedbackMessage}
          iconBefore
          className="ClientForm__register-pass"
        >
          <Avatar
            icon={<i className="material-icons ClientForm__saved-icon">done</i>}
            suffix="white"
          />
        </IconSeparator>
      );
    } else {
      return (
        <IconSeparator
          label={feedbackMessage}
          iconBefore
          className="ClientForm__register-fail"
        >
          <Avatar
            icon={
              <i className="material-icons ClientForm__saved-icon">clear</i>
            }
            suffix="white"
          />
        </IconSeparator>
      );
    }
  };

  return (
    <div className="ClientForm">
      <div className="ClientForm__forms-section">
        <section className="ClientForm__client-section">
          <CardActions className="ClientForm__client--details">
            <TextField
              id="clientId"
              label="Application Name"
              required
              value={client.clientId}
              className="md-cell md-cell--bottom ClientForm__client-name"
              inputClassName="font_size__normal"
              onChange={value => handleFieldChange('clientId', value)}
              ref={index === 0 && client.id !== undefined ? inputRef : null}
            />
            <TextField
              id="rootUrl"
              label="Root URL"
              required
              value={client.rootUrl}
              className="md-cell md-cell--bottom ClientForm__root-url"
              inputClassName="font_size__normal"
              onChange={value => handleFieldChange('rootUrl', value)}
            />
            <SelectField
              id="description"
              label="Application Type"
              required
              className="md-cell ClientForm__select"
              value={client.description}
              menuItems={CLIENT_TYPES}
              onChange={value => handleFieldChange('description', value)}
            />
          </CardActions>
          <CardActions className="ClientForm__bottom-section">
            {showAsSaved === true && renderMessageForClient()}
            <div className="ClientForm__buttons">
              <Button
                flat
                className="ClientForm__save"
                onClick={() => handleSave(index)}
                disabled={
                  !validateClientForm(index) || client.isClientSaved !== false
                }
              >
                SAVE
              </Button>
              <Button
                flat
                className="ClientForm__remove"
                onClick={() => confirmClientDelete(index, client.id)}
              >
                REMOVE
              </Button>
            </div>
          </CardActions>
        </section>
      </div>
    </div>
  );
};

ClientForm.propTypes = {
  index: PropTypes.number,
  client: PropTypes.object,
  handleFieldChange: PropTypes.func,
  handleSave: PropTypes.func,
  validateClientForm: PropTypes.func,
  isClientSaved: PropTypes.bool,
  showAsSaved: PropTypes.bool,
  isError: PropTypes.bool,
  feedbackMessage: PropTypes.string,
  inputRef: PropTypes.func,
  confirmClientDelete: PropTypes.func,
};

export default ClientForm;
