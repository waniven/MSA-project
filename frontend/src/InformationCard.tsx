import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface InformationCardProps {
  id: number;
  showImage?: boolean;
  poster: string;
  category: string;
  time: string;
  description: string;
  imageUrl: string | null;
  onDelete: () => void;
  onEdit: () => void; // Added onEdit prop
}

const InformationCard: React.FC<InformationCardProps> = ({
  id,
  showImage = true,
  poster,
  category,
  time,
  description,
  imageUrl,
  onDelete,
  onEdit, // Added onEdit prop
}) => {
  const theme = useTheme();
  const buttonColor = theme.components?.MuiAppBar?.styleOverrides?.root.hoverColor || theme.palette.primary.main;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(); // Call onEdit when the edit action is triggered
    handleClose();
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  return (
    <Card sx={{ maxWidth: 345, bgcolor: theme.components?.MuiAppBar?.styleOverrides?.root.element }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: '#BDBDBD' }} aria-label="info">{poster.charAt(0).toUpperCase()}</Avatar>}
        action={
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
      <CardActions disableSpacing>
        <Button variant="contained" sx={{ backgroundColor: buttonColor, color: theme.palette.getContrastText(buttonColor) }}>Join</Button>
      </CardActions>
    </Card>
  );
};

export default InformationCard;
