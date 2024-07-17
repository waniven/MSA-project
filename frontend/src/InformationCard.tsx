import * as React from 'react';
import { styled } from '@mui/material/styles';
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

interface InformationCardProps {
  showImage?: boolean;
  id: number;
  poster: string;
  category: string;
  time: string;
  description: string;
  image: string | null;
  imageUrl: string | null;
}

const InformationCard: React.FC<InformationCardProps> = ({
  showImage = true,
  poster,
  category,
  time,
  description,
  image,
  imageUrl
}) => {
  const theme = useTheme();
  const buttonColor = theme.components?.MuiAppBar?.styleOverrides?.root.hoverColor || theme.palette.primary.main;

  return (
    <Card sx={{ 
      maxWidth: 345, 
      bgcolor: theme.components?.MuiAppBar?.styleOverrides?.root.element
    }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#BDBDBD' }} aria-label="info">
            {poster.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" sx={{ color: theme.palette.text.primary }}>
            <MoreVertIcon />
          </IconButton>
        }
        title={<Typography variant="h6" color={theme.palette.text.primary}>{category}</Typography>}
        subheader={<Typography variant="body2" color={theme.palette.text.primary}>{time}</Typography>}
      />
      {showImage && imageUrl && (
        <CardMedia
          component="img"
          height="194"
          image={imageUrl}
          alt={image || "image"}
        />
      )}
      <CardContent>
        <Typography variant="body2" color={theme.palette.text.primary}>
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="contained" sx={{ backgroundColor: buttonColor, color: theme.palette.getContrastText(buttonColor) }}>
          Join
        </Button>
      </CardActions>
    </Card>
  );
}

export default InformationCard;
