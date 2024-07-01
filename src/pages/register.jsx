import React, { useState } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { FaUpload } from "react-icons/fa";

import avatarImg from "/profile.webp";
import { toast } from "react-toastify";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function Register({ staff, admin, setServerStat, reupload }) {
  // const navigate = useNavigate();
  let navigate = null;

  if (!admin) {
    navigate = useNavigate();
  }

  const { id } = useParams();

  const [firstname, setFirst] = useState(staff ? staff.firstname : "");
  const [lastname, setLast] = useState(staff ? staff.lastname : "");
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState(staff ? staff.email : "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState(staff ? staff.phone : "");
  const [image, setImage] = useState(staff ? staff.imageURL : "");

  const handleImageChange = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("passwords doesnot match");
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);

    console.log(formData);

    try {
      const response = await axios.post(
        admin
          ? `${import.meta.env.VITE_SERVER}/users/admin`
          : `${import.meta.env.VITE_SERVER}/users/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (admin && response.data.success) {
        toast(response.data.message);
        setServerStat(true);
      } else if (response.data.success) {
        toast(response.data.success);
        navigate("/users");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  async function handleEdit(e) {
    e.preventDefault();

    const formData = {
      firstname,
      lastname,
      email,
      phone,
    };

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER}/users/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast(response.data.message);
        navigate("/users");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleReupload(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.put(
      `${import.meta.env.VITE_SERVER}/users/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      toast(response.data.message);
      navigate(`/users/${id}`);
    }
  }

  return (
    <div>
      <form
        className="flex flex-col flex-wrap z-10 justify-center items-center p-4 mb-6 bg-gray-200 overflow-hidden rounded-md shadow-lg shadow-gray-400"
        onSubmit={
          staff ? handleEdit : reupload ? handleReupload : handleRegister
        }
      >
        <h1 className="text-2xl font-semibold text-center mb-4 px-4 z-10 py-2 relative flex justify-center items-center text-white w-fit">
          {staff
            ? "Edit Account Form"
            : reupload
            ? "Reupload Profile Picture"
            : admin
            ? "Admin Account Creation Form"
            : " Account Creation Form"}
          <span className="absolute w-full h-full bg-[#17469E] top-0 left-0 -z-10 skew-x-[15deg]"></span>
        </h1>

        <div className="grid grid-cols-2 gap-2 p-2  w-full ">
          {!reupload && (
            <>
              <div className="flex bg-white rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
                <label
                  htmlFor="firstname"
                  className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
                >
                  Firstname
                </label>
                <input
                  className="outline-none py-3 w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setFirst(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div className="flex bg-white rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
                <label
                  htmlFor="lastname"
                  className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
                >
                  Lastname
                </label>
                <input
                  className="outline-none py-3 w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                  type="text"
                  name="lastname"
                  id="lastname"
                  onChange={(e) => setLast(e.target.value)}
                  value={lastname}
                  autoComplete="off"
                />
              </div>
              <div className="flex bg-white rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
                <label
                  htmlFor="username"
                  className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
                >
                  Username
                </label>
                <input
                  className="outline-none py-3 w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                  type="text"
                  name="username"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  autoComplete="off"
                />
              </div>

              <div className="flex bg-white rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
                <label
                  htmlFor="email"
                  className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
                >
                  Email
                </label>
                <input
                  className="outline-none py-3 w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  autoComplete="off"
                />
              </div>

              {!staff && (
                <>
                  <div className="flex bg-white rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
                    <label
                      htmlFor="password"
                      className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
                    >
                      Password
                    </label>
                    <input
                      className="outline-none py-3 w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                      type="password"
                      name="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      autoComplete="off"
                    />
                  </div>

                  <div className="flex bg-white py-3 rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
                    <label
                      htmlFor="confirmPassword"
                      className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
                    >
                      Confirm Password
                    </label>
                    <input
                      className="outline-none w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      autoComplete="off"
                    />
                  </div>
                </>
              )}
              <div className="flex bg-white rounded-md py-3 justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
                <label
                  htmlFor="phone"
                  className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
                >
                  Phone Number
                </label>
                <input
                  className="outline-none w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                  type="text"
                  name="phone"
                  id="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  autoComplete="off"
                />
              </div>
            </>
          )}
        </div>
        {!staff && (
          <>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="w-full flex items-center justify-center">
              {image ? (
                <div className=" w-[400px] overflow-hidden h-[400px] flex flex-col justify-center items-center text-center relative rounded-lg my-6">
                  <img
                    src={staff ? image : URL.createObjectURL(image)}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="right-2 z-10 absolute top-2 rounded-full bg-slate-600 text-white p-2 hover:cursor-pointer"
                    onClick={(e) => setImage(null)}
                  >
                    <RxCross2 size={40} />
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="image"
                  className="cursor-pointer w-[400px] overflow-hidden h-[400px] flex flex-col justify-center items-center text-center relative rounded-lg my-6"
                >
                  <div className="absolute z-10 w-full h-full top-0 left-0 flex flex-col justify-center bg-[#00000097] items-center text-xl text-white">
                    <FaUpload size={50} className="text-4xl mb-2 z-10" />
                    <span>Upload Image</span>
                  </div>
                  <img
                    src={avatarImg}
                    className="top-0 left-0 w-full h-full object-contain absolute z-0"
                    alt=""
                  />
                  <div></div>
                </label>
              )}
            </div>
          </>
        )}

        <button
          type="submit"
          className="rounded-md bg-black text-white p-3 mt-2 self-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
