import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);

    console.log(formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/users/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col border border-black justify-center items-center w-fit p-4"
        onSubmit={handleUpload}
      >
        <h1 className="text-xl font-semibold">Account Creation Form</h1>

        <label htmlFor="firstname" className="w-full">
          Firstname
          <input
            className="w-full border border-black"
            type="text"
            name="firstname"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirst(e.target.value)}
            autoComplete="on"
          />
        </label>
        <label htmlFor="lastname" className="w-full">
          Lastname
          <input
            className="w-full border border-black"
            type="text"
            name="lastname"
            id="lastname"
            onChange={(e) => setLast(e.target.value)}
            value={lastname}
            autoComplete="on"
          />
        </label>
        <label htmlFor="email" className="w-full">
          Email
          <input
            className="w-full border border-black"
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="on"
          />
        </label>
        <label htmlFor="password" className="w-full">
          Password
          <input
            className="w-full border border-black"
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="on"
          />
        </label>
        <label htmlFor="phone" className="w-full">
          Phone Number
          <input
            className="w-full border border-black"
            type="text"
            name="phone"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            autoComplete="on"
          />
        </label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleImageChange}
        />
        {image && <img src={URL.createObjectURL(image)} alt="avatar" />}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
