import React, { useState, useEffect } from 'react';
import { Fab, Grid, Box, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme, styled } from '@mui/material/styles';
import StyledPaper from '../StyledPaper';
import InformationCard from '../InformationCard';
import axios from 'axios';

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
  category: string;
  time: string;
  description: string;
  imageUrl: string | null;
}

const LunchPage: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [time, setTime] = useState(''); // Set default value to empty string
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [validation, setValidation] = useState({ category: false, name: false, time: false });
  const [foodItems, setFoodItems] = useState<Data[]>([]);
  const [coffeeItems, setCoffeeItems] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
          source.cancel();
        }, 10000); // 10 seconds timeout

        const response = await axios.get<Data[]>('http://localhost:5022/api/Lunch', {
          cancelToken: source.token,
        });
        clearTimeout(timeout);

        console.log('API Response:', response.data); // Log the API response
        const food = response.data.filter(item => item.category === 'Food');
        const coffee = response.data.filter(item => item.category === 'Coffee');
        setFoodItems(food);
        setCoffeeItems(coffee);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValidation({ category: false, name: false, time: false });
  };

  const handleSubmit = async () => {
    const isValid = category && name; // Remove time from validation check
    setValidation({
      category: !category,
      name: !name,
      time: false,
    });

    if (isValid) {
      const formData = new FormData();
      formData.append('poster', 'testuser');
      formData.append('category', category);
      formData.append('time', time);
      formData.append('description', description);
      if (image) {
        formData.append('image', image);
        formData.append('imageUrl', URL.createObjectURL(image)); // Assuming imageUrl is the URL of the uploaded image
      }

      try {
        console.log('FormData being sent:', formData);
        const response = await axios.post('http://localhost:5022/api/Lunch', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Post created successfully:', response.data);
        // Update the foodItems or coffeeItems state with the new post
        if (category === 'Food') {
          setFoodItems([...foodItems, response.data[0]]);
        } else {
          setCoffeeItems([...coffeeItems, response.data[0]]);
        }
        handleClose();
        window.location.href = 'http://localhost:5173/lunch'; // Redirect to the specific URL
      } catch (error) {
        console.error('Error creating post:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
        setError('Error creating post');
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5022/api/Lunch/${id}`);
      setFoodItems(foodItems.filter(item => item.id !== id));
      setCoffeeItems(coffeeItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting the post:', error);
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
        <Typography variant="h4">Lunch Page</Typography>
        <Container maxWidth="md">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                <Typography variant="h5">Food</Typography>
              </Box>
              <Grid container spacing={2} justifyContent="center">
                {foodItems.map((item) => (
                  <Grid item key={item.id}>
                    <InformationCard
                      id={item.id}
                      poster={item.poster}
                      category={item.category}
                      time={item.time}
                      description={item.description}
                      imageUrl={item.imageUrl}
                      showImage={!!item.imageUrl} // Only show image if imageUrl is not null
                      onDelete={() => handleDelete(item.id)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                <Typography variant="h5">Coffee</Typography>
              </Box>
              <Grid container spacing={2} justifyContent="center">
                {coffeeItems.map((item) => (
                  <Grid item key={item.id}>
                    <InformationCard
                      id={item.id}
                      poster={item.poster}
                      category={item.category}
                      time={item.time}
                      description={item.description}
                      imageUrl={item.imageUrl}
                      showImage={!!item.imageUrl} // Only show image if imageUrl is not null
                      onDelete={() => handleDelete(item.id)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <FloatingButton onClick={handleClickOpen}>
        <AddIcon />
      </FloatingButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: theme.palette.text.primary }}>Create New Lunch Plan</DialogTitle>
        <DialogContentStyled>
          <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 1 }} error={validation.category}>
            <InputLabel required>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
              required
              sx={{ color: theme.palette.text.primary }}
            >
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Coffee">Coffee</MenuItem>
            </Select>
            {validation.category && <FormHelperText>Please select a category</FormHelperText>}
          </FormControl>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: 1, color: theme.palette.text.primary }}
            required
            error={validation.name}
            helperText={validation.name ? 'Please enter a name' : ''}
            InputProps={{
              style: { color: theme.palette.text.primary }
            }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Time"
            type="time"
            placeholder="--:-- --"
            value={time}
            InputLabelProps={{
              shrink: true,
              style: { color: theme.palette.text.primary }
            }}
            onChange={(e) => setTime(e.target.value)}
            sx={{ marginBottom: 1, color: theme.palette.text.primary }}
            inputProps={{ step: 300, style: { color: theme.palette.text.primary }, placeholder: "--:-- --" }} // 5 min
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ marginBottom: 1, color: theme.palette.text.primary }}
            InputProps={{
              style: { color: theme.palette.text.primary }
            }}
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ marginTop: 1, marginBottom: 1, backgroundColor: theme.components.MuiAppBar.styleOverrides.root.backgroundColor, color: '#ffffff !important' }}
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

export default LunchPage;
