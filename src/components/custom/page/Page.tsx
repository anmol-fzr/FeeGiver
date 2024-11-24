import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

type PageProps = ComponentPropsWithoutRef<"div">;

const Page = (props: PageProps) => {
	const className = cn(
		"flex w-full items-center justify-center p-4 md:p-10 max-w-theme",
		props.className,
	);
	return <div {...props} className={className} />;
};

export { Page };
