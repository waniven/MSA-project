import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface EventCardProps {
  id: number;
  poster: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string | null;
  onEdit: () => void;
  onDelete: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ name, date, time, location, description, imageUrl, onEdit, onDelete }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(`(max-width:800px)`); // Adjust the breakpoint as needed
  const [expanded, setExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setShowReadMore(textRef.current.scrollHeight > 60); // Adjust to make the text limit shorter
    }
  }, [description]);

  const handleReadMore = () => {
    setExpanded(!expanded);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit();
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete();
    handleMenuClose();
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', width: '100%', mb: 2, backgroundColor: theme.palette.background.default }}>
      <CardMedia
        component="img"
        sx={{ width: isSmallScreen ? '100%' : 250, height: 250 }}
        image={imageUrl || 'https://via.placeholder.com/250'}
        alt={name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, maxHeight: expanded ? 'none' : 250, overflow: 'hidden' }}>
        <CardContent sx={{ flex: '1 0 auto', position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
            <IconButton
              aria-label="settings"
              onClick={handleMenuOpen}
              sx={{ color: theme.palette.text.primary }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                },
              }}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </Box>
          <Typography component="div" variant="h4" color={theme.palette.text.primary}>
            {name}
          </Typography>
          <Typography variant="h6" color="text.primary" component="div">
            {date} - {time}
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
            {description}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pl: 2, pr: 2, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="contained" sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.getContrastText(theme.palette.primary.main) }}>
              Attend
            </Button>
          </Box>
          {showReadMore && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                onClick={handleReadMore}
                sx={{
                  color: theme.palette.primary.main,
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
