import { SettingPage, UpdateProfileForm } from "@/components";

export function ProfilePage() {
	return (
		<SettingPage
			title="Profile"
			desc="Update your profile data. Set your roll number, batch and other details."
		>
			<UpdateProfileForm />
		</SettingPage>
	);
}
