import { useForm } from "react-hook-form";
import Select from "react-select";
import { DevTool } from "@hookform/devtools";
import AuthNavbar from "../../components/AuthNavbar";
import {
  LockClosedIcon,
  EnvelopeIcon,
  UserCircleIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import countrycodes from "./../../assets/CountryCodes.json";
import { GraphQLClient, gql } from "graphql-request";
import CryptoJS from "crypto-js";
import { login } from "./../../../feature/Auth/user";
import { load, notload, setProgress } from "../../../feature/Page/loading";
import { notify } from "reapop";
import { useDispatch, useSelector } from "react-redux";

export default function Signup() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.value);
  const auth = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm({
    defaultValues: {
      Name: "",
      Phone: "",
      Email: "",
      Password: "",
    },
    mode:"onBlur"
  });

  // Password Type changer to Hide or Show Password
  const [hidePassoword, setHidePassoword] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const handlePassword = () => {
    if (!hidePassoword) setPasswordType("password");
    else setPasswordType("text");

    setHidePassoword(!hidePassoword);
  };

  // Hashing Password To Be Safe
  //Form Submit Function
  const onSubmit = async (data, event) => {
    event.preventDefault();
    dispatch(setProgress(20));
    const formData = getValues();
    const newPassword = CryptoJS.AES.encrypt(
      formData.Password,
      import.meta.env.VITE_SECRET_KEY
    ).toString();

    // console.log(newPassword)
    // Working wiht Graphql
    // Graph Ql client setup
    const graphQLClient = new GraphQLClient(
      import.meta.env.VITE_HYGRAPH_ENDPOINT,
      {
        headers: {
          authorization: `Bearer ${import.meta.env.VITE_HYGRAPH_TOKEN}`,
        },
      }
    );

    // Mutation Setup
    const mutation = gql`
      mutation customer{
        createCustomer(
          data: {
            name: "${formData.Name}",
            email: "${formData.Email}",
            password: "${newPassword}",
          phoneNumber: [${formData.Phone}]
        }
        ) {
          id
          name
          phoneNumber
          email
        }
      }
      `;
    const publish = gql`
    mutation MyMutation {
      publishCustomer(where: {email: "${formData.Email}"}, to: PUBLISHED) {
        id
        name
        phoneNumber
        email
      }
    }
    `;

    // Calling the mutation Not Using Varaibles
    const NewData = await graphQLClient.request(mutation);
    dispatch(setProgress(30));
    const published = await graphQLClient.request(publish);
    dispatch(setProgress(40));
    // console.table(NewData, published);

    if (NewData && published) {
      dispatch(setProgress(50));
      dispatch(login(NewData.createCustomer));
      navigate("/", { replace: true });
      dispatch(setProgress(85));
      dispatch(
        notify({
          title: "Registration Successfull",
          message: `Welcome ${NewData.createCustomer.name}`,
          status: "success",
        })
      );
      dispatch(setProgress(100));
    } else {
      dispatch(
        notify({
          title: "Some Error Occured",
          message: `Please retry in a minute`,
          status: "error",
        })
      );
      dispatch(setProgress(100));
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500">
      <AuthNavbar />
      <div className="w-1/4 flex flex-col  border-2 rounded-md h-3/4  p-4 m-10 items-center bg-white">
        <div className="flex m-8 flex-col items-center w-full">
          <h1 className="text-3xl font-bold p-2 opacity-80">Signup</h1>
        </div>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 w-2/3"
        >
          <div className="flex flex-col w-full justify-start m-2 ">
            <label className=" font-semibold opacity-90" htmlFor="Name">
              Name
            </label>
            <span className="flex h-8 text-slate-600 w-full space-x-2 items-center">
              <UserCircleIcon className="w-6 h-6 " />
              <input
                className="outline-none w-full"
                type="text"
                placeholder="Type your Name"
                {...register("Name", {
                  required: "Name is required",
                })}
              />
            </span>
            <div className="w-full border my-2"></div>
            <p className="text-red-600 font-semibold">
                {errors.Name?.message}
              </p>
          </div>
          <div className="flex flex-col w-full justify-start m-2 ">
            <label className=" font-semibold opacity-90" htmlFor="Phone">
              Phone Number
            </label>
            <span className="flex h-8 text-slate-600 w-full space-x-2 items-center">
              <DevicePhoneMobileIcon className="w-6 h-6 " />
              <input
                className="outline-none w-full"
                min={0}
                type="number"
                placeholder="Type your Phone Number"
                {...register("Phone", {
                  required: "Phone Number is required",
                })}
              />
            </span>
            <div className="w-full border my-2"></div>
            <p className="text-red-600 font-semibold">
                {errors.Phone?.message}
              </p>
          </div>
          <div className="flex flex-col w-full justify-start m-2 ">
            <label className=" font-semibold opacity-90" htmlFor="Email">
              Email
            </label>
            <span className="flex h-8 text-slate-600 w-full space-x-2 items-center">
              <EnvelopeIcon className="w-6 h-6 " />
              <input
                className="outline-none w-full"
                type="email"
                placeholder="Type your Email"
                {...register("Email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                    message: "Invalid Email",
                  },
                })}
              />
            </span>
            <div className="w-full border my-2"></div>
            <p className="text-red-600 font-semibold">
                {errors.Email?.message}
              </p>
          </div>
          <div className="flex flex-col w-full justify-start m-2 ">
            <label className=" font-semibold opacity-90" htmlFor="Password">
              Password
            </label>
            <span className="flex h-8 text-slate-600 w-full space-x-2 items-center">
              <LockClosedIcon className="w-6 h-6 " />
              <input
                className="outline-none  w-full"
                type={passwordType}
                placeholder="Type your Password"
                {...register("Password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,32}$/i,
                    message: "Invalid Password",
                  },
                })}
              />
              {hidePassoword ? (
                <EyeSlashIcon
                  onClick={handlePassword}
                  className="w-6 h-6 cursor-pointer "
                />
              ) : (
                <EyeIcon
                  onClick={handlePassword}
                  className="w-6 h-6 cursor-pointer "
                />
              )}
            </span>
            <div className="w-full border my-2"></div>
            <p className="text-red-600 font-semibold">
                {errors.Password?.message}
              </p>
          </div>
          <button
            type="submit"
            className="p-2 border w-1/3 self-center rounded-md hover:bg-purple-500"
          >
            Login
          </button>
          <div className="flex flex-col p-10 items-center ">
            <p> or login using</p>
            <Link
              to={"/auth/signin"}
              className="flex justify-center p-1 w-1/3 rounded-md hover:bg-purple-500"
            >
              Signin
            </Link>
          </div>
        </form>
        <DevTool control={control} />
      </div>
    </div>
  );
}
