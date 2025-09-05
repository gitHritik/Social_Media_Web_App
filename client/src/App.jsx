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
import ScrollToTop from './ScrollToTop';
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const Layout = () => {

  const queryClient = new QueryClient()

  return (
    <>
      <ScrollToTop />
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </>
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
