import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#4CAF50',
                    brandAccent: '#43A047',
                  },
                },
              },
            }}
            view="sign_up"
            providers={[]}
            localization={{
              variables: {
                sign_up: {
                  email_label: 'E-mailadres',
                  password_label: 'Wachtwoord',
                  button_label: 'Registreren',
                  loading_button_label: 'Registreren...',
                  link_text: 'Nog geen account? Registreer je',
                },
                sign_in: {
                  email_label: 'E-mailadres',
                  password_label: 'Wachtwoord',
                  button_label: 'Inloggen',
                  loading_button_label: 'Inloggen...',
                  link_text: 'Heb je al een account? Log in',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}