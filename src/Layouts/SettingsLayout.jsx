import React from 'react';
import { Link,NavLink, Outlet, useLocation } from 'react-router-dom';
import { Separator } from '@/Components/ui/separator';
import { buttonVariants } from '@/Components/ui/button';
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    to: "",
  },
  {
    title: "Account",
    to: "account",
  },
  {
    title: "Notifications",
    to: "notifications",
  },
  {
    title: "Security & Password",
    to: "security",
  },
];

function SettingsLayout() {
  const location = useLocation();

  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <img
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
            <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
              {sidebarNavItems.map(item => (
                <NavLink
                  key={item.to} 
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    cn(
                      buttonVariants({ variant: "ghost" }),
                      isActive
                        ? "bg-muted hover:bg-muted hover:text-[#7547c0] text-[#7547c0]"
                        : "hover:bg-transparent hover:text-[#7547c0] hover:underline",
                      "justify-start"
                    )
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </nav>
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsLayout;