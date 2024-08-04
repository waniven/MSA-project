import React, { createContext, useMemo, useState, useContext, useEffect, ReactNode } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { PaletteMode } from '@mui/material';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    button?: {
      main: string;
      highlight: string;
    };
  }

  interface PaletteOptions {
    button?: {
      main: string;
      highlight: string;
    };
  }
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#e6eeff',
      paper: '#ffffff',
    },
    primary: {
      main: '#000000',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
    },
    button: {
      main: '#1251b0',
      highlight: '#0f408a',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1251b0',
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a111c',
      paper: '#172740',
    },
    primary: {
      main: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
    button: {
      main: '#2f4f83',
      highlight: '#22395e',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#22395e',
        },
      },
    },
  },
});

const ThemeContext = createContext({
  toggleTheme: () => {},
  currentTheme: 'light' as PaletteMode,
});

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<PaletteMode>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as PaletteMode;
    if (savedTheme) {
      setThemeMode(savedTheme);
    }
  }, []);

  const theme = useMemo(() => (themeMode === 'light' ? lightTheme : darkTheme), [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, currentTheme: themeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
