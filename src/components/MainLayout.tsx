import { useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isIndexPage = location.pathname === "/";
  const showSidebar = !isIndexPage && location.pathname !== "/meal-planning-calendar";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {showSidebar && <AppSidebar />}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}