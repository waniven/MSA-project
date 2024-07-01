import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface EventCardProps {
  image: string;
  name: string;
  time: string;
  location: string;
  details: string;
  attendees: number;
}

const EventCard: React.FC<EventCardProps> = ({ image, name, time, location, details, attendees }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(`(max-width:800px)`); // Adjust the breakpoint as needed
  const [expanded, setExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setShowReadMore(textRef.current.scrollHeight > 60); // Adjust to make the text limit shorter
    }
  }, [details]);

  const handleReadMore = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', width: '100%', mb: 2, backgroundColor: theme.palette.background.default }}>
      <CardMedia
        component="img"
        sx={{ width: isSmallScreen ? '100%' : 250, height: 250 }}
        image={image}
        alt={name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, maxHeight: expanded ? 'none' : 250, overflow: 'hidden' }}>
        <CardContent sx={{ flex: '1 0 auto', position: 'relative' }}>
          <Typography component="div" variant="h4" color={theme.palette.text.primary}>
            {name}
          </Typography>
          <Typography variant="h6" color="text.primary" component="div">
            {time}
          </Typography>
          <Typography variant="h6" color="text.primary" component="div">
            {location}
          </Typography>
          <Typography
            variant="body1"
            color="text.primary"
            component="div"
            ref={textRef}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: expanded ? 'none' : 2, // Set to 2 lines for a shorter text limit
              maxHeight: expanded ? 'none' : '3em', // Adjusted maxHeight for 2 lines
              mb: 2 // Add margin to ensure proper spacing
            }}
          >
            {details}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pl: 2, pr: 2, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="contained" sx={{ backgroundColor: theme.components.MuiAppBar.styleOverrides.root.hoverColor, color: theme.palette.getContrastText(theme.components.MuiAppBar.styleOverrides.root.hoverColor) }}>
              Attend
            </Button>
            <Typography variant="subtitle1" color="text.primary" component="div" sx={{ ml: 2 }}>
              {attendees} attending
            </Typography>
          </Box>
          {showReadMore && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                onClick={handleReadMore}
                sx={{
                  color: theme.components.MuiAppBar.styleOverrides.root.hoverColor,
                  textTransform: 'none' // To keep text as is
                }}
              >
                {expanded ? 'Read Less' : 'Read More'}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default EventCard;
