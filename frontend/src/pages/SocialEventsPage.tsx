import React, { useState } from 'react';
import { Fab, Grid, Box, Typography, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme, styled } from '@mui/material/styles';
import StyledPaper from '../StyledPaper';
import EventCard from '../EventCard'; // Ensure the path is correct
import { BorderAll, BorderAllOutlined, WidthFull } from '@mui/icons-material';

const FloatingButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 25,
  right: 25,
  backgroundColor: theme.components.MuiAppBar.styleOverrides.root.backgroundColor,
  color: '#ffffff',
  '&:hover': {
    backgroundColor: theme.components.MuiAppBar.styleOverrides.root.hoverColor,
  },
  [theme.breakpoints.down('md')]: {
    bottom: 10,
    right: 10,
  },
}));

const SocialEventsPage: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Sample event data
  const events = [
    {
      image: 'https://via.placeholder.com/250',
      name: 'Event 1',
      time: '12:00 PM',
      location: 'Location 1',
      details: 'Details about Event 1',
      attendees: 5,
    },
    {
      image: 'https://via.placeholder.com/250',
      name: 'Event 2',
      time: '2:00 PM',
      location: 'Location 2',
      details: 'Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2',
      attendees: 10,
    },
  ];

  return (
    <StyledPaper elevation={8} sx={{ padding: 2 }}>
      <Box sx={{ textAlign: 'center', padding: 2 }}>
        <Typography variant="h4">Social Events</Typography>
        <Container maxWidth="md" sx={{ padding: 4}}>
          <Grid container spacing={4} direction="column" justifyContent="center" >
            {events.map((event, index) => (
              <Grid item key={index}>
                <EventCard {...event} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <FloatingButton onClick={handleClickOpen}>
        <AddIcon />
      </FloatingButton>
    </StyledPaper>
  );
};

export default SocialEventsPage;
