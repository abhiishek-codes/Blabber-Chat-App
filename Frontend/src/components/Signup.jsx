import React, { useState } from "react";
import PHidelogo from "../assets/eye.png";
import PShowlogo from "../assets/hidden.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ Setloginstate }) => {
  const [formData, setFormData] = useState({
    name: "",
    uname: "",
    pass: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [eyelogo, Seteyelogo] = useState(true);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return null;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "Blabber");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dz093s3fc/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Upload Success:", data);
      return data.url;
    } catch (error) {
      console.log("Upload Error:", error);
    }
  };

  const handleSignup = async () => {
    const profilePicUrl = await handleUpload();

    // Create a new object based on formData
    let dataToSend = { ...formData };

    // If rofilePicUrl is not null, add it to dataToSend
    if (profilePicUrl) {
      dataToSend.profilePic = profilePicUrl;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        dataToSend
      );
      localStorage.setItem("userInfo", JSON.stringify(await response.data));
      console.log(response.data);
      navigate("/chats"); // Assuming successful signup
    } catch (error) {
      if (error.response) {
        // Server responded with an error
        const { error: responseError } = error.response.data;
        setErrors(
          Array.isArray(responseError)
            ? responseError
            : [{ message: responseError }]
        );
      } else {
        // Request failed before reaching server
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center pb-4">Where great minds blabber</h1>
      <h1 className="text-2xl text-center pb-4">Sign up today.</h1>

      <div className="text-left mx-7 ">
        <div className="px-1">
          <label className="block pb-1 px-1 text-[1.1rem]">Name</label>
          <input
            className="border-2 border-slate-600 rounded-md px-1 w-[100%]  h-[2rem]"
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={handleChange}
          />
          {/* Display name field errors */}
          {errors.map(
            (error, index) =>
              error.field === "name" && (
                <p key={index} className="text-red-600">
                  {error.message}
                </p>
              )
          )}

          <label className="block pt-4 pb-1 px-1 text-[1.1rem]">Username</label>
          <input
            className="border-2 border-slate-600 rounded-md px-1 w-[100%]  h-[2rem]"
            type="text"
            name="uname"
            placeholder="Enter your email"
            value={formData.uname}
            onChange={handleChange}
          />
          {/* Display username field errors */}
          {errors.map(
            (error, index) =>
              error.field === "uname" && (
                <p key={index} className="text-red-600">
                  {error.message}
                </p>
              )
          )}

          <label className="block pt-4 pb-1 px-1 text-[1.1rem]">Password</label>
          <div className="relative">
            <input
              className="border-2 border-slate-600 rounded-md px-1 w-[100%]  h-[2rem]"
              type={eyelogo ? "password" : "text"}
              name="pass"
              placeholder="Enter your Password"
              value={formData.pass}
              onChange={handleChange}
            />
            {/* Eye icon toggle for password */}
            <button
              className={`absolute right-2 top-1 w-[26px] `}
              onClick={() => Seteyelogo(!eyelogo)}
            >
              <img src={eyelogo ? PHidelogo : PShowlogo} alt="/" />
            </button>
          </div>
          {/* Display password field errors */}
          {errors.map(
            (error, index) =>
              error.field === "pass" && (
                <p key={index} className="text-red-600">
                  {error.message}
                </p>
              )
          )}

          <label className="block pt-4 pb-2 px-1 text-[1.1rem]">
            Upload your profile picture
          </label>
          <input type="file" id="img" name="img" accept="image/*" />
        </div>
        {/* Display general errors */}
        {errors.map(
          (error, index) =>
            !error.field && (
              <div key={index} className="text-red-600">
                <p>{error.message}</p>
              </div>
            )
        )}

        <div className="flex flex-col items-center pt-6">
          <button
            className="border px-[4rem] py-[0.3rem] rounded-md bg-green-700 text-white hover:bg-slate-800 transition-all duration-300 mb-5"
            onClick={handleSignup}
          >
            Sign Up
          </button>
          <h2>
            Already Registered :
            <Link to="/login">
              <button
                className="border-b-2 border-black"
                onClick={() => {
                  Setloginstate(true);
                }}
              >
                Login
              </button>
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
