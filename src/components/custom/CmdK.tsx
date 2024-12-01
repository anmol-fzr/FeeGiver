import * as React from "react";
import { Home, IndianRupee, User } from "lucide-react";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";

const opts = [
	{
		icon: Home,
		label: "Home",
		to: "/",
	},
	{
		icon: IndianRupee,
		label: "Add Fee Page",
		to: "/fee/add",
	},
	{
		icon: User,
		label: "Profile",
		to: "/settings/profile",
	},
	{
		icon: User,
		label: "Account",
		to: "/settings/account",
	},
];

export function CmdK() {
	const [open, setOpen] = React.useState(false);
	const navigate = useNavigate();

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				{opts.map(({ icon: Icon, label, to }) => (
					<CommandItem
						onSelect={() => {
							navigate(to);
							setOpen(false);
						}}
					>
						<Icon size={4} fontSize={4} />
						<span>{label}</span>
					</CommandItem>
				))}
			</CommandList>
		</CommandDialog>
	);
}
