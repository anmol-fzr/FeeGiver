import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput, FormSelect } from "@/components";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { yearOptions, currBatch, currYear } from "@/utils";
import { Phone, Notebook, Hash } from "lucide-react";

type BaseFormProps<T extends FieldValues> = {
	form: UseFormReturn<T>;
	onSubmit: SubmitHandler<T>;
	isPending: boolean;
	buttonText?: string;
};

/**
 * Form with name, admissionNo, rollNo and batch Fields
 * Used in LoginForm and UpdateProfileForm
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
				<ProfileFormFields />
				<Button type="submit" disabled={isPending}>
					{buttonText}
				</Button>
			</form>
		</Form>
	);
};

const ProfileFormFields = () => {
	return (
		<>
			<FormInput name="name" label="Name" placeholder="Anmol" />
			<FormInput
				icon={Phone}
				name="mobile"
				label="Mobile Number"
				type="tel"
				placeholder="9879879876"
			/>
			<FormInput
				icon={Notebook}
				name="admissionNo"
				label="Admission Number"
				type="number"
				placeholder={`${currYear}****`}
			/>
			<FormInput
				icon={Hash}
				name="rollNo"
				label="Roll Number"
				type="number"
				placeholder={`${currBatch}****`}
			/>
			<FormSelect
				options={yearOptions}
				name="batch"
				label="Batch"
				placeholder="Select Batch"
			/>
		</>
	);
};

export { ProfileForm, ProfileFormFields };
