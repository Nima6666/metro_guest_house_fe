import axios from "axios";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { RxCross2 } from "react-icons/rx";

import documentImg from "/document.png";
import { useDispatch } from "react-redux";
import { visitorActions } from "../store/slices/visitorSlice";
import CompanionForm from "./components/companionForm";

export default function VisitorForm({ visitorToEdit, setState, reupload }) {
  console.log("Visitor To Edit ", visitorToEdit);

  const dispatch = useDispatch();

  const { id } = useParams();

  const [companions, setCompaions] = useState([]);

  const [companionForm, setCompanionForm] = useState(false);

  const [firstname, setFirst] = useState(
    visitorToEdit ? visitorToEdit.firstname : ""
  );
  const [lastname, setLast] = useState(
    visitorToEdit ? visitorToEdit.lastname : ""
  );
  const [email, setEmail] = useState(visitorToEdit ? visitorToEdit.email : "");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState(visitorToEdit ? visitorToEdit.phone : "");
  const [image, setImage] = useState(
    visitorToEdit ? visitorToEdit.documentLocation : null
  );
  const [documentType, setDocumentType] = useState(
    visitorToEdit ? visitorToEdit.documentType : "citizenship"
  );

  const [age, setAge] = useState(visitorToEdit ? visitorToEdit.age : "");

  const [address, setAddress] = useState(
    visitorToEdit ? visitorToEdit.address : ""
  );

  const [documentID, setDocumentID] = useState(
    visitorToEdit ? visitorToEdit.documentId : ""
  );

  const [gender, setGender] = useState(
    visitorToEdit ? visitorToEdit.gender : ""
  );
  const [occupation, setOccupation] = useState(
    visitorToEdit ? visitorToEdit.occupation : ""
  );

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
    formData.append("documentId", documentID);
    formData.append("documentType", documentType);
    formData.append("gender", gender);
    formData.append("age", age);
    formData.append("occupation", occupation);

    console.log(formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/visitor`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Image uploaded successfully:", response.data);
      if (response.data.success) {
        toast(response.data.message);
        navigate(`/visitor/${response.data.visitorAdded._id}`);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    console.log("edit", id);

    if (
      !id ||
      !firstname ||
      !lastname ||
      !email ||
      !phone ||
      !address ||
      !gender ||
      !age ||
      !occupation
    ) {
      alert("All fields are required");
      return;
    }

    const formData = {
      firstname,
      lastname,
      email,
      phone,
      address,
      gender,
      age,
      occupation,
    };

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER}/visitor/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response);
      if (response.data.success) {
        toast(response.data.message);
        dispatch(
          visitorActions.setSelectedVisitor(response.data.editedVisitor)
        );
        setState("view");
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function handleReupload(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("documentId", documentID);
    formData.append("documentType", documentType);

    const response = await axios.put(
      `${import.meta.env.VITE_SERVER}/visitor/${id}`,
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
      navigate(`/visitor/${id}`);
    }
  }

  return (
    <div>
      <form
        className="flex flex-col flex-wrap z-10 justify-center items-center p-4 mb-6 bg-gray-200 overflow-hidden rounded-md shadow-lg shadow-gray-400"
        onSubmit={
          visitorToEdit ? handleEdit : reupload ? handleReupload : handleUpload
        }
      >
        <h1 className="text-2xl font-semibold text-center mb-4 px-4 z-10 py-2 relative flex justify-center items-center text-white w-fit">
          {visitorToEdit
            ? "Visitor Edit Form"
            : reupload
            ? "Reupload Document"
            : "Visitor Form"}
          <span className="absolute w-full h-full bg-[#17469E] top-0 left-0 -z-10 skew-x-[15deg]"></span>
        </h1>

        {!reupload && (
          <div className="grid grid-cols-2 gap-2 p-2  w-full ">
            <div className="flex bg-white rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
              <label
                htmlFor="firstname"
                className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
              >
                Firstname
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                className="outline-none py-3 w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                value={firstname}
                onChange={(e) => setFirst(e.target.value)}
                placeholder="Jon"
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
                placeholder="doe"
                autoComplete="off"
              />
            </div>
            <div className="flex bg-white rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
              <label
                htmlFor="room"
                className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
              >
                Room No
              </label>
              <input
                className="outline-none py-3 w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                type="text"
                name="room"
                id="room"
                // onChange={(e) => setAge(e.target.value)}
                // value={age}
                placeholder="Room Number"
                autoComplete="off"
              />
            </div>
            <div className="flex bg-white rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
              <label
                htmlFor="religion"
                className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
              >
                Religion
              </label>
              <input
                className="outline-none py-3 w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                type="text"
                name="religion"
                id="religion"
                // onChange={(e) => setAge(e.target.value)}
                // value={age}
                autoComplete="off"
              />
            </div>

            <div className="flex bg-white rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
              <label
                htmlFor="address"
                className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
              >
                Address
              </label>
              <input
                className="outline-none py-3 w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                type="text"
                name="address"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                autoComplete="off"
              />
            </div>

            <div className="flex bg-white rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
              <label
                htmlFor="age"
                className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
              >
                Age
              </label>
              <input
                className="outline-none py-3 w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                type="age"
                name="age"
                id="age"
                onChange={(e) => setAge(e.target.value)}
                value={age}
                autoComplete="off"
              />
            </div>
            <div className="flex py-2 bg-white rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
              <label
                htmlFor="lastVisitedAddress"
                className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
              >
                Last Visited Address
              </label>
              <input
                className="outline-none py-3 w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                type="text"
                name="lastVisitedAddress"
                id="lastVisitedAddress"
                // onChange={(e) => setAge(e.target.value)}
                // value={age}
                autoComplete="off"
              />
            </div>
            <div className="flex py-2 bg-white rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
              <label
                htmlFor="nextDestination"
                className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
              >
                Next Destination
              </label>
              <input
                className="outline-none py-3 w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                type="text"
                name="nextDestination"
                id="nextDestination"
                // onChange={(e) => setAge(e.target.value)}
                // value={age}
                autoComplete="off"
              />
            </div>

            <div className="flex bg-white rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
              <label
                htmlFor="occupation"
                className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
              >
                Occupation
              </label>
              <input
                className="outline-none py-3 w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                type="text"
                name="occupation"
                id="occupation"
                onChange={(e) => setOccupation(e.target.value)}
                value={occupation}
                autoComplete="off"
              />
            </div>

            <div className="flex py-2 bg-white rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
              <label
                htmlFor="purpose"
                className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
              >
                Purpose Of Visit
              </label>
              <input
                className="outline-none py-3 w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                type="text"
                name="purpose"
                id="purpose"
                // onChange={(e) => setAge(e.target.value)}
                // value={age}
                autoComplete="off"
              />
            </div>

            <div className="flex bg-white rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
              <label
                htmlFor="gender"
                className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
              >
                Gender
              </label>
              <input
                className="outline-none py-3 w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                type="gender"
                name="gender"
                id="gender"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
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

            <div className="flex bg-white rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
              <label
                htmlFor="phone"
                className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
              >
                Phone
              </label>
              <input
                className="outline-none py-3 w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                type="text"
                name="phone"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                autoComplete="off"
              />
            </div>
          </div>
        )}

        {!visitorToEdit && (
          <>
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
                  src={visitorToEdit ? image : URL.createObjectURL(image)}
                  alt="avatar"
                  className="w-full h-full object-contain"
                />
                <div
                  className="right-2 z-10 absolute top-2 rounded-full bg-slate-600 text-white p-2 hover:cursor-pointer"
                  onClick={() => setImage(null)}
                >
                  <RxCross2 size={40} />
                </div>
              </div>
            ) : (
              <label
                htmlFor="image"
                className="cursor-pointer w-full overflow-hidden h-[400px] flex flex-col justify-center items-center text-center relative rounded-lg my-6"
              >
                <div className="absolute z-10 w-full h-full top-0 left-0 flex flex-col justify-center bg-[#00000097] items-center text-xl text-white">
                  <FaUpload size={50} className="text-4xl mb-2 z-10" />
                  <span>Upload Document</span>
                </div>
                <img
                  src={documentImg}
                  className="top-0 left-0 w-full h-full object-contain absolute z-0"
                  alt=""
                />
                <div></div>
              </label>
            )}
            <div className="flex bg-white rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
              <label
                htmlFor="docType"
                className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
              >
                Document Type
              </label>
              <select
                name="docType"
                id="docType"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="text-xl p-2 rounded-lg ml-4"
              >
                <option value="citizenship">Citizenship</option>
                <option value="liscence">Liscence</option>
                <option value="passport">Passport</option>
              </select>
            </div>

            <div className="flex mt-4 bg-white rounded-md justify-start items-center shadow-md shadow-gray-400 overflow-hidden">
              <label
                htmlFor="ID"
                className="text-lg font-semibold mx-2 w-[200px] border-r-2 border-gray-200"
              >
                Document ID
              </label>
              <input
                className="outline-none py-3 w-full h-full transition-all border-white duration-200 border-r-[3px] focus:border-blue-800"
                type="text"
                name="ID"
                id="ID"
                onChange={(e) => setDocumentID(e.target.value)}
                value={documentID}
                autoComplete="off"
              />
            </div>
            <div className="w-full flex flex-col items-center justify-center my-3">
              {companions.length > 0 && (
                <>
                  <h1 className="font-semibold text-xl my-2">Companions</h1>
                  <table>
                    <thead id="companion">
                      <tr>
                        <th>Fullname</th>
                        <th>Relation</th>
                        <th>Age</th>
                        <th>Phone</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companions.map((companion, index) => (
                        <tr key={index}>
                          <td>{companion.fullname}</td>
                          <td>{companion.relation}</td>
                          <td>{companion.age}</td>
                          <td>{companion.phone}</td>
                          <td>
                            <button
                              className="bg-red-600 p-2 rounded-md text-white font-semibold"
                              onClick={(id) => removeCompanion(index)}
                              type="button"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
              {companionForm ? (
                <CompanionForm
                  companions={companions}
                  setCompanions={setCompaions}
                  setCompanionForm={setCompanionForm}
                />
              ) : (
                <button
                  className="bg-slate-600 p-2 rounded-md text-white my-2"
                  type="button"
                  onClick={() => setCompanionForm(true)}
                >
                  Add Companion
                </button>
              )}
            </div>
          </>
        )}

        <button
          type="submit"
          className="rounded-md bg-black text-white mt-2 self-center w-auto p-3 shadow-lg border border-white hover:shadow-md transition-all duration-200 shadow-black"
        >
          {visitorToEdit ? "Submit Edit" : "Submit"}
        </button>
      </form>
    </div>
  );
}
