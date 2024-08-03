import React, { useState, useEffect } from 'react';
import { Grid, Paper, useMediaQuery, useTheme, Typography, List, ListItem } from '@mui/material';
import axios from 'axios';
import EventTimeline from '../EventTimeline'; 
import InformationCard from '../InformationCard'; 

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isSmallCard = useMediaQuery('(max-width:250px)');
  const [lunchData, setLunchData] = useState<any[]>([]);
  const [eventsData, setEventsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLunchData = async () => {
      try {
        const response = await axios.get('http://localhost:5022/api/Lunch');
        console.log('Lunch data:', response.data);
        setLunchData(response.data);
      } catch (error) {
        console.error('Error fetching lunch data:', error);
        setError('Error fetching lunch data');
      }
    };

    const fetchEventsData = async () => {
      try {
        const response = await axios.get('http://localhost:5022/api/SocialEvents');
        console.log('Events data:', response.data);
        setEventsData(response.data);
      } catch (error) {
        console.error('Error fetching events data:', error);
        setError('Error fetching events data');
      } finally {
        setLoading(false);
      }
    };

    fetchLunchData();
    fetchEventsData();
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: theme.spacing(2), textAlign: 'center', color: theme.palette.text.secondary }}>
      <Grid container spacing={2}>
        {/* Top section */}
        <Grid item xs={12}>
          <Paper elevation={6} sx={{ padding: 2 }}>
            <h1>{getCurrentDate()}</h1>
          </Paper>
        </Grid>

        {/* Events section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>Events</Typography>
            <EventTimeline events={eventsData} />
          </Paper>
        </Grid>

        {/* Lunch Plans section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
            <div>
              <Typography variant="h4" gutterBottom>Lunch Plans</Typography>
              <div className="information-card-container">
                {isSmallCard ? (
                  <List>
                    {lunchData.map((item: any) => (
                      <ListItem key={item.id}>
                        <InformationCard
                          id={item.id}
                          showImage={false}
                          poster={item.poster}
                          category={item.category}
                          time={item.time}
                          description={item.description}
                          imageUrl={item.imageUrl}
                          compact={true} // Compact view for lunch plans
                          onDelete={() => {}}
                          onEdit={() => {}}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Grid container spacing={2} justifyContent="center">
                    {lunchData.map((item: any) => (
                      <Grid item key={item.id}>
                        <InformationCard
                          id={item.id}
                          showImage={false}
                          poster={item.poster}
                          category={item.category}
                          time={item.time}
                          description={item.description}
                          imageUrl={item.imageUrl}
                          compact={true} // Compact view for lunch plans
                          onDelete={() => {}}
                          onEdit={() => {}}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
