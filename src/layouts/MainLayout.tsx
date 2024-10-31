import { Navbar, Page } from "@/components";
import { useAuthStore } from "@/store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const isLogin =
    useAuthStore((state) => state.creds.authState) === "logged-in";
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/auth/login");
    }
  }, [isLogin]);

  return (
    <>
      <Navbar />
      <Page>
        <Outlet />
      </Page>
    </>
  );
};

export { MainLayout };
