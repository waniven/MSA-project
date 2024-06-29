import React from 'react';
import { List, ListItemText, Typography, Divider, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';

interface Event {
  time: string;
  description: string;
}

const events: Event[] = [
  { time: '08:00 AM', description: 'Breakfast Meeting' },
  { time: '10:00 AM', description: 'Team Stand-up' },
  { time: '01:00 PM', description: 'Client Presentation' },
  { time: '03:00 PM', description: 'Project Review' },
  { time: '05:00 PM', description: 'Wrap-up' },
];

const EventTimeline: React.FC = () => {
  const currentTime = new Date().getHours();
  const theme = useTheme();
  const elementColor = theme.components?.MuiAppBar?.styleOverrides?.root?.element || theme.palette.background.paper;

  const upcomingEvents = events.filter(event => {
    const [eventTime, period] = event.time.split(' ');
    const [hours, minutes] = eventTime.split(':');
    let eventHour = parseInt(hours);
    if (period === 'PM' && eventHour !== 12) eventHour += 12;
    if (period === 'AM' && eventHour === 12) eventHour = 0;
    return eventHour >= currentTime;
  });

  return (
      <List>
        {upcomingEvents.map((event, index) => (
          <React.Fragment key={index}>
            <Accordion sx={{ backgroundColor: elementColor }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.text.primary }} />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <ListItemText 
                  primary={`${event.time} - ${event.description}`} 
                  primaryTypographyProps={{ color: theme.palette.text.primary }}
                />
              </AccordionSummary>
              <AccordionDetails>
                <Typography color={theme.palette.text.primary}>
                  {event.description} details here.
                </Typography>
              </AccordionDetails>
            </Accordion>
            {index < upcomingEvents.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
  );
};

export default EventTimeline;
