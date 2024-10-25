import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput, FormSelect, FormTextarea, PageHeader } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addFeeSchema } from "@/schema";
import { IReqLogin } from "@/type/req";
import { useAuthStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/services";
import { toast } from "sonner";
import {
  semOptions,
  feeTypeOptions,
  boolOptions,
  guessCurrSem,
  convertToWords,
} from "@/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const updateCreds = useAuthStore.getState().updateCreds;

type ILoginForm = IReqLogin;
const id = "add_fee_form";

const FeeAddPage = () => {
  const [parent] = useAutoAnimate();
  const navigate = useNavigate();

  const form = useForm<ILoginForm>({
    resolver: zodResolver(addFeeSchema),
    defaultValues: async () => {
      const { data } = await API.PROFILE.GET();
      const { rollNo, name, batch } = data.details;
      const clgYear = new Date().getFullYear() - batch;
      const sem = guessCurrSem(clgYear).toString();

      return { sbCollRef: "", amount: 0, rollNo, name, sem };
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
  const hostelFee = form.watch("hostelFee");
  const securityFee = form.watch("securityFee");
  const fine = form.watch("fine");

  return (
    <div className="w-full flex flex-col gap-12">
      <PageHeader
        title="Add Fee Data"
        desc="Submit your latest paid fees data."
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            ref={parent}
          >
            <FormInput name="name" disabled label="Name" placeholder="Rahul" />
            <FormInput
              name="rollNo"
              disabled
              label="Roll Number"
              placeholder="*** ***"
            />
            <FormSelect options={semOptions} name="sem" label="Semester" />
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
            <FormSelect
              options={feeTypeOptions}
              name="feeType"
              label="Fee Type"
            />
            <FormSelect
              options={boolOptions}
              name="haveHostelFee"
              label="Hostel Fee"
            />
            {form.watch("haveHostelFee") === "true" && (
              <FormInput
                name="hostelFee"
                label="Hostel Fee Amount"
                type="number"
                desc={
                  hostelFee > 0
                    ? convertToWords(hostelFee) + " Rupees Only"
                    : ""
                }
                placeholder="Hostel Fee Amount"
              />
            )}
            <FormInput
              name="securityFee"
              label="Security Fee Amount"
              placeholder="5000"
              type="number"
              desc={
                securityFee > 0
                  ? convertToWords(securityFee) + " Rupees Only"
                  : ""
              }
            />
            <FormInput
              name="fine"
              label="Fine Amount"
              placeholder="500"
              type="number"
              desc={fine > 0 ? convertToWords(fine) + " Rupees Only" : ""}
            />
            <FormTextarea name="remarks" label="Remarks" placeholder="" />
          </div>
          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-fit" disabled={isPending}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export { FeeAddPage };
