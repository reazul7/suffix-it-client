import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import Swal from 'sweetalert2'
import UpdateUserTable from "./UpdateUserTable";


const UserTable = () => {
  const [usersInfo, setUsersInfo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/allUsers")
      .then((response) => response.json())
      .then((data) => {
        setUsersInfo(data);
      });
  }, [usersInfo]);


  // user delete
  function handleUserDelete(id){
    fetch(`http://localhost:5000/userDelete/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Your data has been deleted',
          showConfirmButton: false,
          timer: 3000
        })
        const newUserInfo = usersInfo.filter(userInfo => userInfo._id !== id)
        setUsersInfo(newUserInfo);
      }
    }) 
    .catch((err) => {
      console.log({err})
    })
  }    

  return (
    <div>
      <table class="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
        <tr class="text-left border-b-2 border-gray-300">
          <th class="px-4 py-3">ID</th>
          <th class="px-4 py-3">First Name</th>
          <th class="px-4 py-3">Last Name</th>
          <th class="px-4 py-3">Username</th>
          <th class="px-4 py-3">Email</th>
          <th class="px-4 py-3">Password</th>
          <th class="px-4 py-3">Action</th>
        </tr>

        {usersInfo.length > 0 &&
          usersInfo.map((usersInfo, index) => (
            <tr class="bg-gray-100 border-b border-gray-200">
              <td class="px-4 py-3">{index + 1}</td>
              <td class="px-4 py-3">{usersInfo.firstName}</td>
              <td class="px-4 py-3">{usersInfo.lastName}</td>
              <td class="px-4 py-3">{usersInfo.username}</td>
              <td class="px-4 py-3">{usersInfo.email}</td>
              <td class="px-4 py-3">{usersInfo.password}</td>
              <td class="px-4 py-3">
                
                <UpdateUserTable userInfo={usersInfo}/>


                {" "}
                <button onClick={() => handleUserDelete(usersInfo._id)}>
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default UserTable;
