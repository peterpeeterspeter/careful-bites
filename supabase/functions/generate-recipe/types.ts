export interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutritionalInfo: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
    sugar: number;
  };
  preparationTime: number;
  cookingTime: number;
  difficultyLevel: string;
  servings: number;
}

export interface GenerateRecipeRequest {
  preferences: {
    diabetesType: string;
    dietaryRestrictions: string[];
    foodIntolerances: string[];
    dietStyles: string[];
  };
  isAnonymous: boolean;
  profile_id?: string;
}