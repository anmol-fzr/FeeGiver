import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, Form, FormInput } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginSchema } from "@/schema/authSchema";
import { API } from "@/services";
import { toast } from "sonner";
import { useAuthStore, useProfileStore } from "@/store";
import { IReqLogin } from "@/type/req";
import { useState } from "react";
import { getRand } from "@/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const updateCreds = useAuthStore.getState().updateCreds;

type ILoginForm = IReqLogin;

const id = "login_form";

const year = new Date().getFullYear();
const rand = getRand(1000, 5000);
const emailPlaceholder = `${year}${rand}@sbsstc.in`;

function LoginForm() {
  const [animateRef] = useAutoAnimate();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const form = useForm<ILoginForm>({
    resolver: zodResolver(loginSchema),
    //defaultValues: {
    //  email: "ainsa2279@gmail.com",
    //  password: "Sbs@123#",
    //},
  });

  const { mutate, isPending } = useMutation({
    mutationFn: API.AUTH.LOGIN,
    onSuccess(res, vars) {
      if (isOtpSent) {
        updateCreds({ token: res.data.token });

        if (res.data.isNewUser) {
          updateCreds({ authState: "onboarding" });
          navigate(`/auth/signup?email=${vars.email}`);
          return;
        }
        updateCreds({ authState: "logged-in" });
        navigate("/");
        return;
      }
      setIsOtpSent(true);
      toast.success(res.message, { id });
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            ref={animateRef}
          >
            <FormInput
              name="email"
              label="Email address"
              placeholder={emailPlaceholder}
            />
            {isOtpSent && (
              <FormInput
                name="otp"
                label="OTP"
                type="number"
                placeholder="123456"
              />
            )}
            <div className="space-y-2">
              <Button type="submit" className="w-full" disabled={isPending}>
                Login
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { LoginForm };
