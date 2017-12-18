import React from 'react';
import { shallow } from 'enzyme';
import UserWidget from './UserWidget';

describe('Component: UserWidget', () => {
  const spy = jest.fn();
  const user = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    id: '',
    realmRoles: [],
  };
  const roles = [];
  const wrapper = shallow(
    <UserWidget
      user={user}
      roles={roles}
      validateUserForm={spy}
      confirmUserDelete={spy}
    />
  );

  it('renders a proper userwidget css class', () => {
    expect(wrapper.find('.section__user').exists()).toBe(true);
  });

  it('should call delete user function the remove button is clicked', () => {
    const submitButton = wrapper.find('.UserWidget__remove');
    submitButton.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
