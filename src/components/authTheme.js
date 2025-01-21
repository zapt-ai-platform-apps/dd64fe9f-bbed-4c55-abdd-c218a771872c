import { ThemeSupa } from '@supabase/auth-ui-shared';

export const appearance = {
  theme: ThemeSupa,
  variables: {
    default: {
      colors: {
        brand: '#6366f1',
        brandAccent: '#8b5cf6',
        inputText: '#ffffff',
        inputBackground: 'rgba(255, 255, 255, 0.05)',
        inputBorder: 'rgba(255, 255, 255, 0.1)',
        messageText: '#ffffff',
      },
      space: {
        spaceSmall: '4px',
        spaceMedium: '8px',
        spaceLarge: '16px',
      },
      radii: {
        borderRadiusButton: '8px',
        inputBorderRadius: '8px',
      },
    },
  },
};