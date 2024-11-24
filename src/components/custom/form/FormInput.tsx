import { FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { FormError } from "./FormError";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type FormInputProps = InputProps & {
	label: string;
	name: string;
	desc?: string;
	info?: string;
	icon?: any;
};

const FormInput = ({
	label,
	icon: Icon,
	name,
	desc,
	info,
	...props
}: FormInputProps) => {
	const [animate] = useAutoAnimate();

	const { register, formState } = useFormContext();
	const error = formState.errors[name]?.message?.toString();
	//console.log(formState.errors);

	return (
		<div ref={animate} className="flex flex-col gap-2 w-full">
			<FormLabel htmlFor={name} info={info}>
				{label}
			</FormLabel>
			<div className="relative">
				<Input
					{...register(name, { valueAsNumber: props.type === "number" })}
					id={name}
					className={Icon ? "peer ps-9" : ""}
					{...props}
				/>
				{Icon && (
					<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
						<Icon size={16} strokeWidth={2} aria-hidden="true" />
					</div>
				)}
			</div>
			{desc && <FormDescription>{desc}</FormDescription>}
			{error && <FormError>{error}</FormError>}
			<FormMessage />
		</div>
	);
};

export { FormInput };
