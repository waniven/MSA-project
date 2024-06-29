import React, { useState } from 'react';
import { Fab, Grid, Box, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme, styled } from '@mui/material/styles';
import StyledPaper from '../StyledPaper';
import InformationCard from '../InformationCard'; // Ensure the path is correct

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

const LunchPage: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [time, setTime] = useState('00:00');  // Set default value to "00:00"
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [validation, setValidation] = useState({ category: false, name: false, time: false });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValidation({ category: false, name: false, time: false });
  };

  const handleSubmit = () => {
    const isValid = category && name && time;
    setValidation({
      category: !category,
      name: !name,
      time: !time,
    });

    if (isValid) {
      // Handle the form submission logic here
      console.log({ category, name, time, image, description });
      handleClose();
    }
  };

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
                <Grid item>
                  <InformationCard />
                </Grid>
                <Grid item>
                  <InformationCard />
                </Grid>
                <Grid item>
                  <InformationCard />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                <Typography variant="h5">Coffee</Typography>
              </Box>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <InformationCard />
                </Grid>
                <Grid item>
                  <InformationCard />
                </Grid>
                <Grid item>
                  <InformationCard />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <FloatingButton onClick={handleClickOpen}>
        <AddIcon />
      </FloatingButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 1 }} error={validation.category}>
            <InputLabel required>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
              required
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
            sx={{ marginBottom: 1 }}
            required
            error={validation.name}
            helperText={validation.name ? 'Please enter a name' : ''}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Time"
            type="time"
            value={time}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setTime(e.target.value)}
            sx={{ marginBottom: 1 }}
            required
            error={validation.time}
            helperText={validation.time ? 'Please enter a time' : ''}
            inputProps={{ step: 300 }} // 5 min
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ marginBottom: 1 }}
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ marginTop: 1, marginBottom: 1 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: theme.components.MuiAppBar.styleOverrides.root.backgroundColor, color: theme.palette.getContrastText(theme.components.MuiAppBar.styleOverrides.root.backgroundColor) }}>Add</Button>
        </DialogActions>
      </Dialog>
    </StyledPaper>
  );
};

export default LunchPage;
