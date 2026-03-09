"use client";
import { JSX, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconServicemark,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Logo } from "../ui/logo";
import { LogoIcon } from "../ui/logo-icon";
import { useLang } from "@/hooks/use-lang";

export function AppSideBar({ children }: { children: JSX.Element }) {
  const { t } = useLang();
  const links = [
    {
      label: t.nav.dashboard,
      url: "dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-blue-700 dark:text-neutral-200" />
      ),
    },
    {
      label: t.nav.profile,
      url: "profile",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-blue-700 dark:text-neutral-200" />
      ),
    },
    {
      label: t.nav.serviceCategories,
      url: "service-categories",
      icon: (
        <IconServicemark className="h-5 w-5 shrink-0 text-blue-700 dark:text-neutral-200" />
      ),
    },
    {
      label: t.nav.settings,
      url: "settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-blue-700 dark:text-neutral-200" />
      ),
    },
    {
      label: t.nav.logout,
      url: "logout",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-blue-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col  border border-blue-200 bg-blue-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        open ? "overflow-hidden" : "",
        "h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                url: "profile",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <MainLayout children={children} />
    </div>
  );
}

const MainLayout = ({
  children,
}: {
  isLoading?: boolean;
  children: JSX.Element;
}) => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 overflow-y-scroll flex-col gap-2 rounded-tl-2xl border border-blue-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        {children}
      </div>
    </div>
  );
};
