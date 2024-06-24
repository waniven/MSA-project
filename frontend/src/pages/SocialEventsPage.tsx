import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme, styled } from '@mui/material/styles';
import StyledPaper from '../StyledPaper';


const FloatingButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 25,
  right: 25,
  backgroundColor: theme.components.MuiAppBar.styleOverrides.root.backgroundColor,
  color: '#ffffff', 
    '&:hover': {
    backgroundColor: theme.components.MuiAppBar.styleOverrides.root.hoverColor, 
  },
}));

const SocialEventsPage = () => {
  return (
    <StyledPaper elevation={8}>
    <div>
      {<h1>Socialevents Page</h1>/* Other components */}
      <FloatingButton>
        <AddIcon />
      </FloatingButton>
    </div>
    </StyledPaper>
  );
};

export default SocialEventsPage;
