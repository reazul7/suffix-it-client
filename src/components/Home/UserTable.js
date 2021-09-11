import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import UpdateUserTable from "./UpdateUserTable";
import { HiEye, HiEyeOff } from 'react-icons/hi';

const UserTable = () => {
  const [usersInfo, setUsersInfo] = useState([]);
  

  useEffect(() => {
    fetch("https://shrouded-headland-78650.herokuapp.com/allUsers")
      .then((response) => response.json())
      .then((data) => {
        setUsersInfo(data);
      });
  }, [usersInfo]);

  // user delete
  function handleUserDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://shrouded-headland-78650.herokuapp.com/userDelete/${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              const newUserInfo = usersInfo.filter(
                (userInfo) => userInfo._id !== id
              );
              setUsersInfo(newUserInfo);
            }
          })
          .catch((err) => {
            console.log({ err });
          });
      }
    });
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
              <PasswordField usersInfo={usersInfo}/>
              <td class="px-4 py-3">
                <UpdateUserTable userInfo={usersInfo} />{" "}
                <button onClick={() => handleUserDelete(usersInfo._id)} className="bg-red-500 text-white rounded-full p-1">
                  <AiFillDelete/>
                </button>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};


const PasswordField = ({usersInfo}) => {
  const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
    };
    return (
      <td class="px-4 py-3 flex">{passwordShown?(usersInfo.password):"******"} {passwordShown?<HiEyeOff className="mt-1 ml-2 cursor-pointer" onClick={togglePasswordVisiblity}/>:<HiEye className="mt-1 ml-2 cursor-pointer" onClick={togglePasswordVisiblity}/>} </td>
    )
}
export default UserTable;
