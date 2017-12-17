import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-md';

import '../assets/stylesheets/DomainPreview.css';

const DomainPreview = ({
  index,
  domainPreview,
  handleDomainPreviewClose,
  handleDomainPreviewPrevious,
  handleDomainPreviewNext,
  tabIndexInPreview,
}) => {
  return (
    <div className="DomainPreview DomainPreview--featured">
      <div className="DomainPreview__dialog-box">
        <h2 className="DomainPreview__header">{domainPreview.header}</h2>
        <i
          className="material-icons DomainPreview__button-close"
          onClick={handleDomainPreviewClose}
        >
          &#xE14C;
        </i>
        <ul className="DomainPreview__content">
          {domainPreview.content.map(row => {
            return <li key={row.id}>{row.value}</li>;
          })}
        </ul>
        <div className="DomainPreview__footer">
          <hr className="DomainPreview__divider" />
          <Button
            flat
            disabled={tabIndexInPreview === 0}
            key="back"
            className="DomainPreview__button-prev"
            onClick={
              handleDomainPreviewPrevious &&
              handleDomainPreviewPrevious.bind(this, index)
            }
          >
            Back
          </Button>
          <div className="DomainPreview__dots">
            <div
              className={
                tabIndexInPreview === 0
                  ? 'DomainPreview__dot selected'
                  : 'DomainPreview__dot'
              }
            />
            <div
              className={
                tabIndexInPreview === 1
                  ? 'DomainPreview__dot selected'
                  : 'DomainPreview__dot'
              }
            />
            <div
              className={
                tabIndexInPreview === 2
                  ? 'DomainPreview__dot selected'
                  : 'DomainPreview__dot'
              }
            />
          </div>
          <Button
            flat
            disabled={tabIndexInPreview === 2}
            key="next"
            className="DomainPreview__button-next"
            onClick={
              handleDomainPreviewNext &&
              handleDomainPreviewNext.bind(this, index)
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

DomainPreview.propTypes = {
  index: PropTypes.number,
  domainPreview: PropTypes.object,
  handleDomainPreviewClose: PropTypes.func,
  handleDomainPreviewPrevious: PropTypes.func,
  handleDomainPreviewNext: PropTypes.func,
  tabIndexInPreview: PropTypes.number,
};

export default DomainPreview;
