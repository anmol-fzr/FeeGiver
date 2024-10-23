import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

type PageProps = ComponentPropsWithoutRef<"div">;

const Page = (props: PageProps) => {
  const className = cn(
    "flex w-full items-center justify-center px-4",
    props.className,
  );
  return <div {...props} className={className} />;
};

export { Page };
