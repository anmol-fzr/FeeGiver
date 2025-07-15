import { useNavigate } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AccountForm, Form } from "@/components";
import { useMutation } from "@tanstack/react-query";
import { loginSchema } from "@/schema/authSchema";
import { API } from "@/services";
import { toast } from "sonner";
import { useAuthStore } from "@/store";
import { useState } from "react";
import { useZodForm } from "@/hooks";

const updateCreds = useAuthStore.getState().updateCreds;

const id = "login_form";

function LoginForm() {
	const [isOtpSent, setIsOtpSent] = useState(false);
	const navigate = useNavigate();

	const form = useZodForm({
		schema: loginSchema,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: API.AUTH.LOGIN,
		onSuccess(res, vars) {
			if (isOtpSent) {
				updateCreds({ token: res.data.token });

				if (res.data.isNewUser) {
					updateCreds({ authState: "onboarding" });
					navigate(`/auth/signup?email=${vars.email}`);
					return;
				}
				updateCreds({ authState: "logged-in" });
				navigate("/");
				return;
			}
			setIsOtpSent(true);
			toast.success(res.message, { id });
		},
		onError(err) {
			console.log(err);
			toast.error(err.message, { id });
		},
	});

	const onSubmit = form.handleSubmit((values) => {
		mutate(values);
	});

	return (
		<Card className="mx-auto w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<AccountForm
						{...{
							onSubmit,
							isPending,
							buttonText: "Login",
							isOtpSent,
						}}
					/>
				</Form>
			</CardContent>
		</Card>
	);
}

export { LoginForm };
