import React, { createContext, useMemo, useState, useContext } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { PaletteMode } from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#e6eeff', // Light mode background color
      paper: '#ffffff', // the dropdown pannel
    },
    primary: {
      main: '#000000', // logo and icon colour
    },
    text: {
      primary: '#000000', // drop down pannel text color 
      secondary: '#000000', // Light mode secondary text color
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1251b0', // Light mode AppBar (accent color)
          hoverColor: '#0f408a',
          element: '#e6eeff'
        },
      },
    },
  },
});

const darkTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
          default: '#0a111c', // Light mode background color
          paper: '#172740', // drop down pannel
        },
        primary: {
          main: '#000000', // logo and icon colour
        },
        text: {
          primary: '#ffffff', // drop down pannel text color 
          secondary: '#000000', // Light mode secondary text color
        },
      },
      components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: '#22395e', // Light mode AppBar (accent color)
              hoverColor: '#294470',
              element: '#294470'
        },
      },
    },
  },
});

const ThemeContext = createContext({
  toggleTheme: () => {},
  currentTheme: 'light' as PaletteMode,
});

export const ThemeContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState<PaletteMode>('light');

  const theme = useMemo(() => (themeMode === 'light' ? lightTheme : darkTheme), [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
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