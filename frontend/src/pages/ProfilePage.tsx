import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

const Input = styled('input')({
  display: 'none',
});

const ProfilePage: React.FC = () => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState("A brief description about the person.");
  const [image, setImage] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [user, setUser] = useState({
    role: '',
    email: '',
    department: '',
    office: '',
    phoneExtention: '',
    phoneNumber: '',
  });
  const defaultImage = 'https://via.placeholder.com/200';

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5022/api/Staff/1');
        const userData = response.data;
        setUser({
          role: userData.role,
          email: userData.email,
          department: userData.department,
          office: userData.office,
          phoneExtention: userData.phoneExtention, 
          phoneNumber: userData.phoneNumber,
        });
        setAboutText(userData.about);
        setImage(userData.imageUrl);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditToggle = async () => {
    if (isEditing) {
      const formData = new FormData();
      formData.append('ID', '1');
      formData.append('Role', user.role);
      formData.append('Email', user.email);
      formData.append('Department', user.department);
      formData.append('Office', user.office);
      formData.append('PhoneExtension', user.phoneExtention);
      formData.append('PhoneNumber', user.phoneNumber);
      formData.append('About', aboutText);

      if (newImage) {
        formData.append('Image', newImage);
      }

      try {
        const response = await axios.put('http://localhost:5022/api/Staff/1', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('User profile updated successfully:', response.data);
        setNewImage(null);
      } catch (error) {
        console.error('Error updating user profile:', error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleAboutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAboutText(event.target.value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewImage(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSaveImage = async () => {
    if (newImage) {
      const formData = new FormData();
      formData.append('ID', '1');
      formData.append('Role', user.role);
      formData.append('Email', user.email);
      formData.append('Department', user.department);
      formData.append('Office', user.office);
      formData.append('PhoneExtension', user.phoneExtention);
      formData.append('PhoneNumber', user.phoneNumber);
      formData.append('About', aboutText);

      formData.append('Image', newImage);

      try {
        const response = await axios.put('http://localhost:5022/api/Staff/1', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('User profile image updated successfully:', response.data);
        setNewImage(null);
      } catch (error) {
        console.error('Error updating user profile image:', error);
      }
    }
  };

  // Provide default colors in case theme.palette.button is undefined
  const buttonMainColor = theme.palette.button?.main || theme.palette.primary.main;
  const buttonHighlightColor = theme.palette.button?.highlight || theme.palette.primary.dark;

  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: buttonMainColor,
    color: theme.palette.getContrastText(buttonMainColor),
    '&:hover': {
      backgroundColor: buttonHighlightColor,
    },
  }));

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
                style={{ backgroundImage: `url(${image || defaultImage})`, backgroundSize: 'cover' }}
              >
              </Box>
              <Box mt={2}>
                <label htmlFor="upload-image">
                  <Input
                    accept="image/*"
                    id="upload-image"
                    type="file"
                    onChange={handleImageUpload}
                  />
                  {newImage ? (
                    <StyledButton variant="contained" onClick={handleSaveImage}>
                      Save Image
                    </StyledButton>
                  ) : (
                    <StyledButton variant="contained">
                      Upload Image
                    </StyledButton>
                  )}
                </label>
              </Box>
              <Typography variant="body1" mt={2} mb={1}>Email: {user.email}</Typography>
              <Typography variant="body1" mb={1}>Phone Extension: {user.phoneExtention}</Typography>
              <Typography variant="body1" mb={1}>Phone Number: {user.phoneNumber}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} style={{ padding: '16px', position: 'relative' }}>
            <Typography variant="h4"><strong>Department</strong></Typography>
            <Typography variant="h5">{user.department}</Typography>
            <Typography variant="h5"><strong>Role</strong></Typography>
            <Typography variant="h5">{user.role}</Typography>
            <Typography variant="h5"><strong>Office</strong></Typography>
            <Typography variant="h5">{user.office}</Typography>
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
