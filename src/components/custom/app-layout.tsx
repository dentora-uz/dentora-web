import { JSX } from "react";
import { AppSideBar } from "./app-side-bar";

function AppLayout({ children }: { children: JSX.Element }) {
  return (
    <AppSideBar >
      {children}
    </AppSideBar>
  );
}

export default AppLayout;
