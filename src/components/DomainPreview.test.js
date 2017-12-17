import React from 'react';
import { shallow } from 'enzyme';

import DomainPreview from './DomainPreview';

describe('Component: DomainPreview', () => {
  const domainPreview = {
    header: 'Clients',
    content: [{id: 1, value: 'master'}]
  };
  const wrapper = shallow(<DomainPreview domainPreview={domainPreview} />);

  it('renders DomainPreview component', () => {
    expect(wrapper.find('.DomainPreview').exists()).toBe(true);
  });

  it('renders DomainPreview dialog box', () => {
    expect(wrapper.find('.DomainPreview__dialog-box').exists()).toBe(true);
  });

  it('renders DomainPreview header', () => {
    expect(wrapper.find('.DomainPreview__header').exists()).toBe(true);
  });

  it('renders DomainPreview close button', () => {
    expect(wrapper.find('.DomainPreview__button-close').exists()).toBe(true);
  });

  it('renders DomainPreview content', () => {
    expect(wrapper.find('.DomainPreview__content').exists()).toBe(true);
  });

  it('renders DomainPreview footer', () => {
    expect(wrapper.find('.DomainPreview__footer').exists()).toBe(true);
  });

  it('renders DomainPreview divider line', () => {
    expect(wrapper.find('.DomainPreview__divider').exists()).toBe(true);
  });

  it('renders DomainPreview previous button', () => {
    expect(wrapper.find('.DomainPreview__button-prev').exists()).toBe(true);
  });

  it('renders DomainPreview dots', () => {
    expect(wrapper.find('.DomainPreview__dots').exists()).toBe(true);
  });

  it('renders DomainPreview dot', () => {
    expect(wrapper.find('.DomainPreview__dot').length).toBe(3);
  });

  it('renders DomainPreview next button', () => {
    expect(wrapper.find('.DomainPreview__button-next').exists()).toBe(true);
  });
});
