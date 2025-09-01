import { Link } from "react-router-dom";
import { AuthContext } from './../context/authContext';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const { login } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="h-screen bg-[#c1beff] flex items-center justify-center">
      <div className="w-[57%] min-h-[600px] flex bg-white rounded-lg overflow-hidden shadow-lg">
        {/* Left side */}
        <div
          className="flex-1 p-12 flex flex-col gap-8 text-white"
          style={{
            backgroundImage:
              "linear-gradient(rgba(39,11,96,0.5), rgba(39,11,96,0.5)), url('https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-[100px] leading-[100px] font-bold">
            Hello World.
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span className="text-sm">Don't you have an account?</span>
          <Link to="/register">
            <button className="w-1/2 py-2 bg-white text-purple-800 font-bold rounded-md hover:bg-gray-200 transition">
              Register
            </button>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex-1 p-12 flex flex-col gap-12 justify-center">
          <h1 className="text-3xl font-semibold text-gray-600">Login</h1>
          <form className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Username"
              className="border-b border-gray-300 px-2 py-3 outline-none focus:border-purple-500"
              name="username"
              onChange={(e) => setInputs((prev) => ({ ...prev, username: e.target.value }))}
            />
            <input
              type="password"
              placeholder="Password"
              className="border-b border-gray-300 px-2 py-3 outline-none focus:border-purple-500"
              name="password"
              onChange={(e) => setInputs((prev) => ({ ...prev, password: e.target.value }))}
            />
            <button
              type="submit"
              className="w-1/2 py-2 bg-purple-500 text-white font-bold rounded-md hover:bg-purple-600 transition"
              onClick={handleLogin}

            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
