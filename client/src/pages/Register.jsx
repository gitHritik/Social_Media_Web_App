/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: ""
  })

  const [errors, setErrors] = useState(null)

  const handleRegister = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    try {
      const res = await axios.post("http://localhost:8800/auth/api/register", inputs);

    } catch (error) {
      setErrors(error);
    }
  }


  return (
    <div className="h-screen bg-[#c1beff] flex items-center justify-center">
      <div className="w-[57%] min-h-[600px] flex flex-row-reverse bg-white rounded-lg overflow-hidden shadow-lg">
        {/* Left side */}
        <div
          className="flex-1 p-12 flex flex-col gap-8 text-white"
          style={{
            backgroundImage:
              "linear-gradient(rgba(39,11,96,0.5), rgba(39,11,96,0.5)), url('https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-[100px] leading-[100px] font-bold">
            Hrk Social.
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span className="text-sm">Do you have an account?</span>
          <Link to="/login">
            <button className="w-1/2 py-2 bg-white text-purple-800 font-bold rounded-md hover:bg-gray-200 transition">
              Login
            </button>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex-1 p-12 flex flex-col gap-12 justify-center">
          <h1 className="text-3xl font-semibold text-gray-600">Register</h1>
          <form className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Username"
              className="border-b border-gray-300 px-2 py-3 outline-none focus:border-purple-500"
              name="username"
              onChange={(e) => setInputs((prev) => ({ ...prev, username: e.target.value }))}
            />
            <input
              type="email"
              placeholder="Email"
              className="border-b border-gray-300 px-2 py-3 outline-none focus:border-purple-500"
              name="email"
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <input
              type="password"
              placeholder="Password"
              className="border-b border-gray-300 px-2 py-3 outline-none focus:border-purple-500"
              name="password"
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Name"
              className="border-b border-gray-300 px-2 py-3 outline-none focus:border-purple-500"
              name="name"
              onChange={(e) => {
                setInputs((prev) => ({ ...prev, name: e.target.value }))
              }}
            />
            {/* {errors && { errors }} */}
            <button
              type="submit"
              className="w-1/2 py-2 bg-purple-500 text-white font-bold rounded-md hover:bg-purple-600 transition"
              onClick={handleRegister}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
