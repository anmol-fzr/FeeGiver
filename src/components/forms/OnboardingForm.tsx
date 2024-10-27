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
import { stuOnboardSchema } from "@/schema/authSchema";
import { API } from "@/services";
import { toast } from "sonner";
import { useAuthStore, useProfileStore } from "@/store";
import { IReqOnBoard } from "@/type/req";
import { ProfileForm } from "./ProfileForm";
import { useCallback } from "react";

const updateProfile = useProfileStore.getState().updateProfile;
const updateCreds = useAuthStore.getState().updateCreds;

type ILoginForm = IReqOnBoard;

const id = "onboarding_form";

function OnboardingForm() {
  const navigate = useNavigate();

  const form = useForm<ILoginForm>({
    resolver: zodResolver(stuOnboardSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: API.PROFILE.CREATE,
    onSuccess(res) {
      updateProfile(res.data);
      updateCreds({ isLogin: true });

      toast.success(res.message, { id });
      toast.success("Logged in Successfully");
      navigate("/");
    },
    onError(err) {
      toast.error(err.message, { id });
    },
  });

  const onSubmit = useCallback((values: ILoginForm) => {
    const payload = {};
    Object.keys(values).forEach((key) => {
      payload[key] = values[key].toString();
    });

    mutate(payload);
  }, []);

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Create Profile</CardTitle>
        <CardDescription>Complete your Profile</CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileForm form={form} onSubmit={onSubmit} isPending={isPending} />
      </CardContent>
    </Card>
  );
}

export { OnboardingForm };
