import React, { useState, useEffect } from 'react';
import { Fab, Grid, Box, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme, styled } from '@mui/material/styles';
import StyledPaper from '../StyledPaper';
import EventCard from '../EventCard'; // Ensure the path is correct
import axios from 'axios';

const FloatingButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 25,
  right: 25,
  backgroundColor: theme.palette.button?.main || theme.palette.primary.main,
  color: '#ffffff',
  '&:hover': {
    backgroundColor: theme.palette.button?.highlight || theme.palette.primary.dark,
  },
  [theme.breakpoints.down('md')]: {
    bottom: 10,
    right: 10,
  },
}));

const DialogStyled = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
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

interface Data {
  id: number;
  poster: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string | null;
}

const SocialEventsPage: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Data | null>(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10)); // Set default value to current date
  const [time, setTime] = useState('12:30'); // Set default value to 12:30 PM
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [validation, setValidation] = useState({ name: false, location: false });
  const [events, setEvents] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
          source.cancel();
        }, 10000); // 10 seconds timeout

        const response = await axios.get<Data[]>('http://localhost:5022/api/SocialEvents', {
          cancelToken: source.token,
        });
        clearTimeout(timeout);

        console.log('API Response:', response.data); // Log the API response
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.error('Request canceled due to timeout');
          setError('Request timed out');
        } else {
          console.error('Error fetching data:', error); // Log the error
          setError('Error fetching data');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClickOpen = (event?: Data) => {
    if (event) {
      setIsEditMode(true);
      setSelectedEvent(event);
      setName(event.name);
      setDate(event.date);
      setTime(event.time);
      setLocation(event.location);
      setDetails(event.description);
    } else {
      setIsEditMode(false);
      setSelectedEvent(null);
      setName('');
      setDate(new Date().toISOString().slice(0, 10));
      setTime('12:30');
      setLocation('');
      setDetails('');
      setImage(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValidation({ name: false, location: false });
  };

  const handleSubmit = async () => {
    const isValid = name && location; // Remove date and time from validation check
    setValidation({
      name: !name,
      location: !location,
    });

    if (isValid) {
      const formData = new FormData();
      formData.append('poster', 'testuser'); // Hardcoded for now
      formData.append('name', name);
      formData.append('date', date);
      formData.append('time', time); // Ensure time is always included
      formData.append('location', location);
      formData.append('description', details);
      if (image) {
        formData.append('image', image);
      }

      try {
        console.log('FormData being sent:', formData);
        const response = await axios.post('http://localhost:5022/api/SocialEvents', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Post created successfully:', response.data);

        // Update the events state with the new post
        setEvents([...events, response.data]);
        handleClose();
        window.location.href = 'http://localhost:5173/social-events'; // Redirect to the specific URL
      } catch (error) {
        console.error('Error creating event:', error);
        setError('Error creating event');
      }
    }
  };

  const handleUpdate = async () => {
    if (selectedEvent) {
      const formData = new FormData();
      formData.append('ID', selectedEvent.id.toString());
      formData.append('poster', 'testuser');
      formData.append('name', name);
      formData.append('date', date);
      formData.append('time', time);
      formData.append('location', location);
      formData.append('description', details);
      if (image) {
        formData.append('image', image);
      }

      // Log the data being sent for debugging
      console.log('Updating item with ID:', selectedEvent.id);
      console.log('FormData being sent for update:', {
        poster: 'testuser',
        name,
        date,
        time,
        location,
        details,
        image
      });

      try {
        const response = await axios.put(`http://localhost:5022/api/SocialEvents/${selectedEvent.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Post updated successfully:', response.data);

        // Update the events state with the updated post
        setEvents(events.map(event => event.id === selectedEvent.id ? response.data : event));
        handleClose();
        window.location.href = 'http://localhost:5173/social-events'; // Redirect to the specific URL
      } catch (error) {
        console.error('Error updating event:', error);
        setError('Error updating event');
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5022/api/SocialEvents/${id}`);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <StyledPaper elevation={8} sx={{ padding: 2 }}>
      <Box sx={{ textAlign: 'center', padding: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: 4 }}>Social Events</Typography>
        <Container maxWidth="md" sx={{ padding: 4 }}>
          <Grid container spacing={4} direction="column" justifyContent="center">
            {events.map((event) => (
              <Grid item key={event.id}>
                <EventCard
                  id={event.id}
                  poster={event.poster}
                  name={event.name}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  description={event.description}
                  imageUrl={event.imageUrl}
                  onDelete={() => handleDelete(event.id)} // Pass id correctly
                  onEdit={() => handleClickOpen(event)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <FloatingButton onClick={() => handleClickOpen()}>
        <AddIcon />
      </FloatingButton>
      <DialogStyled open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: theme.palette.text.primary }}>{isEditMode ? 'Edit Event' : 'Add New Event'}</DialogTitle>
        <DialogContentStyled>
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
            inputProps={{ step: 300, style: { color: theme.palette.text.primary }, placeholder: "12:30" }} // 5 min
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
            sx={{ marginTop: 1, backgroundColor: theme.palette.button?.main || theme.palette.primary.main, color: '#ffffff !important', '&:hover': { backgroundColor: theme.palette.button?.highlight || theme.palette.primary.dark } }}
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
          <Button onClick={isEditMode ? handleUpdate : handleSubmit} variant="contained" sx={{ backgroundColor: theme.palette.button?.main || theme.palette.primary.main, color: theme.palette.getContrastText(theme.palette.button?.main || theme.palette.primary.main), '&:hover': { backgroundColor: theme.palette.button?.highlight || theme.palette.primary.dark } }}>
            {isEditMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </DialogStyled>
    </StyledPaper>
  );
};

export default SocialEventsPage;
