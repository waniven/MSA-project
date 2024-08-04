import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface MemberCardProps {
  image: string;
  name: string;
  role: string;
  office: string;
  email: string;
  phoneExtension: string;
  phoneNumber: string;
  about: string;
}

const MemberCard: React.FC<MemberCardProps> = ({ image, name, role, office, email, phoneExtension, phoneNumber, about }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(`(max-width:800px)`); // Adjust the breakpoint as needed
  const textRef = useRef<HTMLDivElement>(null);

  const placeholderImage = 'https://via.placeholder.com/250';

  useEffect(() => {
    if (textRef.current) {
      // Handle any additional effects if needed when the text overflows
    }
  }, [about]);

  return (
    <Card elevation={6} sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', width: '100%', mb: 2, backgroundColor: theme.palette.background.paper }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: isSmallScreen ? '100%' : 250 }}>
        <CardMedia
          component="img"
          sx={{ width: '100%', height: 200, objectFit: 'cover' }}
          image={image || placeholderImage}
          alt={name}
        />
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Typography variant="body1" color="text.primary" component="div">
            Email: {email}
          </Typography>
          <Typography variant="body1" color="text.primary" component="div">
            Phone Extension: {phoneExtension}
          </Typography>
          <Typography variant="body1" color="text.primary" component="div">
            Phone Number: {phoneNumber}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto', position: 'relative', pt: 2, pb: 1 }}>
          <Typography component="div" variant="h4" color={theme.palette.text.primary}>
            {name}
          </Typography>
          <Typography variant="h6" color="text.primary" component="div">
            {role}
          </Typography>
          <Typography variant="h6" color="text.primary" component="div">
            Office: {office}
          </Typography>
          <Typography
            variant="body1"
            color="text.primary"
            component="div"
            ref={textRef}
            sx={{
              overflow: 'visible',
              textOverflow: 'clip',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {about}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default MemberCard;
