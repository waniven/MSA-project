import React, { useState } from 'react';
import { Fab, Grid, Box, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, FormHelperText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme, styled } from '@mui/material/styles';
import StyledPaper from '../StyledPaper';
import EventCard from '../EventCard'; // Ensure the path is correct

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

const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  color: theme.palette.text.primary,
  '& .MuiFormControl-root, & .MuiInputLabel-root, & .MuiInputBase-root, & .MuiButton-root': {
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
  },
  '& .MuiFormHelperText-root': {
    color: theme.palette.text.primary,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : 'inherit',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : 'inherit',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : 'inherit',
    },
  },
}));

const SocialEventsPage: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');  // Set default value to empty string
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [validation, setValidation] = useState({ name: false, date: false, time: false, location: false });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValidation({ name: false, date: false, time: false, location: false });
  };

  const handleSubmit = () => {
    const isValid = name && date && time && location;
    setValidation({
      name: !name,
      date: !date,
      time: !time,
      location: !location,
    });

    if (isValid) {
      // Handle the form submission logic here
      console.log({ name, date, time, location, image, details });
      handleClose();
    }
  };

  // Sample event data
  const events = [
    {
      image: 'https://via.placeholder.com/250',
      name: 'Event 1',
      location: 'Aut South',
      time: '12:00 PM',
      date: '15 July',
      details: 'Details about Event 1',
      attendees: 5,
    },
    {
      image: 'https://via.placeholder.com/250',
      name: 'Event 2',
      time: '2:00 PM',
      date: '15 July',
      location: 'Location 2',
      details: 'Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2Details about Event 2',
      attendees: 10,
    },
  ];

  return (
    <StyledPaper elevation={8} sx={{ padding: 2 }}>
      <Box sx={{ textAlign: 'center', padding: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: 4 }}>Social Events</Typography>
        <Container maxWidth="md" sx={{ padding: 4 }}>
          <Grid container spacing={4} direction="column" justifyContent="center">
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
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: theme.palette.text.primary }}>Add New Event</DialogTitle>
        <DialogContentStyled>
          <Box sx={{ marginTop: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              error={validation.name}
              helperText={validation.name ? 'Please enter a name' : ''}
              InputProps={{
                style: { color: theme.palette.text.primary }
              }}
            />
          </Box>
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={date}
            InputLabelProps={{
              shrink: true,
              style: { color: theme.palette.text.primary }
            }}
            onChange={(e) => setDate(e.target.value)}
            required
            error={validation.date}
            helperText={validation.date ? 'Please enter a date' : ''}
            inputProps={{ style: { color: theme.palette.text.primary } }}
          />
          <TextField
            fullWidth
            label="Time"
            type="time"
            value={time}
            InputLabelProps={{
              shrink: true,
              style: { color: theme.palette.text.primary }
            }}
            onChange={(e) => setTime(e.target.value)}
            required
            error={validation.time}
            helperText={validation.time ? 'Please enter a time' : ''}
            inputProps={{ step: 300, style: { color: theme.palette.text.primary } }} // 5 min
          />
          <TextField
            fullWidth
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            error={validation.location}
            helperText={validation.location ? 'Please enter a location' : ''}
            InputProps={{
              style: { color: theme.palette.text.primary }
            }}
          />
          <TextField
            fullWidth
            label="Details"
            multiline
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            InputProps={{
              style: { color: theme.palette.text.primary }
            }}
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ marginTop: 1, backgroundColor: theme.components.MuiAppBar.styleOverrides.root.backgroundColor, color: '#ffffff !important' }}
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
          </Button>
        </DialogContentStyled>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: theme.palette.text.primary }}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: theme.components.MuiAppBar.styleOverrides.root.backgroundColor, color: theme.palette.getContrastText(theme.components.MuiAppBar.styleOverrides.root.backgroundColor) }}>Add</Button>
        </DialogActions>
      </Dialog>
    </StyledPaper>
  );
};

export default SocialEventsPage;
