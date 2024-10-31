import { AccountForm } from "@/components";
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

const UpdateAccountForm = () => {
  const navigate = useNavigate();

  const form = useForm<ILoginForm>({
    resolver: zodResolver(stuOnboardSchema),
    disabled: true,
  });

  const { data, isLoading } = useQuery({
    queryFn: API.PROFILE.GET,
    queryKey: ["PROFILE"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!isLoading && data?.data) {
      const payload = data?.data;
      form.reset(payload);
    }
  }, [isLoading]);

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
    <AccountForm
      buttonProps={{
        className: "w-fit",
      }}
      {...{ form, onSubmit, isPending: true }}
      buttonText="Update Account"
    />
  );
};

export { UpdateAccountForm };
