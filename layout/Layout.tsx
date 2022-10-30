import TheFooter from "@/components/TheFooter";
import TheHeader from "@/components/TheHeader";
import React, { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="">
      <TheHeader />
      <main className="container self-center px-4 mx-auto lg:mx-auto lg:max-w-6xl ">
        {children}
      </main>
      <TheFooter />
    </div>
  );
};

export default Layout;
