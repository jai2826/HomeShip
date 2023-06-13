import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import AuthNavbar from "../../components/AuthNavbar";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GraphQLClient, gql } from "graphql-request";
import CryptoJS from "crypto-js";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./../../../feature/Auth/user";
import { load, notload, setProgress } from "../../../feature/Page/loading";
import { notify } from "reapop";
import { setCartItems } from "../../../feature/Cart/cart";
import { setFavourite } from "../../../feature/Auth/favourite";
import { setAddresses } from "../../../feature/Auth/Addresses";

export default function Signin() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.value);
  const auth = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const { register, handleSubmit, formState, control } = useForm({
    defaultValues: {
      Email: "",
      Password: "",
    },
    mode: "onBlur",
  });
  const { errors } = formState;

  const [hidePassoword, setHidePassoword] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const handlePassword = () => {
    // Using Reverse Psychology for hide passsword T_T
    if (!hidePassoword) setPasswordType("password");
    else setPasswordType("text");

    setHidePassoword(!hidePassoword);
  };

  // Form Submit Function
  // Decrypting password Hash revcieved from the server
 const onSubmit = async (data, event) => {
    dispatch(setProgress(20));
    event.preventDefault();
    const formData = data;

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
    const query = gql`
      query Myquery {
        customer(where: { email: "${formData.Email}" }) {
          id
          name
          password
          phoneNumber
          email
          favourite {
            id
            product {
              ... on Product {
                id
              }
            }
          }
          addresses {
            id
            email
            name
            phoneNumber
            address
          }
          address
          cart {
            id
            orderItems {
              product {
                images {
                  url
                }
                id
                name
                price
              }
              id
              quantity
              total
            }
          }
        }
      }
    `;

    // Calling the mutation
    const Newdata = await graphQLClient.request(query);
    dispatch(setProgress(40));
    

    if (Newdata.customer === null) {
      dispatch(setProgress(60));
      dispatch(
        notify({
          title: "Invalid Credentials",
          message: `No user with this Email`,
          status: "error",
        })
      );
      dispatch(setProgress(100));
      return;
    }

    const bytes = CryptoJS.AES.decrypt(
      Newdata.customer.password,
      import.meta.env.VITE_SECRET_KEY
    );
    dispatch(setProgress(60));

    const newPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (newPassword === formData.Password) {
      
      dispatch(login(Newdata.customer));
      dispatch(setProgress(80));
      dispatch(setAddresses(Newdata.customer.addresses))
      navigate("/", { replace: true });

      



      dispatch(
        notify({
          title: "Signin Successfull",
          message: `Welcome ${Newdata.customer.name}`,
          status: "success",
        })
      );
      
      if(Newdata.customer.favourite){
        const tempArr = Newdata.customer.favourite.product.map(item=>{
          return item.id
        })
        dispatch(setFavourite({data: tempArr,id: Newdata.customer.favourite.id}))
      }
      if(Newdata.customer.cart !== null){
        dispatch(setCartItems(Newdata.customer.cart));
      }
    } else {
      dispatch(
        notify({
          title: "Invalid Credentials",
          message: "Bad password",
          status: "warning",
        })
      );
    }
    dispatch(setProgress(100));
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500">
        <AuthNavbar />
        <div className="w-1/4 flex flex-col  border-2 rounded-md h-3/4  p-4 m-10 items-center bg-white">
          <div className="flex m-8 flex-col items-center w-full">
            <h1 className="text-3xl font-bold p-2 opacity-80">Signin</h1>
          </div>

          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-2 w-2/3"
          >
            <div className="flex flex-col w-full justify-start m-2 ">
              <label className=" font-semibold opacity-90" htmlFor="Email">
                Email
              </label>
              <span className="flex h-8 text-slate-600 w-full space-x-2 items-center">
                <EnvelopeIcon className="w-6 h-6" />
                <input
                  className="outline-none w-full "
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
                <LockClosedIcon className="w-6 h-6" />
                <input
                  className="outline-none  w-full "
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
                  <EyeIcon
                    onClick={handlePassword}
                    className="w-6 h-6 cursor-pointer"
                  />
                ) : (
                  <EyeSlashIcon
                    onClick={handlePassword}
                    className="w-6 h-6 cursor-pointer"
                  />
                )}
              </span>
              <div className="w-full border my-2"></div>
              <p className="text-red-600 font-semibold">
                {errors.Password?.message}
              </p>
              <Link to={"/"} className="p-1 self-end text-sm">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="p-2 border w-1/3 self-center rounded-md hover:bg-purple-500"
            >
              Login
            </button>
            <div className="flex flex-col p-10 items-center ">
              <p> or Register using</p>
              <Link
                to={"/auth/signup"}
                className="flex p-1 w-1/3 rounded-md hover:bg-purple-500 justify-center"
              >
                Signup
              </Link>
            </div>
          </form>
          <DevTool control={control} />
        </div>
      </div>
    </>
  );
}
