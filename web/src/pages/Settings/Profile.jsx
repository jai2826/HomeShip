import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';

const Profile = () => {
  const User = useSelector(state=>state.auth.data)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: User.name,
      Email: User.email,
      Mobile_number: User.phone[0],
      Address: User.address,
    },
  });

  
  // console.log(User.address)
  // const handleSubmit = ()=>{

  // }

  return (
    <div className="w-full bg-white p-6">
      <div className="flex w-full px-10 py-4 flex-col">
        <h1 className="text-3xl font-semibold mx-2 w-full bg-gradient-to-r from-cyan-500 via- to-purple-500  p-2 rounded-md ">
          Your Information
        </h1>
        <div className="w-full p-4 m-2 border rounded-md flex">
          <form className="flex w-full flex-col p-8">
            <div className="flex w-full items-center space-x-2 p-2 justify-center ">
              <label htmlFor="name" className="text-xl font-semibold w-1/5">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="h-10 text-xl px-2 outline-none border-b  w-1/2"
                {...register("Name", { required: true, maxLength: 80 })}
              />
            </div>
            <div className="flex w-full items-center space-x-2 p-2 justify-center ">
              <label htmlFor="email" className="text-xl font-semibold w-1/5">
                Email
              </label>
              <input
                id="email"
                type="text"
                className="h-10 text-xl px-2 outline-none border-b  w-1/2"
                {...register("Email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>
            <div className="flex w-full items-center space-x-2 p-2 justify-center ">
              <label htmlFor="number" className="text-xl font-semibold w-1/5">
                Mobile Number
              </label>
              <input
                id="number"
                className="h-10 text-xl px-2 outline-none border-b  w-1/2"
                type="tel"
                {...register("Mobile_number", {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
              />
            </div>
            <div className="flex w-full items-center space-x-2 p-2 justify-center ">
              <label htmlFor="address" className="text-xl font-semibold w-1/5">
                Address
              </label>
              <textarea
                id="address"
                type="text"
                className="h-24 max-h-max text-xl px-2 outline-none border-b  w-1/2"
                {...register("Address", { required: true })}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
