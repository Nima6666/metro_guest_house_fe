import { useState } from "react";

export default function VisitorForm() {
  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  const [email, setEmail] = useState("");
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
    // <div>
    //   <h1>Visitor Form</h1>
    //   <form>
    //     <label htmlFor="firstname">
    //       Firstname
    //       <input type="text" name="firstname" id="firstname" />
    //     </label>
    //     <label htmlFor="lastname">
    //       Lastname
    //       <input type="text" name="lastname" id="lastname" />
    //     </label>
    //     <label htmlFor="docType">Document Type</label>
    //     <select name="docType" id="docType">
    //       <option value="citizenship">Citizenship</option>
    //       <option value="liscence">Liscence</option>
    //       <option value="passport">Passport</option>
    //     </select>
    //     <input type="file" name="image" id="image" />
    //   </form>
    // </div>
    <div>
      <form
        className="flex flex-col rounded-md shadow-lg shadow-black justify-center items-center w-fit p-4"
        // onSubmit={handleUpload}
      >
        <h1 className="text-xl font-semibold">Visitor Form</h1>

        <label htmlFor="firstname" className="w-full">
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
        <label htmlFor="lastname" className="w-full">
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
        <label htmlFor="email" className="w-full">
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
        <label htmlFor="phone" className="w-full">
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
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleImageChange}
        />
        <label htmlFor="docType">Document Type</label>
        <select name="docType" id="docType">
          <option value="citizenship">Citizenship</option>
          <option value="liscence">Liscence</option>
          <option value="passport">Passport</option>
        </select>
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="avatar"
            className="h-[300px] w-[300px] object-contain"
          />
        )}
        <button
          type="submit"
          className="rounded-md bg-black text-white p-1 mt-2 w-1/2 self-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
