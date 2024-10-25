import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  FormError,
  FormDescription,
} from "@/components";
import { Option } from "@/type";
import { SelectProps } from "@radix-ui/react-select";
import { useFormContext } from "react-hook-form";
import { Controller } from "react-hook-form";

type FormSelectProps<T> = {
  options: Option<T>[];
  name: string;
  label: string;
  desc?: string;
  placeholder?: string;
};

const FormSelect = <T extends string>({
  label,
  name,
  options,
  desc,
  placeholder,
}: FormSelectProps<T>) => {
  const { control, formState } = useFormContext();
  const error = formState.errors[name]?.message?.toString();

  placeholder ||= `Select ${label}`;

  return (
    <div className="w-full flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, disabled } }) => (
          <Select onValueChange={onChange} {...{ value, disabled }}>
            <SelectTrigger id={name}>
              <SelectValue {...{ placeholder }} />
            </SelectTrigger>
            <SelectContent position="popper">
              {options.map(({ label, value, helper }) => (
                <SelectItem value={value} key={label}>
                  {label}
                  {helper && (
                    <span className="text-muted-foreground">{helper}</span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {desc && <FormDescription>{desc}</FormDescription>}
      {error && <FormError>{error}</FormError>}
    </div>
  );
};

export { FormSelect };
