import { Link } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput, ButtonProps } from "@/components";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { getRand } from "@/utils";

type BaseFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  isPending: boolean;
  buttonProps?: ButtonProps;
  buttonText?: string;
  showSignUp?: boolean;
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
  showSignUp = false,
  buttonProps,
  isOtpSent = false,
}: BaseFormProps<T>) => {
  const submit = form.handleSubmit(onSubmit);
  return (
    <Form {...form}>
      <form onSubmit={submit} className="space-y-4">
        <FormInput
          name="email"
          label="Email address"
          placeholder={emailPlaceholder}
        />
        <FormInput name="otp" label="OTP" type="number" placeholder="123456" />
        <div className="space-y-2">
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            {...buttonProps}
          >
            {buttonText}
          </Button>
          {showSignUp && (
            <p className="text-center">
              Don't have an account?
              <Link
                to="/auth/signup"
                className={buttonVariants({
                  variant: "link",
                  className: "!pl-1 !p-0",
                })}
              >
                Sign Up
              </Link>
            </p>
          )}
        </div>
      </form>
    </Form>
  );
};

export { AccountForm };
