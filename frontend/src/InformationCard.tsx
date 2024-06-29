import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const InformationCard: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();
  const buttonColor = theme.components?.MuiAppBar?.styleOverrides?.root.hoverColor || theme.palette.primary.main;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ 
      maxWidth: 345, 
      bgcolor: theme.components?.MuiAppBar?.styleOverrides?.root.element
    }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#BDBDBD' }} aria-label="info">
            I
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" sx={{ color: theme.palette.text.primary }}>
            <MoreVertIcon />
          </IconButton>
        }
        title={<Typography variant="h6" color={theme.palette.text.primary}>Interesting Fact</Typography>}
        subheader={<Typography variant="body2" color={theme.palette.text.primary}>June 25, 2024</Typography>}
      />
      <CardContent>
        <Typography variant="body2" color={theme.palette.text.primary}>
          Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="contained" sx={{backgroundColor: theme.components?.MuiAppBar?.styleOverrides?.root.backgroundColor}}>
          Join
        </Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{ color: theme.palette.text.primary }}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph color={theme.palette.text.primary}>More Information:</Typography>
          <Typography paragraph color={theme.palette.text.primary}>
            Honey's long shelf life is attributed to its low moisture content and acidic pH, which create an inhospitable environment for bacteria and microorganisms.
          </Typography>
          <Typography paragraph color={theme.palette.text.primary}>
            Beekeepers harvest honey from hives by collecting honeycombs and extracting the honey through a process that involves uncapping the wax cells and spinning the combs in a centrifuge.
          </Typography>
          <Typography color={theme.palette.text.primary}>
            Honey is also known for its medicinal properties, including its use as a natural antibacterial agent and a remedy for sore throats and coughs.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default InformationCard;
