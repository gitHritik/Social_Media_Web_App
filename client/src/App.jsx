import "./App.css";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import { Outlet } from "react-router-dom";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { Navigate } from "react-router-dom";
import { useContext } from 'react';
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from './context/authContext';

const Layout = () => {

  return (
    <div>
      <Navbar />
      <div className="flex">
        <LeftBar />
        <div className="flex-6">
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  );
};



function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
