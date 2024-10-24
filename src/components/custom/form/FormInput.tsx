import { FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { FormError } from "./FormError";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type FormInputProps = InputProps & {
  label: string;
  name: string;
  desc?: string;
};

const FormInput = ({ label, name, desc, ...props }: FormInputProps) => {
  const [animate] = useAutoAnimate();

  const { register, formState } = useFormContext();
  const error = formState.errors[name]?.message?.toString();

  return (
    <div ref={animate} className="flex flex-col gap-2 w-full">
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input {...register(name)} id={name} {...props} />
      {desc && <FormDescription>{desc}</FormDescription>}
      {error && <FormError>{error}</FormError>}
      <FormMessage />
    </div>
  );
};

export { FormInput };
