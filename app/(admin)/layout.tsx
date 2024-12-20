import AppBar from "@/components/shared/appbar";
import SidePane from "@/components/shared/sidepane";
import getAuth from "../actions/auth";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getAuth();

  return (
    <div className="bg-secondary">
      <aside className="w-60 fixed h-screen bg-background border-r p-3">
        <SidePane user={user} />
      </aside>

      <div className="w-[calc(100%-15rem)] min-h-screen ml-60">
        <AppBar user={user} />

        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
