import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme, styled } from '@mui/material/styles';

const FloatingButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 16,
  right: 16,
  backgroundColor: theme.components.MuiAppBar.styleOverrides.root.backgroundColor,
  color: '#ffffff', 
    '&:hover': {
    backgroundColor: theme.components.MuiAppBar.styleOverrides.root.hoverColor, 
  },
}));

const SocialEventsPage = () => {
  return (
    <div>
      {<h1>Lunch Page</h1>/* Other components */}
      <FloatingButton>
        <AddIcon />
      </FloatingButton>
    </div>
  );
};

export default SocialEventsPage;
