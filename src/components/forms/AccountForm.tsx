import { Button } from "@/components/ui/button";
import { FormInput, ButtonProps } from "@/components";
import { useFormContext } from "react-hook-form";
import { getRand } from "@/utils";
import { AtSign, SquareAsterisk } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useCountdown } from "@/hooks";
import { useCallback, useEffect } from "react";
import { API } from "@/services";
import { toast } from "sonner";

type BaseFormProps = {
	onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
	isPending: boolean;
	buttonProps?: ButtonProps;
	buttonText?: string;
	isOtpSent?: boolean;
};

/**
 * Form with email and password Field
 * Used in LoginForm and UpdateAccountForm
 **/

const year = new Date().getFullYear();
const rand = getRand(1000, 5000);
const emailPlaceholder = `${year}${rand}@sbsstc.in`;

const AccountForm = ({
	onSubmit,
	isPending,
	buttonText,
	buttonProps,
	isOtpSent = false,
}: BaseFormProps) => {
	const form = useFormContext();
	const [animateRef] = useAutoAnimate();
	const { countdown, restart } = useCountdown(59);

	useEffect(() => {
		if (isOtpSent) {
			restart();
		}
	}, [restart, isOtpSent]);

	const onResendOtp = useCallback(() => {
		restart();
		const { email = "" } = form.getValues();
		if (!email) {
			toast.error("Enter a Valid Email");
		}
		API.AUTH.LOGIN({ email });
	}, [form]);

	return (
		<>
			<form ref={animateRef} onSubmit={onSubmit} className="space-y-4">
				<FormInput
					name="email"
					icon={AtSign}
					label="Email address"
					placeholder={emailPlaceholder}
				/>
				{isOtpSent && (
					<>
						<FormInput
							icon={SquareAsterisk}
							name="otp"
							label="OTP"
							type="number"
							placeholder="123456"
						/>
						<div className="flex justify-between">
							<p>00:{countdown}</p>
							<button
								onClick={onResendOtp}
								type="button"
								disabled={countdown !== 0}
								className="disabled:text-neutral-500"
							>
								Resend OTP
							</button>
						</div>
					</>
				)}
				<div className="space-y-2">
					<Button
						type="submit"
						className="w-full"
						disabled={isPending}
						{...buttonProps}
					>
						{buttonText}
					</Button>
				</div>
			</form>
		</>
	);
};

export { AccountForm };
