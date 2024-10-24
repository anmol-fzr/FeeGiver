import { Link, useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addFeeSchema, loginSchema } from "@/schema";
import { IReqLogin } from "@/type/req";
import { useAuthStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/services";
import { toast } from "sonner";
import { convertToWords } from "@/lib/utils";
import { stopCoverage } from "v8";

const updateCreds = useAuthStore.getState().updateCreds;

type ILoginForm = IReqLogin;
const id = "add_fee_form";

const FeeAddPage = () => {
  const navigate = useNavigate();

  const form = useForm<ILoginForm>({
    resolver: zodResolver(addFeeSchema),
    defaultValues: async () => {
      const { data } = await API.PROFILE.GET();
      const { rollNo, name } = data.details;
      return { sbCollRef: "", amount: 0, rollNo, name };
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: API.AUTH.LOGIN,
    onSuccess(res) {
      toast.success(res.message, { id });
      const { token, isProfileComplete } = res.data;

      updateCreds({ token, isLogin: isProfileComplete });

      if (isProfileComplete) {
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
  const amnt = form.watch("amount");

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormInput
              name="sbCollRef"
              label="SB Collect Reference Number"
              placeholder="ABC1231234"
            />
            <FormInput
              name="amount"
              label="Amount"
              type="number"
              desc={amnt > 0 ? convertToWords(amnt) + " Rupees Only" : ""}
              placeholder="39,999"
            />
            <FormInput
              name="rollNo"
              disabled
              label="Roll Number"
              placeholder="*** ***"
            />
            <FormInput name="name" disabled label="Name" placeholder="Rahul" />
          </div>
          <div className="flex flex-col gap-2">
            <Button type="submit" className="max-w-xs" disabled={isPending}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export { FeeAddPage };
