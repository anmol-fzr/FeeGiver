import { ProfileForm } from "@/components";
import { stuOnboardSchema } from "@/schema";
import { API } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { IReqUpdateProfile } from "@/type/req";
import { useProfile } from "@/hooks/useProfile";

const id = "update_profile_form";

const UpdateProfileForm = () => {
	const { data, isLoading } = useProfile();

	const form = useForm({
		resolver: zodResolver(stuOnboardSchema),
	});

	useEffect(() => {
		if (!isLoading && data?.data) {
			const payload = data?.data;
			form.reset(payload);
		}
	}, [isLoading, form, data]);

	const { mutate, isPending } = useMutation({
		mutationFn: API.PROFILE.UPDATE,
		onSuccess(res) {
			toast.success(res.message, { id });
		},
		onError(err) {
			console.log(err);
			toast.error(err.message, { id });
		},
	});

	function onSubmit(data: IReqUpdateProfile) {
		const payload = {} as IReqUpdateProfile;
		Object.keys(form.formState.dirtyFields).forEach((k) => {
			const key = k as keyof IReqUpdateProfile;
			payload[key] = data[key];
		});
		mutate(payload);
	}

	return (
		<ProfileForm
			{...{ form, onSubmit, isPending }}
			buttonText="Update profile"
		/>
	);
};

export { UpdateProfileForm };
