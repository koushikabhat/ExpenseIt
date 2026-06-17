export const darkTheme = {
  colors: {
    background: '#121212',
    card: '#1E1E1E',
    primary: '#4CAF50',
    text: '#FFFFFF',
    border: '#333333',
    danger: '#FF5252',
  },
  banner: {
    background: '#1E293B',
    accent: '#3B82F6',
    accentSecondary: '#8B5CF6',
    iconBg: 'rgba(255,255,255,0.08)',
    progressBg: 'rgba(255,255,255,0.08)',
    circle1: 'rgba(59,130,246,0.18)',
    circle2: 'rgba(139,92,246,0.15)',
    surface: 'rgba(255,255,255,0.06)',
  },
  banner2: {
    gradientStart: '#6366F1', // Indigo
    gradientMiddle: '#8B5CF6', // Purple
    gradientEnd: '#EC4899', // Pink
  
    glass: 'rgba(255,255,255,0.12)',
    glassBorder: 'rgba(255,255,255,0.20)',
  
    glow1: 'rgba(255,255,255,0.18)',
    glow2: 'rgba(255,255,255,0.08)',
  
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255,255,255,0.75)',
  }

};

export const lightTheme = {
  colors: {
    background: '#E5E5E5',
    white : "#FFFFFF",
    card: '#F5F5F5',
    primary: '#4CAF50',
    text: '#000000',
    border: '#E0E0E0',
    danger: '#FF5252',
  },

  banner: {
    background: '#EEF4FF',
    accent: '#2563EB',
    accentSecondary: '#7C3AED',
    iconBg: '#FFFFFF',
    progressBg: '#DCE6FF',
    circle1: 'rgba(37,99,235,0.10)',
    circle2: 'rgba(124,58,237,0.08)',
    surface: '#FFFFFF',
  },
  banner2: {
    gradientStart: '#6366F1', // Indigo
    gradientMiddle: '#8B5CF6', // Purple
    gradientEnd: '#EC4899', // Pink
  
    glass: 'rgba(255,255,255,0.12)',
    glassBorder: 'rgba(255,255,255,0.20)',
  
    glow1: 'rgba(255,255,255,0.18)',
    glow2: 'rgba(255,255,255,0.08)',
  
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255,255,255,0.75)',
  }
};


export interface AppTheme {
  colors: {
    background: string;
    card: string;
    primary: string;
    text: string;
    border: string;
    danger: string;
  };
  banner: {
    background: string;
    accent: string;
    accentSecondary: string;
    iconBg: string;
    progressBg: string;
    circle1: string;
    circle2: string;
    surface: string;
  };

  banner2: {
    gradientStart: string, // Indigo
    gradientMiddle: string, // Purple
    gradientEnd: string, // Pink
  
    glass: string,
    glassBorder: string,
  
    glow1: string,
    glow2: string,
  
    textPrimary: string,
    textSecondary: string,
  }
}