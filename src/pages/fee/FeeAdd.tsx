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
import { FormInput, FormSelect, FormTextarea, PageHeader } from "@/components";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addFeeSchema } from "@/schema";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/services";
import { toast } from "sonner";
import {
	semOptions,
	feeTypeOptions,
	guessCurrSem,
	convertToWords,
} from "@/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "@/store";
import { FileUploader } from "@/components/custom/file-uploader";
import { z } from "zod";
import { useProfile } from "@/hooks/useProfile";

const id = "add_fee_form";

type FormType = z.infer<typeof addFeeSchema>;

const FeeAddPage = () => {
	const isFormOpen = useProfileStore((state) => state.isFormOpen);
	const [parent] = useAutoAnimate();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isFormOpen) {
			navigate("/");
		}
	}, [isFormOpen, navigate]);

	const { data, isLoading } = useProfile();

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
	}, [haveHostelFee, form]);

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

	const onSubmit: SubmitHandler<FormType> = (values) => {
		if (!values.pdf) {
			toast.error("Add SB Collect PDF", {
				description: "SB Collect PDF must be attached",
			});
		}

		values.pdf = values.pdf[0];
		mutate(values);
	};

	const amnt = form.watch("amount");
	const feeType = form.watch("feeType");
	const securityAmount = form.watch("securityAmount");
	const fine = form.watch("fine");

	return (
		<div className="w-full flex flex-col gap-12 pb-6">
			<PageHeader
				title="Add Fee Data"
				desc="Submit your latest paid fees data."
			/>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit, console.log)}
					className="flex flex-col gap-4"
				>
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
										<FormLabel>SB Collect PDF</FormLabel>
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
							placeholder="Rahul"
							info="Name is picked from your Profile Settings"
							desc="Name is picked from your Profile Settings"
						/>
						<FormInput
							name="rollNo"
							disabled
							label="Roll Number"
							placeholder="*** ***"
							info="Roll Number is picked from your Profile Settings"
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
							desc={amnt > 0 ? convertToWords(amnt) + " Rupees Only" : ""}
							placeholder="39,999"
						/>
						<FormSelect
							options={feeTypeOptions}
							name="feeType"
							label="Fee Type"
						/>
						{feeType === "Any Other" && (
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
							desc={
								hostelFeeAmount > 0
									? convertToWords(hostelFeeAmount) + " Rupees Only"
									: ""
							}
							placeholder="3,000"
						/>
						<FormInput
							icon={IndianRupee}
							name="securityAmount"
							label="Security Fee Amount"
							placeholder="5,000"
							type="number"
							desc={
								securityAmount > 0
									? convertToWords(securityAmount) + " Rupees Only"
									: ""
							}
						/>
						<FormInput
							icon={IndianRupee}
							name="fineAmount"
							label="Fine Amount"
							placeholder="500"
							type="number"
							desc={fine > 0 ? convertToWords(fine) + " Rupees Only" : ""}
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
		</div>
	);
};

export { FeeAddPage };
