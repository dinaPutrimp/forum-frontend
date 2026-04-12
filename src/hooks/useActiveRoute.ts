import { useLocation } from "react-router-dom";

const useActiveRoute = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;

  return { isActive, pathname };
};

export default useActiveRoute;
