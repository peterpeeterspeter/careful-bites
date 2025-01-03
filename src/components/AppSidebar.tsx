import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";

export function AppSidebar() {
  const { signOut } = useAuth();

  return (
    <div className="border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-[52px] items-center border-b px-6">
        <span className="font-semibold">Careful Cuisine</span>
      </div>
      <div className="px-4 py-2">
        <Button variant="ghost" className="w-full justify-start" onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}