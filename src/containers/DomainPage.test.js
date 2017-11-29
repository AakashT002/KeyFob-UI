import React from 'react';
import  DomainPage from './DomainPage';
import { mount, shallow } from 'enzyme';
import SessionStorage from '../__mocks__/mockSessionStorage';
import { mockInitialState, mockStore } from '../__mocks__/mockInitialState';
import { Provider } from 'react-redux';

describe('Component: DomainPage', () => {
  window.sessionStorage = new SessionStorage();
  let wrapper;
  beforeEach(() => {
    sessionStorage.setItem('currentdomainName', 'sample domain');
    wrapper = mount(
      <Provider store={mockStore(mockInitialState)}>
        <DomainPage />
      </Provider>
    );
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a proper card class css', () => {
    expect(wrapper.find('.card-centered').exists()).toBe(true);
  });

  it('renders the CLIENTS tab', () => {
    const wrapper = shallow(<DomainPage/>);
    expect(wrapper.find('.DomainPage__clients-tab').prop('label')).toBe('CLIENTS');
    expect(wrapper.find('.DomainPage__clients-tab').exists()).toBe(true);
  });

  it('renders the ROLES tab', () => {
    const wrapper = shallow(<DomainPage/>);
    expect(wrapper.find('.DomainPage__roles-tab').prop('label')).toBe('ROLES');
    expect(wrapper.find('.DomainPage__roles-tab').exists()).toBe(true);
  });

  it('renders the USERS tab', () => {
    const wrapper = shallow(<DomainPage/>);
    expect(wrapper.find('.DomainPage__users-tab').prop('label')).toBe('USERS');
    expect(wrapper.find('.DomainPage__users-tab').exists()).toBe(true);
  });

  it('renders the PLUS button', () => {
    expect(wrapper.find('.DomainPage__plus-icon').exists()).toBe(true);
  });

  it('renders the domain name', () => {
    expect(wrapper.find('.DomainPage__domain-name').text()
  ).toContain('sample domain');
  });

  it('renders the Previous navigation button', () => {
    expect(wrapper.find('.DomainPage__button-prev').exists()).toBe(true);
  });

  it('renders the Next navigation button', () => {
    expect(wrapper.find('.DomainPage__button-next').exists()).toBe(true);
  });

  it('renders the disabled Previous button on clients tab', () => {
    const wrapper = shallow(<DomainPage activeTab={0}/>);
    expect(wrapper.find('.DomainPage__button-prev').props().disabled).toEqual(true);
  });

  it('renders the disabled Next button on users tab', () => {
    const wrapper = shallow(<DomainPage activeTab={1}/>);
    expect(wrapper.find('.DomainPage__button-prev').props().disabled).toEqual(false);
    expect(wrapper.find('.DomainPage__button-next').props().disabled).toEqual(false);
  });

  it('renders the disabled Next button on users tab', () => {
    const wrapper = shallow(<DomainPage activeTab={2}/>);
    expect(wrapper.find('.DomainPage__button-next').props().disabled).toEqual(true);
  });
});