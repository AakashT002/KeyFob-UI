import React from 'react';
import PropTypes from 'prop-types';

import { Avatar, TextField } from 'react-md';
import { TableRow, TableColumn } from 'react-md';

import DomainPreview from '../components/DomainPreview';

import '../assets/stylesheets/Domain.css';
import '../assets/stylesheets/DomainPreview.css';
import checkIcon from '../assets/images/checkmark20x20.png';
import editONIcon from '../assets/images/Edit_ON.png';
import editOFFIcon from '../assets/images/Edit_OFF.png';
import infoONIcon from '../assets/images/Info_ON.png';
import infoOFFIcon from '../assets/images/Info_OFF.png';
import saveIcon from '../assets/images/Save.png';
import trashIcon from '../assets/images/TrashCan.png';

const Domain = ({
  clients,
  confirmDelete,
  domainPreview,
  //errorMessage,
  handleChange,
  handleDomainPreviewClose,
  handleDomainPreviewNext,
  handleDomainPreviewPrevious,
  handleIconClick,
  handlePreviewClick,
  index,
  inputRef,
  //isError,
  previewIndex,
  realm,
  roles,
  handleOnSave,
  tabIndexInPreview,
  users,
}) => {
  return (
    <div className="Domain">
      <TableRow>
        <TableColumn>
          <Avatar
            key={realm.id}
            suffix="pink"
            onClick={
              realm.id && realm.id.length > 0
                ? handleIconClick.bind(this, realm.realm)
                : null
            }
          >
            {realm.realm && realm.realm.length > 0
              ? realm.realm.charAt(0).toUpperCase()
              : '?'}
          </Avatar>
        </TableColumn>
        <TableColumn>
          <TextField
            className="md-cell md-cell--bottom Domain__domain-info"
            disabled={
              realm.id && realm.id.length > 0 && realm.realm === 'master'
            }
            id={realm.id}
            value={realm.realm}
            customSize="title"
            placeholder={'Your Domain'}
            ref={index === 0 && realm.id !== undefined ? inputRef : null}
            onChange={value => handleChange(index, value)}
            helpText={
              (clients ? clients.length : 0) +
              ' clients \u2022 ' +
              (roles ? roles.length : 0) +
              ' roles \u2022 ' +
              (users ? users.length : 0) +
              ' users'
            }
          />
        </TableColumn>
        <TableColumn>
          <div className="Domain__domain-buttons1-col">
            <img
              src={realm.isSaved ? checkIcon : saveIcon}
              alt="Save"
              className={
                !realm.isSaved && !realm.isDirty
                  ? 'Domain__buttons Domain__button-save hide'
                  : 'Domain__buttons Domain__button-save'
              }
              onClick={handleOnSave.bind(this, index, realm)}
            />
            <img
              src={realm.id && realm.id.length > 0 ? editONIcon : editOFFIcon}
              alt="Edit"
              className={
                realm.id && realm.id.length > 0
                  ? 'Domain__buttons Domain__button-edit'
                  : 'Domain__buttons Domain__button-edit not-clickable'
              }
              onClick={
                realm.id && realm.id.length > 0
                  ? handleIconClick.bind(this, realm.realm)
                  : null
              }
            />
            <img
              src={realm.id && realm.id.length > 0 ? infoONIcon : infoOFFIcon}
              alt="Preview"
              className={
                realm.id && realm.id.length > 0
                  ? 'Domain__buttons Domain__button-info'
                  : 'Domain__buttons Domain__button-info not-clickable'
              }
              onClick={
                realm.id && realm.id.length > 0
                  ? handlePreviewClick.bind(this, index)
                  : null
              }
            />
            <img
              src={trashIcon}
              alt="Delete"
              className={
                realm.realm === 'master'
                  ? 'Domain__buttons Domain__button-trash not-clickable'
                  : 'Domain__buttons Domain__button-trash'
              }
              onClick={
                confirmDelete &&
                (realm.realm !== 'master' ||
                  (realm.realm === 'master' && realm.id === ''))
                  ? confirmDelete.bind(this, index)
                  : null
              }
            />
          </div>
        </TableColumn>
      </TableRow>
      {index === previewIndex && (
        <DomainPreview
          index={index}
          domainPreview={domainPreview}
          handleDomainPreviewClose={handleDomainPreviewClose}
          handleDomainPreviewPrevious={handleDomainPreviewPrevious}
          handleDomainPreviewNext={handleDomainPreviewNext}
          tabIndexInPreview={tabIndexInPreview}
        />
      )}
      <hr className="Domain__divider" />
    </div>
  );
};

Domain.propTypes = {
  clients: PropTypes.array,
  confirmDelete: PropTypes.func,
  domainPreview: PropTypes.object,
  handleChange: PropTypes.func,
  handleDomainPreviewClose: PropTypes.func,
  handleDomainPreviewNext: PropTypes.func,
  handleDomainPreviewPrevious: PropTypes.func,
  handleIconClick: PropTypes.func,
  handlePreviewClick: PropTypes.func,
  handleOnSave: PropTypes.func,
  index: PropTypes.number,
  inputRef: PropTypes.func,
  previewIndex: PropTypes.number,
  realm: PropTypes.object,
  roles: PropTypes.array,
  tabIndexInPreview: PropTypes.number,
  users: PropTypes.array,
};

export default Domain;
