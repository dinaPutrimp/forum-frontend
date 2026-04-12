import { FaBell, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import useActiveRoute from "../../hooks/useActiveRoute";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { isActive } = useActiveRoute();
  const { logout } = useAuth();

  const menus = [
    {
      path: "/",
      icon: <FaHome />,
      label: "Home",
      className: "flex items-center gap-3 hover:text-[#d4eb3a] cursor-pointer",
    },
    {
      path: "/profile",
      icon: <FaUser />,
      label: "Profile",
      className: "flex items-center gap-3 hover:text-[#d4eb3a] cursor-pointer",
    },
    {
      path: "/notifications",
      icon: <FaBell />,
      label: "Notification",
      className: "flex items-center gap-3 hover:text-[#d4eb3a] cursor-pointer",
    },
    {
      path: "",
      icon: <FaSignOutAlt />,
      label: "Logout",
      className: "flex items-center gap-3 hover:text-red-500 cursor-pointer",
    },
  ];
  return (
    <div className="w-64 bg-dark p-6 min-h-screen">
      <p className="text-xl text-white font-semibold text-center mb-6">Forum</p>
      <ul className="space-y-4">
        {menus.map((menu, index) => {
          const isLast = menus?.length - 1 === index;
          return (
            <li
              className={`${
                isActive(menu.path) && !isLast ? "text-white" : "text-[#555]"
              } ${menu.className}`}
            >
              <>{menu.icon}</>
              {isLast ? (
                <span onClick={logout}>{menu.label}</span>
              ) : (
                <Link to={menu.path}>{menu.label}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
