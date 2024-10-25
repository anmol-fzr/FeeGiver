import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput, FormSelect } from "@/components";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { Option } from "@/type";
import { formatOrdinals } from "@/lib/utils";

type BaseFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  isPending: boolean;
  buttonText?: string;
};

const year = new Date().getFullYear().toString();
const batch = year.slice(2);

const yearOptions: Option[] = [];

for (let index = 0; index < 4; index++) {
  const bth = (Number(year) - index).toString();
  yearOptions.push({
    label: `${bth}`,
    helper: ` ( ${formatOrdinals(index + 1)} year )`,
    value: bth,
  });
}

/**
 * Form with name, admissionNo, rollNo and batch Fields
 * Used in OnboardingForm and UpdateProfileForm
 **/

const ProfileForm = <T extends FieldValues>({
  form,
  onSubmit,
  isPending,
  buttonText = "Submit",
}: BaseFormProps<T>) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput name="name" label="Name" placeholder="Rahul" />
        <FormInput
          name="mobile"
          label="Mobile Number"
          type="tel"
          placeholder="9879879876"
        />
        <FormInput
          name="admissionNo"
          label="Admission Number"
          type="number"
          placeholder={`${year}****`}
        />
        <FormInput
          name="rollNo"
          label="Roll Number"
          type="number"
          placeholder={`${batch}****`}
        />
        <FormSelect
          options={yearOptions}
          name="batch"
          label="Batch"
          placeholder="Select Batch"
        />
        <Button type="submit" disabled={isPending}>
          {buttonText}
        </Button>
      </form>
    </Form>
  );
};

export { ProfileForm };
