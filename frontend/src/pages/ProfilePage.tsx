import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, Button, TextField } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.components.MuiAppBar.styleOverrides.root.backgroundColor,
  color: theme.palette.getContrastText(theme.components.MuiAppBar.styleOverrides.root.backgroundColor),
  '&:hover': {
    backgroundColor: theme.components.MuiAppBar.styleOverrides.root.hoverColor,
  },
}));

const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState("A brief description about the person.");
  const [image, setImage] = useState<string | null>(null);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleAboutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAboutText(event.target.value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" align="center" gutterBottom>
        Profile Page
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={5}>
          <Paper elevation={3} style={{ padding: '16px', position: 'relative' }}>
            <Box display="flex" flexDirection="column" alignItems="center" position="relative">
              <Box
                width={250}
                height={250}
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={2}
                bgcolor="grey.300"
                style={{ backgroundImage: image ? `url(${image})` : undefined, backgroundSize: 'cover' }}
              >
                {!image && <Typography variant="h6">200 x 200</Typography>}
              </Box>
              <Box mt={2}>
                <label htmlFor="upload-image">
                  <Input
                    accept="image/*"
                    id="upload-image"
                    type="file"
                    onChange={handleImageUpload}
                  />
                  <StyledButton variant="contained" component="span">
                    Upload Image
                  </StyledButton>
                </label>
              </Box>
              <Typography variant="body1" mt={2}>Email: example@example.com</Typography>
              <Typography variant="body1">Phone Extension: 1234</Typography>
              <Typography variant="body1">Phone Number: 123-456-7890</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} style={{ padding: '16px', position: 'relative' }}>
            <Typography variant="h4"><strong>Department</strong></Typography>
            <Typography variant="h5"><strong>Role</strong></Typography>
            <Typography variant="h5"><strong>Office:</strong> r315</Typography>
            <Typography variant="h5"><strong>About</strong></Typography>
            {isEditing ? (
              <TextField
                fullWidth
                multiline
                variant="outlined"
                value={aboutText}
                onChange={handleAboutChange}
              />
            ) : (
              <Typography variant="h6">{aboutText}</Typography>
            )}
            <StyledButton
              variant="contained"
              onClick={handleEditToggle}
              style={{ marginTop: '16px' }}
            >
              {isEditing ? 'Save' : 'Edit'}
            </StyledButton>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
