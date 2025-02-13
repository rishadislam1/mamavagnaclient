import axios from "axios";
import {  useState } from "react";
import { BiPhone } from "react-icons/bi";
import { CgPassword } from "react-icons/cg";
import { MdPassword } from "react-icons/md";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../public/config";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AddUserPage = () => {
 
  const [userEmail, setUserEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");

  const handleValueChange = (e)=>{
    setPosition(e.target.value);
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Sorry!",
        text: "Your password and confirm password do not match!",
        icon: "error",
      });
      return;
    }

    // Create form data
    const formData = new FormData();
    formData.append("email", userEmail);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("position", position);
    formData.append("password", password);

    try {
      let url = BASE_URL + "addUser.php";
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Handle successful response
      Swal.fire({
        title: "Success!",
        text: "Profile updated successfully!",
        icon: "success",
      });
    } catch (error) {
      // Handle error
      Swal.fire({
        title: "Error!",
        text: "There was an error updating your profile.",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="input-group-1"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Email
        </label>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          </div>
          <input
            type="text"
            id="input-group-1"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
          />
        </div>
        <label
          htmlFor="website-admin"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </span>
          <input
            type="text"
            id="website-admin"
            className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* phoone */}
        <label
          htmlFor="website-admin"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5"
        >
          Phone
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <BiPhone className="text-2xl" />
          </span>
          <input
            type="text"
            id="website-admin"
            className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="phone number"
          />
        </div>
        {/* position */}
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an option
        </label>
        <select
          value={position}
          onChange={handleValueChange}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" disabled>
            Choose a role
          </option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* new password */}
        <label
          htmlFor="website-admin"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5"
        >
          Password
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <CgPassword className="text-2xl" />
          </span>
          <input
            type="password"
            id="website-admin"
            className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
            name="password"
          />
        </div>
        {/* confirm password */}
        <label
          htmlFor="website-admin"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-5"
        >
          Confirm Password
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <MdPassword className="text-2xl" />
          </span>
          <input
            type="password"
            id="website-admin"
            className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
            name="confirmPassword"
          />
        </div>
        <button
          type="submit"
          className="mt-5 w-full bg-green-500 text-white py-3 rounded-xl"
        >
          Save
        </button>
      </form>
      <div className="my-10 flex justify-center">
        <Link to='/user/allUser' className="bg-green-400 px-10 py-2 rounded-xl text-white hover:bg-transparent hover:border hover:border-green-400 hover:text-black transition-all duration-500">View All Users</Link>
      </div>
    </div>
  );
};

export default AddUserPage;
