import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type FormErrorProps = ComponentPropsWithoutRef<"p">;

const FormError = (props: FormErrorProps) => {
	const className = cn(
		//"text-xs -mt-0.5 !text-red-600 dark:text-red-400",
		"text-xs -mt-0.5 text-destructive-foreground",
		props.className,
	);
	return <p {...props} className={className} />;
};

export { FormError };
