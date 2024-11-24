import { UpdateProfileForm, Separator, SettingFormHeader } from "@/components";

const ProfilePage = () => {
	return (
		<div className="space-y-6 w-full ">
			<SettingFormHeader
				title="Profile"
				desc="Update your profile data. Set your roll number, batch and other details."
			/>
			<Separator />
			<UpdateProfileForm />
		</div>
	);
};

export { ProfilePage };
