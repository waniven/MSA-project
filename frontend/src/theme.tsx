import React, { createContext, useMemo, useState, useContext, useEffect, ReactNode } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { PaletteMode } from '@mui/material';

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
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1251b0',
          hoverColor: '#0f408a',
          element: '#e6eeff', // This is still an invalid property, should be removed or corrected
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
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#22395e',
          hoverColor: '#294470',
          element: '#294470', // This is still an invalid property, should be removed or corrected
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
