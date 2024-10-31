import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput, FormSelect, FormTextarea, PageHeader } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addFeeSchema } from "@/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "@/store";

const id = "add_fee_form";

const FeeAddPage = () => {
  const isFormOpen = useProfileStore((state) => state.isFormOpen);
  const [parent] = useAutoAnimate();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFormOpen) {
      navigate("/");
    }
  }, [isFormOpen]);

  const { data, isLoading } = useQuery({
    queryKey: ["PROFILE"],
    queryFn: API.PROFILE.GET,
  });

  const form = useForm({
    resolver: zodResolver(addFeeSchema),
  });

  const hostelFeeAmount = form.watch("hostelFeeAmount");
  const haveHostelFee = form.watch("haveHostelFee");

  useEffect(() => {
    if (haveHostelFee === "false") {
      form.setValue("hostelFeeAmount", 0);
      return;
    }
    form.setValue("hostelFeeAmount", undefined);
  }, [haveHostelFee]);

  useEffect(() => {
    if (!isLoading && data?.data) {
      const { rollNo, name, batch } = data?.data;
      const clgYear = new Date().getFullYear() - batch;
      const sem = guessCurrSem(clgYear).toString();
      form.reset({ rollNo, name, sem });
    }
  }, [isLoading]);

  const { mutate, isPending } = useMutation({
    mutationFn: API.FEE.ADD,
    onSuccess(res) {
      toast.success(res.message, { id });
      navigate("/");
    },
    onError(err) {
      console.log(err);
      toast.error(err.message, { id });
    },
  });

  const onSubmit = (values: any) => mutate(values);

  const amnt = form.watch("amount");
  const securityAmount = form.watch("securityAmount");
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
            <FormInput
              name="name"
              disabled
              label="Name"
              placeholder="Rahul"
              info="Name is picked from your Profile Settings"
            />
            <FormInput
              name="rollNo"
              disabled
              label="Roll Number"
              placeholder="*** ***"
              info="Roll Number is picked from your Profile Settings"
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
            {haveHostelFee === "true" && (
              <FormInput
                name="hostelFeeAmount"
                label="Hostel Fee Amount"
                type="number"
                desc={
                  hostelFeeAmount > 0
                    ? convertToWords(hostelFeeAmount) + " Rupees Only"
                    : ""
                }
                placeholder="Hostel Fee Amount"
              />
            )}
            <FormInput
              name="securityAmount"
              label="Security Fee Amount"
              placeholder="5000"
              type="number"
              desc={
                securityAmount > 0
                  ? convertToWords(securityAmount) + " Rupees Only"
                  : ""
              }
            />
            <FormInput
              name="fineAmount"
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
