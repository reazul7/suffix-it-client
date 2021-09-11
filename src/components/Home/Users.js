import React, { useState } from "react";
import Navbar from "./Navbar"
import { ImUsers } from "react-icons/im";
import { useForm } from "react-hook-form";
import UserTable from "./UserTable";
import Swal from 'sweetalert2'

const Users = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
  

    const onSubmit = (data, e) => {
      fetch("https://shrouded-headland-78650.herokuapp.com/newUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your Info. saved in Suffix-IT',
            showConfirmButton: false,
            timer: 3000
          })
          e.target.reset();
        }
      }).catch((err) => {
        console.log({err});
      })
    };

    

  return (
    <div>
        <Navbar/>
        <div className="col-md-12 w-4/12 mx-auto">
            <h3 className="flex pt-5 pb-2 justify-center text-2xl">
              <ImUsers className="mt-1"/>
              <h3 className="px-2">User Management</h3>
            </h3>

            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="First Name" {...register("firstName", {required: true, maxLength: 20})} className="border-2 border-current outline-none w-full p-2 mb-1.5"/>
                <span className="text-red-500">{errors.firstName?.type === 'required' && "First name is required"}</span>
                <br/>

                <input type="text" placeholder="Last Name" {...register("lastName", {required: true, maxLength: 20})} className="border-2 border-current outline-none w-full p-2 mb-1.5"/>
                <span className="text-red-500">{errors.lastName?.type === 'required' && "Last name is required"}</span>
                <br/>

                <input type="text" placeholder="Username" {...register("username", {required: true, maxLength: 30})} className="border-2 border-current outline-none w-full p-2 mb-1.5"/>
                <span className="text-red-500">{errors.username?.type === 'required' && "Username name is required"}</span>
                <br/>

                <input type="email" placeholder="Email" {...register("email", {required: true, pattern: {value: /\S+@\S+\.\S+/, message: "Entered value does not match email format"}})} className="border-2 border-current outline-none w-full p-2 mb-1.5"/>
                {errors.email && <span className="text-red-500">This field is required</span>}
                <br/>
                
                <input type="password" placeholder="Password" {...register("password", {required: true})} className="border-2 border-current outline-none w-full p-2 mb-1.5"/>
                {errors.password && <span className="text-red-500">This field is required</span>}

                <input className="outline-none w-full p-2 mb-1.5 text-white bg-black" type="submit" value="Create User" />
            </form>
          </div>
        <UserTable/>
    </div>
  );
};

export default Users;
