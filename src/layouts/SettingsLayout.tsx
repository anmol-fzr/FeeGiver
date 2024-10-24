import { Link, Outlet, useLocation } from "react-router-dom";
import { Separator, buttonVariants } from "@/components";

import { cn } from "@/lib/utils";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings/profile",
  },
];

const SettingsLayout = () => {
  return (
    <div className="space-y-6 w-full">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings.</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>

        <Separator className="h-full" orientation="vertical" />
        <div className="flex-1 !ml-0 lg:max-w-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { pathname } = useLocation();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export { SettingsLayout };
