import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { authTheme } from "@/config/authTheme";

export default function Register() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-secondary">Word lid van CarefulCuisine</h1>
          <p className="text-muted-foreground">Maak een nieuw account aan</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <Auth
            supabaseClient={supabase}
            appearance={authTheme}
            view="sign_up"
            providers={[]}
          />
        </div>
      </div>
    </div>
  );
}