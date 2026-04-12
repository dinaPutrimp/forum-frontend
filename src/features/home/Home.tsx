import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex min-h-screen">
      <div className="sticky top-0 h-screen flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
