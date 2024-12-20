import React from "react";
import { usePathname } from "next/navigation";

const AppBar = () => {
  const pathname = usePathname();

  const title = pathname.split("/")[1];

  return (
    <header className="h-15 bg-white border-b mb-1">
      <div className="h-full flex items-center justify-between gap-4 px-4">
        <div className="flex-auto">
          <h1 className="text-xl font-medium capitalize">{title}</h1>
        </div>
      </div>
    </header>
  );
};

export default AppBar;
