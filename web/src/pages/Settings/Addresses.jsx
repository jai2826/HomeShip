import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Addresses = () => {
  const Addresses = useSelector((state) => state.addresses.data);
  console.log(Addresses);
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white p-6">
      <div className="w-full px-10 py-4 flex flex-col">
        <h1 className="text-3xl font-semibold mx-2 w-full bg-gradient-to-r from-cyan-500 via- to-purple-500  p-2 rounded-md ">
          Your Addresses
        </h1>
        <div className="w-full p-4 m-2 border rounded-md flex flex-col space-y-2">
          {Addresses.map((item) => {
            return (
              <div key={item.id} className="border p-2 w-1/2 rounded-md border-black flex relative">
                <p className="text-xl font-semibold mx-2">1.</p>
                <span className="text-xl">
                  <h1>{item.name}</h1>
                  {item.phoneNumber.map(num=>{
                    return <h2 key={num}>{num}</h2>
                  })}
                  <h2>{item.email}</h2>
                  <div className="">
                    {item.address}
                    
                  </div>
                </span>
                <button onClick={()=>navigate('/settings/EditAddresses')} className="absolute right-0 top-0 z-20 m-2 border px-2 py-1 rounded-md hover:bg-indigo-500">
                  Edit
                </button>
              </div>
            );
          })}

          
        </div>
      </div>
    </div>
  );
};

export default Addresses;
