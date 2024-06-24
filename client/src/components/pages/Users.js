import React, { useContext } from "react";
import { GlobalContext } from "../../GlobalContext";

function Users() {
  const data = useContext(GlobalContext);
  const [allUsers] = data.authApi.allUsers;

  return (
    <>
      {allUsers.length > 0 ? (
        <table class="table mt-3">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => {
              return (
                <tr key={user.id}>
                  <th> {user.name}</th>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-5">No Users Found</p>
      )}
    </>
  );
}

export default Users;
