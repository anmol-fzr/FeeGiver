import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginSchema } from "@/schema/authSchema";
import { API } from "@/services";
import { toast } from "sonner";
import { useAuthStore, useProfileStore } from "@/store";
import { IReqLogin } from "@/type/req";
import { AccountForm } from "./AccountForm";

const updateCreds = useAuthStore.getState().updateCreds;
const updateProfile = useProfileStore.getState().updateProfile;

type ILoginForm = IReqLogin;

const id = "login_form";

function LoginForm() {
  const navigate = useNavigate();

  const form = useForm<ILoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "ainsa2279@gmail.com",
      password: "Sbs@123#",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: API.AUTH.LOGIN,
    onSuccess(res) {
      toast.success(res.message, { id });
      const { token, isProfileComplete, email } = res.data;

      updateCreds({ token, isLogin: isProfileComplete, email });

      if (isProfileComplete) {
        const profile = res.data.details;
        updateProfile(profile);
        navigate("/");
        return;
      }

      toast("Please Complete your Profile before proceeding");
      navigate("/auth/onboard");
    },
    onError(err) {
      console.log(err);
      toast.error(err.message, { id });
    },
  });

  function onSubmit(values: ILoginForm) {
    mutate(values);
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AccountForm
          {...{ form, onSubmit, isPending }}
          buttonText="Login"
          showSignUp
        />
      </CardContent>
    </Card>
  );
}

export { LoginForm };
