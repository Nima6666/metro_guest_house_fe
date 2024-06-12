import axios from "axios";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { RxCross2 } from "react-icons/rx";

import documentImg from "/document.png";

export default function VisitorForm({ number }) {
  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(number ? number : "");
  const [image, setImage] = useState("");
  const [documentType, setDocumentType] = useState("citizenship");

  const [address, setAddress] = useState("");

  const [documentID, setDocumentID] = useState("");

  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("documentID", documentID);
    formData.append("gender", gender);

    console.log(formData);

    // try {
    //   const response = await axios.post(
    //     `${import.meta.env.VITE_SERVER}/visitor`,
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       },
    //     }
    //   );
    //   console.log("Image uploaded successfully:", response.data);
    //   if (response.data.success) {
    //     toast(response.data.message);
    //     navigate("/");
    //   }
    // } catch (error) {
    //   console.error("Error uploading image:", error);
    // }
  };

  return (
    <div>
      <form
        className="flex flex-col flex-wrap justify-center items-center p-4"
        onSubmit={handleUpload}
      >
        <h1 className="text-xl font-semibold">Visitor Form</h1>

        <div className="flex">
          <label htmlFor="firstname" className="w-full m-2">
            Firstname
            <input
              className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1 w-full"
              type="text"
              name="firstname"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirst(e.target.value)}
              autoComplete="on"
            />
          </label>
          <label htmlFor="lastname" className="w-full m-2">
            Lastname
            <input
              className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1 w-full"
              type="text"
              name="lastname"
              id="lastname"
              onChange={(e) => setLast(e.target.value)}
              value={lastname}
              autoComplete="on"
            />
          </label>
          <label htmlFor="gender" className="w-full m-2">
            Gender
            <input
              className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1 w-full"
              type="gender"
              name="gender"
              id="gender"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
              autoComplete="on"
            />
          </label>
          <label htmlFor="email" className="w-full m-2">
            Email
            <input
              className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1 w-full"
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="on"
            />
          </label>
          <label htmlFor="phone" className="w-full m-2">
            Phone Number
            <input
              className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1 w-full"
              type="text"
              name="phone"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              autoComplete="on"
            />
          </label>
          <label htmlFor="address" className="w-full m-2">
            Address
            <input
              className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1 w-full"
              type="text"
              name="address"
              id="address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              autoComplete="on"
            />
          </label>
        </div>

        <input
          type="file"
          name="image"
          id="image"
          onChange={handleImageChange}
          className="hidden"
        />
        {image ? (
          <div className=" w-[700px] overflow-hidden h-[400px] flex flex-col justify-center items-center text-center relative rounded-lg my-6">
            <img
              src={URL.createObjectURL(image)}
              alt="avatar"
              className="w-full h-full"
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
            className="cursor-pointer w-[700px] overflow-hidden h-[400px] flex flex-col justify-center items-center text-center relative rounded-lg my-6"
          >
            <div className="absolute z-10 w-full h-full top-0 left-0 flex flex-col justify-center bg-[#00000097] items-center text-xl text-white">
              <FaUpload size={50} className="text-4xl mb-2 z-10" />
              <span>Upload Image</span>
            </div>
            <img
              src={documentImg}
              className="top-0 left-0 w-full h-full object-contain absolute z-0"
              alt=""
            />
            <div></div>
          </label>
        )}
        <div>
          <label htmlFor="docType" className="text-2xl">
            Document Type
          </label>
          <select
            name="docType"
            id="docType"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="text-xl border border-black p-2 rounded-lg ml-4"
          >
            <option value="citizenship">Citizenship</option>
            <option value="liscence">Liscence</option>
            <option value="passport">Passport</option>
          </select>
        </div>
        <label htmlFor="ID" className="w-full flex flex-col items-center">
          Document ID
          <input
            className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1"
            type="text"
            name="ID"
            id="ID"
            onChange={(e) => setDocumentID(e.target.value)}
            value={documentID}
            autoComplete="on"
          />
        </label>

        <button
          type="submit"
          className="rounded-md bg-black text-white p-1 mt-2 self-center w-auto p-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
