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
      className: "hover:text-[#d4eb3a] cursor-pointer",
    },
    {
      path: "/profile",
      icon: <FaUser />,
      label: "Profile",
      className: "hover:text-[#d4eb3a] cursor-pointer",
    },
    {
      path: "/notifications",
      icon: <FaBell />,
      label: "Notification",
      className: "hover:text-[#d4eb3a] cursor-pointer",
    },
    {
      path: "",
      icon: <FaSignOutAlt />,
      label: "Logout",
      className: "hover:text-red-500 cursor-pointer",
    },
  ];

  return (
    <div className="bg-dark min-h-screen w-16 md:w-64 flex flex-col p-3 md:p-6 transition-all duration-300">
      <p className="text-xl text-white font-semibold text-center mb-6 hidden md:block">
        Forum
      </p>
      <p className="text-white font-semibold text-center mb-6 block md:hidden text-lg">
        F
      </p>

      <ul className="space-y-4">
        {menus.map((menu, index) => {
          const isLast = menus.length - 1 === index;
          const activeColor =
            isActive(menu.path) && !isLast ? "text-white" : "text-[#555]";

          const content = (
            <>
              <span className="text-lg flex-shrink-0">{menu.icon}</span>
              <span className="hidden md:inline">{menu.label}</span>
            </>
          );

          return (
            <li
              key={index}
              title={menu.label}
              className={`flex items-center gap-3 justify-center md:justify-start ${activeColor} ${menu.className}`}
            >
              {isLast ? (
                <button
                  onClick={logout}
                  className="flex items-center gap-3 justify-center md:justify-start w-full"
                >
                  {content}
                </button>
              ) : (
                <Link
                  to={menu.path}
                  className="flex items-center gap-3 justify-center md:justify-start w-full"
                >
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
