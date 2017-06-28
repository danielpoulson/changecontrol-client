import React from 'react';
import SelectInput from '../../components/Common/select-input';

type Props = {
  user: string,
  users: mixed[],
  onChange: any,
  newUser: any
};

const UserSelect = ({ user, users, onChange, newUser }: Props) => (
  <div className="cc-user-select-fnStyle">
    <SelectInput
      name="user"
      label="Fullname"
      labelstyle="col-sm-2 control-label cc-user-select-labStyle"
      inputdiv="col-sm-4"
      value={user}
      defaultOption="Select User"
      options={users}
      onChange={onChange}
    />

    <button className="btn btn-info dp-margin-10-LR" onClick={newUser}>
      New User
    </button>

  </div>
);

export default UserSelect;
