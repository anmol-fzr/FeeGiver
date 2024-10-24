import { Link, useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginSchema } from "@/schema/authSchema";
import { API } from "@/services";
import { toast } from "sonner";
import { useAuthStore, useProfileStore } from "@/store";
import { IReqLogin } from "@/type/req";

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
      const { token, isProfileComplete } = res.data;

      updateCreds({ token, isLogin: isProfileComplete });

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              name="email"
              label="Email address"
              placeholder="student@sbsstc.in"
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="*** ***"
            />
            <div className="flex flex-col gap-2">
              <Button type="submit" className="w-full" disabled={isPending}>
                Login
              </Button>
              <p className="text-center">
                Don't have an account?
                <Link
                  to="/auth/signup"
                  className={buttonVariants({
                    variant: "link",
                    className: "!pl-1 !p-0",
                  })}
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { LoginForm };
