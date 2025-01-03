export const PROFILE_SETUP_STEPS = [
  "Medical Profile",
  "Medications",
  "Diet Preferences",
  "Activity Level",
  "Weight Goals",
  "Lifestyle",
  "Cuisine Preferences",
  "Dietary Restrictions",
  "Food Intolerances",
] as const;

export type ProfileSetupStep = typeof PROFILE_SETUP_STEPS[number];