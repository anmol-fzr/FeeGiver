import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormLabel } from "@/components/ui/form";
import { FormInput, ProfileFormFields, Tipper } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schema/authSchema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/services";
import { toast } from "sonner";
import { useAuthStore } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components";
import { ShuffleIcon } from "lucide-react";
import { useEffect } from "react";

const updateCreds = useAuthStore.getState().updateCreds;

type FormType = z.infer<typeof signUpSchema>;

const id = "signup_form";
const rand = () => Math.floor(Math.random() * (100 - 1 + 1) + 1);

const getRandAvatar = () => {
  const id = rand();
  const uri = `https://avatar.iran.liara.run/public/${id}`;
  return uri;
};

const SignUpForm = () => {
  const isOnboarding =
    useAuthStore((state) => state.creds.authState) === "onboarding";
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOnboarding) {
      navigate("/auth/login");
    }
  }, [isOnboarding]);

  const { mutate, isPending } = useMutation({
    mutationFn: API.AUTH.SIGNUP,
    onSuccess(res) {
      updateCreds({
        token: res.data.token,
        authState: "logged-in",
      });

      toast.success(res.message, { id });

      navigate("/");
    },
    onError(res) {
      toast.error(res.message, { id });
    },
  });

  const form = useForm<FormType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: searchParams.get("email"),
      avatar: getRandAvatar(),
    },
  });

  function onSubmit(values: FormType) {
    toast.loading("Registering User ...", { id });
    mutate(values);
  }

  const avatar = form.watch("avatar");
  const name = form.watch("email")?.toString()?.slice(0, 2)?.toUpperCase();

  const changeAvatar = () => {
    form.setValue("avatar", getRandAvatar());
  };

  console.log(form.formState.errors);

  return (
    <Card className="mx-auto w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your details below to register yourself on FeeCheckr
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, console.log)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col  gap-4 ">
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-1 relative mx-auto !aspect-square">
                  <Avatar className=" !w-32 !h-32 !aspect-square relative">
                    <AvatarImage
                      src={avatar}
                      alt={name}
                      width={44}
                      className="!z-[8]"
                      height={44}
                    />
                    <AvatarFallback>{name}</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={changeAvatar}
                    className="absolute !z-[10] bottom-0 right-0 rounded-full"
                  >
                    <ShuffleIcon />
                  </Button>
                </div>
                <FormInput
                  name="email"
                  label="Email address"
                  disabled
                  placeholder="student@sbsstc.in"
                />
                <ProfileFormFields />
              </div>
            </div>
            <Button type="submit" className="w-full mt-6" disabled={isPending}>
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export { SignUpForm };
