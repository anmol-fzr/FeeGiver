import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput, ButtonProps } from "@/components";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { getRand } from "@/utils";
import { AtSign, SquareAsterisk } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type BaseFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  isPending: boolean;
  buttonProps?: ButtonProps;
  buttonText?: string;
  isOtpSent?: boolean;
};

/**
 * Form with email and password Field
 * Used in LoginForm and UpdateAccountForm
 **/

const year = new Date().getFullYear();
const rand = getRand(1000, 5000);
const emailPlaceholder = `${year}${rand}@sbsstc.in`;

const AccountForm = <T extends FieldValues>({
  form,
  onSubmit,
  isPending,
  buttonText,
  buttonProps,
  isOtpSent = false,
}: BaseFormProps<T>) => {
  const [animateRef] = useAutoAnimate();
  const submit = form.handleSubmit(onSubmit);
  return (
    <Form {...form}>
      <form ref={animateRef} onSubmit={submit} className="space-y-4">
        <FormInput
          name="email"
          icon={AtSign}
          label="Email address"
          placeholder={emailPlaceholder}
        />
        {isOtpSent && (
          <FormInput
            icon={SquareAsterisk}
            name="otp"
            label="OTP"
            type="number"
            placeholder="123456"
          />
        )}
        <div className="space-y-2">
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            {...buttonProps}
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { AccountForm };
