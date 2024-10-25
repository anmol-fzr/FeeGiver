import { FC } from "react";
import { Link as RawLink, LinkProps as RawLinkProps } from "react-router-dom";
import { buttonVariants } from "../ui";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type LinkProps = RawLinkProps &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Link: FC<LinkProps> = ({
  className,
  variant = "ghost",
  size,
  asChild = false,
  ...props
}) => {
  return (
    <RawLink
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};
Link.displayName = "Link";

export { Link };
