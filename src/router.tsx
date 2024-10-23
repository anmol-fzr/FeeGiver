import { Routes, Route, Outlet } from "react-router-dom";
import { LoginPage } from "./pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Outlet />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export { Router };
