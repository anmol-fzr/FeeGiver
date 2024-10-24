import { ThemeToggle } from "@/components";
import { useAuthStore } from "@/store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const isLogin = useAuthStore((state) => state.creds.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  return (
    <>
      <div className="absolute top-4 right-4 ">
        <ThemeToggle />
      </div>
      <Outlet />
    </>
  );
};

export { AuthLayout };
