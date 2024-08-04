import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  description: string;
}

interface EventTimelineProps {
  events: Event[];
}

const EventTimeline: React.FC<EventTimelineProps> = ({ events }) => {
  const theme = useTheme();
  const elementColor = theme.palette.background.paper; // Use a valid theme property

  return (
    <List>
      {events.map((event, index) => (
        <React.Fragment key={event.id}>
          <ListItem sx={{ backgroundColor: elementColor, textAlign: 'center', marginBottom: 2 }}>
            <ListItemText 
              primary={event.name}
              secondary={`${event.time} - ${new Date(event.date).toLocaleDateString()}`}
              primaryTypographyProps={{ color: theme.palette.text.primary, textAlign: 'center', fontSize: '1.2rem' }}
              secondaryTypographyProps={{ color: theme.palette.text.secondary, textAlign: 'center', fontSize: '1rem' }}
            />
          </ListItem>
          {index < events.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default EventTimeline;
