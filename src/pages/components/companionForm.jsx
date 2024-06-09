import { useState } from "react";
import { toast } from "react-toastify";

export default function CompanionForm({
  companions,
  setCompanions,
  setCompanionForm,
}) {
  const [fullname, setFullname] = useState("");
  const [relation, setRelation] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

  function addCompanion() {
    const companionToAdd = [...companions];

    if (
      fullname.trim() === "" ||
      relation.trim() === "" ||
      phone.trim() === "" ||
      age.trim() === ""
    ) {
      return toast.error("fields cannot be empty");
    }

    const companionData = {
      fullname: fullname.trim(),
      relation: relation.trim(),
      phone: phone.trim(),
      age: age.trim(),
    };

    companionToAdd.push(companionData);
    console.log(companionToAdd);
    setCompanions(companionToAdd);
    setCompanionForm(false);
  }

  return (
    <>
      <h1 className="font-semibold text-xl">Companion Form</h1>
      <div className="flex items-center justify-center">
        <label htmlFor="fullname" className="flex-1 flex flex-col m-2">
          Full Name
          <input
            className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1"
            type="text"
            name="fullname"
            id="fullname"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            required
          />
        </label>
        <label htmlFor="relation" className="flex-1 flex flex-col m-2">
          Relation
          <input
            className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1"
            type="text"
            name="relation"
            id="relation"
            onChange={(e) => setRelation(e.target.value)}
            value={relation}
            required
          />
        </label>
        <label htmlFor="phone" className="flex-1 flex flex-col m-2">
          Phone
          <input
            className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1"
            type="text"
            name="phone"
            id="phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            onKeyPress={(e) => {
              const isNumber = /[0-9]/.test(e.key);
              if (!isNumber) {
                e.preventDefault();
              }
            }}
            value={phone}
            required
          />
        </label>
        <label htmlFor="age" className="flex-1 flex flex-col m-2">
          Age
          <input
            className="border border-yellow-700 rounded-md transition-all duration-200 focus:outline-none focus:border-green-500 p-1"
            type="text"
            name="age"
            id="age"
            onChange={(e) => {
              setAge(e.target.value);
            }}
            value={age}
            required
          />
        </label>
      </div>
      <div className="w-full">
        <button
          type="button"
          className="bg-green-900 p-2 font-semibold rounded-md text-white"
          onClick={addCompanion}
        >
          add
        </button>
      </div>
    </>
  );
}
