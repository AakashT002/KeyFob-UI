import React from 'react';
import { shallow } from 'enzyme';

import ManageDomain from './ManageDomain';
import Domain from '../components/Domain';

describe('Component: ManageDomain', () => {
  const dispatchStub = () => {
    return new Promise(() => {});
  };

  let wrapper;
  let domains = [
    { id: 1, realm: 'team-a', clients: ['1', '2'], roles: ['1'], users: ['1'] },
    { id: 2,  realm: 'team-b', clients: ['1'], roles: ['2'], users: ['1', '2', '3'] },
    { id: 3,  realm: 'team-c', clients: ['2'], roles: ['1'], users: ['1', '2'] }];

  beforeEach(() => {
    wrapper = shallow(
      <ManageDomain.WrappedComponent
        dispatch={dispatchStub}
        domainList={domains}
      />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a proper manage domains page', () => {
    expect(wrapper.find('.ManageDomainPage').exists()).toBe(true);
  });

  it('renders a domain name for each domain in the list', () => {
    expect(wrapper.find('.ManageDomainPage__domain-name').exists()).toBe(true);
  });

  it('renders a count of domains', () => {
    expect(wrapper.find('.ManageDomain__domain-text').exists()).toBe(true);
  });

  it('renders a proper card class css', () => {
    expect(wrapper.find('.card-block-centered').exists()).toBe(true);
  });

  it('renders a PLUS button to add a new domain', () => {
    expect(wrapper.find('.ManageDomain__plus-icon').exists()).toBe(true);
  });

  it('renders domains on loading', () => {
    expect(wrapper.find(Domain).length).toBe(3);
  });
});
