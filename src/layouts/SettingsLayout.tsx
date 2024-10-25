import { Outlet } from "react-router-dom";
import { Separator, SettingsSidebar } from "@/components";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const SettingsLayout = () => {
  const [parent] = useAutoAnimate();
  return (
    <div className="space-y-6 w-full">
      <div className="space-y-0.5">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings.</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SettingsSidebar />
        </aside>

        <div className="flex-1 lg:max-w-lg" ref={parent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export { SettingsLayout };
