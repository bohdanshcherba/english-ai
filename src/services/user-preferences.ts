export type UserPreferences = {
  level: string;
  textLength: number;
  themes: string[];
  topics: string[];
};

export const defaultPreferences: UserPreferences = {
  level: 'B1',
  textLength: 50,
  themes: ['past simple', 'present simple', 'future simple'],
  topics: ['dialogs', 'programming', 'management', 'development', 'standups', 'regular', 'dialogs', 'trips']
};

export const saveUserPreferences = (preferences: UserPreferences) => {
  localStorage.setItem('userPreferences', JSON.stringify(preferences));
};

export const getUserPreferences = () => {
  const preferences = localStorage.getItem('userPreferences');

  return preferences ? JSON.parse(preferences) : defaultPreferences;
};
