import { Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignUpPage,
  OnboardingPage,
  NotFoundPage,
  ProfilePage,
  AccountPage,
} from "./pages";
import { HomePage, FeeAddPage } from "./pages";
import { AuthLayout, MainLayout, SettingsLayout } from "./layouts";

const Router = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="onboard" element={<OnboardingPage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="fee/add" element={<FeeAddPage />} />
        <Route path="/settings" element={<SettingsLayout />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="account" element={<AccountPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export { Router };
