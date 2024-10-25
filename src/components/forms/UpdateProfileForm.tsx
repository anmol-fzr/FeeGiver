import { ProfileForm } from "@/components";
import { stuOnboardSchema } from "@/schema";
import { API } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const id = "update_profile_form";

const UpdateProfileForm = () => {
  const { data, isLoading } = useQuery({
    queryFn: API.PROFILE.GET,
    queryKey: ["PROFILE"],
  });

  const form = useForm({
    resolver: zodResolver(stuOnboardSchema),
  });

  useEffect(() => {
    if (!isLoading && data?.data?.details) {
      const payload = {};
      for (const [key, value] of Object.entries(data?.data?.details)) {
        payload[key] = value.toString();
      }
      form.reset(payload);
    }
  }, [isLoading]);

  const { mutate, isPending } = useMutation({
    mutationFn: API.PROFILE.UPDATE,
    onSuccess(res) {
      toast.success(res.message, { id });
    },
    onError(err) {
      console.log(err);
      toast.error(err.message, { id });
    },
  });

  // FIX Later
  function onSubmit(values: any) {
    mutate(values);
  }

  return (
    <ProfileForm
      {...{ form, onSubmit, isPending }}
      buttonText="Update profile"
    />
  );
};

export { UpdateProfileForm };
