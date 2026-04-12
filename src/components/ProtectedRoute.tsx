import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";

const ProtectedRoute = () => {
  const context = useContext(AuthContext);

  if (context?.loading) {
    return <Spinner />;
  }

  if (!context?.user) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
