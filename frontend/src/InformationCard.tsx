import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Button, Typography, Menu, MenuItem } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface InformationCardProps {
  id: number;
  poster: string;
  category: string;
  time: string;
  description: string;
  imageUrl: string | null;
  showImage?: boolean;
  compact?: boolean; // control compact view
  onDelete: () => void;
  onEdit: () => void;
}

const InformationCard: React.FC<InformationCardProps> = ({
  id,
  poster,
  category,
  time,
  description,
  imageUrl,
  showImage = true,
  compact = false,
  onDelete,
  onEdit,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit();
    handleClose();
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  if (!poster || !category || !time || !description) {
    console.error('Missing props:', { id, poster, category, time, description, imageUrl });
    return null;
  }

  const JoinButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }));

  return (
    <Card sx={{ minWidth: 200, maxWidth: 345, bgcolor: theme.palette.background.default }}>
      <CardHeader
        avatar={
          showImage && (
            <Avatar sx={{ bgcolor: '#BDBDBD' }} aria-label="info">
              {poster.charAt(0).toUpperCase()}
            </Avatar>
          )
        }
        action={
          !compact && showImage && (
            <>
              <IconButton
                aria-label="settings"
                sx={{ color: theme.palette.text.primary }}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                  },
                }}
              >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </>
          )
        }
        title={<Typography variant="h6" color={theme.palette.text.primary}>{category}</Typography>}
        subheader={<Typography variant="body2" color={theme.palette.text.primary}>{time}</Typography>}
      />
      {showImage && imageUrl && (
        <CardMedia component="img" height="194" image={imageUrl} alt="Image" />
      )}
      <CardContent>
        <Typography variant="body2" color={theme.palette.text.primary}>{description}</Typography>
      </CardContent>
      {!compact && showImage && (
        <CardActions disableSpacing>
          <JoinButton variant="contained">Join</JoinButton>
        </CardActions>
      )}
    </Card>
  );
};

export default InformationCard;
