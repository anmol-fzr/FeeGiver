import { SettingPage, UpdateProfileForm } from "@/components";

export function AccountPage() {
	return (
		<SettingPage title="Account" desc="Change your Email & Password.">
			<UpdateProfileForm />
		</SettingPage>
	);
}
