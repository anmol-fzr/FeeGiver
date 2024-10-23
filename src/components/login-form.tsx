import { Link } from "react-router-dom";
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
import { loginSchema } from "@/schema/authSchema";
import { z } from "zod";

type FormType = z.infer<typeof loginSchema>;

export function LoginForm() {
  const form = useForm<FormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: FormType) {
    console.log(values);
  }
  console.log(form.formState.errors);

  return (
    <Card className="mx-auto w-full max-w-sm">
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
              placeholder="student@email.in"
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="*** ***"
            />
            <div className="flex flex-col gap-2">
              <Button type="submit" className="w-full">
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
