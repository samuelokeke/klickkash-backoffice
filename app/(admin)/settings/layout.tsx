"use client";

import AppBar from "./components/appbar";
import SidePane from "./components/sidepane";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-secondary flex gap-5">
      <aside className="w-60 h-screen bg-background border p-3">
        <SidePane />
      </aside>

      <div className="w-[calc(100%-15rem)] min-h-screen border">
        <AppBar />

        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
