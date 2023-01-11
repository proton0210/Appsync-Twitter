import React from 'react';
import User from './User';

interface UsersProps {
  users: any;
}

function Users({ users }: UsersProps) {
  return (
    <>
      <div>
        {users.map((user: any) => (
          <User user={user} key={user.id} />
        ))}
      </div>
    </>
  );
}

export default Users;
