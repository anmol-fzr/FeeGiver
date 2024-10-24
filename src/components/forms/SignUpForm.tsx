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
import { signUpSchema } from "@/schema/authSchema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/services";
import { toast } from "sonner";
import { useAuthStore } from "@/store";

const updateCreds = useAuthStore.getState().updateCreds;

type FormType = z.infer<typeof signUpSchema>;

const id = "signup_form";

const SignUpForm = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: API.AUTH.SIGNUP,
    onSuccess(res) {
      toast.success(res.message, { id });
      updateCreds({ token: res.data.token });
      navigate("/auth/onboard");
    },
    onError(res) {
      toast.error(res.message, { id });
    },
  });

  const form = useForm<FormType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "ainsa2279@gmail.com",
      password: "Sbs@123#",
      confirmPassword: "Sbs@123#",
    },
  });

  function onSubmit(values: FormType) {
    const payload = {
      email: values.email,
      password: values.password,
    };
    toast.loading("Registering User ...", { id });
    mutate(payload);
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>
          Enter your email below to create a new Account
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
              desc={`Password must contain atleast 1 lowercase, uppercase, number and a special character`}
              placeholder="*** ***"
            />
            <FormInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="*** ***"
            />
            <div className="flex flex-col gap-2">
              <Button type="submit" className="w-full" disabled={isPending}>
                Sign Up
              </Button>
              <p className="text-center">
                Already have an account?
                <Link
                  to="/auth/login"
                  className={buttonVariants({
                    variant: "link",
                    className: "!pl-1 !p-0",
                  })}
                >
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export { SignUpForm };
