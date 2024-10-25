import { Separator, SettingFormHeader, UpdateAccountForm } from "@/components";

const AccountPage = () => {
  return (
    <div className="space-y-6 w-full ">
      <SettingFormHeader title="Account" desc="Change your Email & Password." />
      <Separator />
      <UpdateAccountForm />
    </div>
  );
};

export { AccountPage };
