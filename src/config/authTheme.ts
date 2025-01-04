import { ThemeSupa } from "@supabase/auth-ui-shared";

export const authTheme = {
  theme: ThemeSupa,
  variables: {
    default: {
      colors: {
        brand: '#4CAF50',
        brandAccent: '#43A047',
      },
    },
  },
  localization: {
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
  },
};