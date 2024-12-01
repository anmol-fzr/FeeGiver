import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { IndianRupee, FileDigit } from "lucide-react";
import { FormInput, FormSelect, FormTextarea } from "@/components";
import { addFeeSchema } from "@/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "@/services";
import { toast } from "sonner";
import { semOptions, guessCurrSem, convertToWords } from "@/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "@/components/custom/file-uploader";
import { useProfile } from "@/hooks/useProfile";
import { useZodForm } from "@/hooks";

const id = "add_fee_form";

export function FeeAddForm() {
	const [parent] = useAutoAnimate();
	const navigate = useNavigate();

	const { data: feeTypes, isLoading: isFeeTypeLoading } = useQuery({
		queryKey: ["META", "FEE", "TYPES"],
		queryFn: API.META.FEE_TYPE,
	});

	const { data, isLoading } = useProfile();

	const form = useZodForm({
		schema: addFeeSchema,
	});

	const hostelFeeAmount = form.watch("hostelFeeAmount");

	useEffect(() => {
		if (!isLoading && data?.data) {
			const { rollNo, name, batch } = data?.data;
			const clgYear = new Date().getFullYear() - batch;
			const sem = guessCurrSem(clgYear).toString();
			form.reset({ rollNo, name, sem });
		}
	}, [isLoading, data, form]);

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

	const onSubmit = form.handleSubmit((values) => {
		if (!values.pdf) {
			toast.error("Add SB Collect PDF", {
				description: "SB Collect PDF must be attached",
			});
		}

		values.pdf = values.pdf[0];
		mutate(values);
	});

	const amnt = form.watch("amount");
	const feeType = form.watch("feeType");
	const securityAmount = form.watch("securityAmount");
	const fine = form.watch("fineAmount");

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="flex flex-col gap-4">
				<div
					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
					ref={parent}
				>
					<FormField
						control={form.control}
						name="pdf"
						render={({ field }) => (
							<div className="col-span-1 row-span-3 space-y-2">
								<FormItem className="w-full">
									<FormLabel htmlFor="pdf">SB Collect PDF</FormLabel>
									<FormControl>
										<FileUploader
											value={field.value}
											onValueChange={field.onChange}
											maxFileCount={1}
											maxSize={500 * 1024}
											accept={{
												"application/pdf": [".pdf"],
											}}
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							</div>
						)}
					/>
					<FormInput
						name="name"
						disabled
						label="Name"
						placeholder="Anmol"
						desc="Name is picked from your Profile Settings"
					/>
					<FormInput
						name="rollNo"
						disabled
						label="Roll Number"
						placeholder="224012"
						desc="Roll Number is picked from your Profile Settings"
					/>
					<FormSelect options={semOptions} name="sem" label="Semester" />
					<FormInput
						icon={FileDigit}
						name="sbCollRef"
						label="SB Collect Reference Number"
						placeholder="ABC1231234"
					/>
					<FormInput
						icon={IndianRupee}
						name="amount"
						label="Amount"
						type="number"
						desc={amntToWords(amnt)}
						placeholder="39,999"
					/>
					{!isFeeTypeLoading && (
						<FormSelect
							options={feeTypes?.data}
							name="feeType"
							label="Fee Type"
						/>
					)}
					{feeType === "any_other" && (
						<FormInput
							name="otherFeeType"
							label="Specify Fee Type"
							placeholder="Random Fee"
						/>
					)}

					<FormInput
						icon={IndianRupee}
						name="hostelFeeAmount"
						label="Hostel Fee Amount"
						type="number"
						desc={amntToWords(hostelFeeAmount)}
						placeholder="3,000"
					/>
					<FormInput
						icon={IndianRupee}
						name="securityAmount"
						label="Security Fee Amount"
						placeholder="5,000"
						type="number"
						desc={amntToWords(securityAmount)}
					/>
					<FormInput
						icon={IndianRupee}
						name="fineAmount"
						label="Fine Amount"
						placeholder="500"
						type="number"
						desc={amntToWords(fine)}
					/>
					<FormTextarea name="remarks" label="Remarks" placeholder="" />
				</div>
				<div className="flex flex-col gap-2">
					<Button
						type="submit"
						className="w-full sm:w-fit"
						disabled={isPending}
					>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
}

const amntToWords = (amnt: number) => {
	return amnt > 0 ? convertToWords(amnt) + " Rupees Only" : "";
};
