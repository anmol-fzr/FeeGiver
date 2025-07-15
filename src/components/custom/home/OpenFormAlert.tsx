import { Alert, AlertDescription, AlertTitle, Link } from "@/components";

type OpenFormAlertProps = {
	name: string;
};

const OpenFormAlert = ({ name }: OpenFormAlertProps) => {
	return (
		<Alert
			variant="caution"
			className="w-full flex items-end justify-between gap-6 flex-wrap animate-in fade-in mb-10"
		>
			<div>
				<AlertTitle> 📢 Attention {name}!</AlertTitle>
				<AlertDescription>
					<p>
						The university is now accepting fee forms. Don’t miss out—fill out
						your form today!
					</p>
				</AlertDescription>
			</div>
			<Link to="/fee/add" variant="outline">
				Fill Now
			</Link>
		</Alert>
	);
};

export { OpenFormAlert };
