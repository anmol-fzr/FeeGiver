import { ProfileForm, Separator } from "@/components";
import { stuOnboardSchema } from "@/schema";
import { API } from "@/services";
import { useAuthStore } from "@/store";
import { IReqLogin } from "@/type/req";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const updateCreds = useAuthStore.getState().updateCreds;

type ILoginForm = IReqLogin;

const id = "login_form";
const ProfilePage = () => {
  const navigate = useNavigate();

  const { isLoading, data } = useQuery({
    queryFn: API.PROFILE.GET,
    queryKey: ["PROFILE"],
  });

  const form = useForm<ILoginForm>({
    resolver: zodResolver(stuOnboardSchema),
  });

  useEffect(() => {
    if (data?.data?.details) {
      form.reset(data.data.details);
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationFn: API.AUTH.LOGIN,
    onSuccess(res) {
      const { token } = res.data;

      updateCreds({
        isLogin: true,
        token,
      });

      toast.success(res.message, { id });
      navigate("/");
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
    <div className="space-y-6 w-full ">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Update your profile data. Set your roll number, batch and other
          details.
        </p>
      </div>
      <Separator />
      <ProfileForm
        {...{ form, onSubmit, isPending }}
        buttonText="Update profile"
      />
    </div>
  );
};

export { ProfilePage };
