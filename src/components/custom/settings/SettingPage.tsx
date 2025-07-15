import { ReactNode } from "react";
import { SettingFormHeader, SettingFormHeaderProps } from "./SettingFormHeader";
import { Separator } from "@radix-ui/react-select";

type SettingPageProps = SettingFormHeaderProps & {
	children: ReactNode;
};

export function SettingPage({ children, ...props }: SettingPageProps) {
	return (
		<div className="space-y-6 w-full ">
			<SettingFormHeader {...props} />
			<Separator />
			{children}
		</div>
	);
}
