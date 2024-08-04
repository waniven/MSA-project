import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { useThemeContext } from '../theme'; // Adjust the path to your ThemeContext file

const Input = styled('input')({
  display: 'none',
});

const AccountPage: React.FC = () => {
  useThemeContext();
  const [displayName, setDisplayName] = useState('Current Display Name');
  const [isEditingName, setIsEditingName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(displayName);
  const [image, setImage] = useState<string | null>('https://via.placeholder.com/200');

  const handleEditName = () => {
    if (isEditingName) {
      setDisplayName(newDisplayName);
    }
    setIsEditingName(!isEditingName);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const theme = useTheme();

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
    <Box p={4} bgcolor={theme.palette.background.default} color={theme.palette.text.primary}>
      <Typography variant="h4" align="center" gutterBottom>
        Account Page
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            style={{
              padding: '16px',
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box
                width={200}
                height={200}
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={2}
                bgcolor="grey.300"
                style={{
                  backgroundImage: image ? `url(${image})` : undefined,
                  backgroundSize: 'cover',
                  borderRadius: '50%',
                }}
              />
              <Box mt={2}>
                <label htmlFor="upload-image">
                  <Input
                    accept="image/*"
                    id="upload-image"
                    type="file"
                    onChange={handleFileUpload}
                  />
                  <StyledButton variant="contained">
                    Upload New Image
                  </StyledButton>
                </label>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            style={{
              padding: '16px',
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <StyledButton variant="contained" style={{ marginBottom: '16px' }}>
                Change Password
              </StyledButton>
              <Box display="flex" alignItems="center" gap={2} width="100%">
                <TextField
                  label="Display Name"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{
                    readOnly: !isEditingName,
                  }}
                />
                <StyledButton variant="contained" onClick={handleEditName}>
                  {isEditingName ? 'Save' : 'Edit'}
                </StyledButton>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountPage;
