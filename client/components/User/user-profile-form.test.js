import React from 'react';
import { shallow } from 'enzyme';
import UserProfileForm from './user-profile-form';

test('User Profile Form renders correctly', () => {
  const user = {
    id: '588d97a89be9b78bb608692b',
    fullname: 'Daniel Poulson',
    email: 'danielpoulson@icloud.com',
    username: 'danielp',
    role: 'admin'
  };

  const component = shallow(<UserProfileForm errors user={user} />);
  expect(component).toMatchSnapshot();
});
