import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UpdateUserTable = ({ userInfo }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    fetch(`http://localhost:5000/updateInfo/${userInfo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((status) => {
        if (status) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your data has been deleted",
            showConfirmButton: false,
            timer: 3000,
          });
          setModalIsOpen(false);
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <>
      <button onClick={() => setModalIsOpen(true)}>
        <FaEdit />
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} >
                  <div className="col-md-12 w-4/12 mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)} >
                      <input type="text" placeholder="First Name" defaultValue={userInfo.firstName} {...register("firstName", {required: true, maxLength: 20})} className="border-2 border-current outline-none w-full p-2 mb-1.5"/>
                      <span className="text-red-500">{errors.firstName?.type === 'required' && "First name is required"}</span>
                      <br/>

                      <input type="text" placeholder="Last Name" defaultValue={userInfo.lastName} {...register("lastName", {required: true, maxLength: 20})} className="border-2 border-current outline-none w-full p-2 mb-1.5"/>
                      <span className="text-red-500">{errors.lastName?.type === 'required' && "Last name is required"}</span>
                      <br/>

                      <input type="text" placeholder="Username" defaultValue={userInfo.username} {...register("username", {required: true, maxLength: 30})} className="border-2 border-current outline-none w-full p-2 mb-1.5"/>
                      <span className="text-red-500">{errors.username?.type === 'required' && "Username name is required"}</span>
                      <br/>

                      <input type="email" placeholder="Email" defaultValue={userInfo.email} {...register("email", {required: true, pattern: {value: /\S+@\S+\.\S+/, message: "Entered value does not match email format"}})} className="border-2 border-current outline-none w-full p-2 mb-1.5"/>
                      {errors.email && <span className="text-red-500">This field is required</span>}
                      <br/>
                      
                      <input type="password" placeholder="Password" defaultValue={userInfo.password} {...register("password", {required: true})} className="border-2 border-current outline-none w-full p-2 mb-1.5"/>
                      {errors.password && <span className="text-red-500">This field is required</span>}

                      <input className="outline-none w-full p-2 mb-1.5 text-white bg-black"  type="submit" value="Update User information" />
                    </form>
                    <button className="outline-none w-full p-2 mb-1.5 text-white bg-black" onClick={() => setModalIsOpen(false)}>Close Edit</button>
                  </div>
                </Modal>
    </>
  );
};

export default UpdateUserTable;
