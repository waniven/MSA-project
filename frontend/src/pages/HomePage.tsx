import React, { useState, useEffect } from 'react';
import { Grid, Paper, List, ListItem, useMediaQuery, useTheme } from '@mui/material';
import EventTimeline from '../EventTimeline'; // Ensure the path is correct
import InformationCard from '../InformationCard'; // Ensure the path is correct
import axios from 'axios';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isSmallCard = useMediaQuery('(max-width:250px)');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5022/api/Lunch');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
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
            {/* Other components */}
          </Paper>
        </Grid>

        {/* Bottom sections */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ padding: 2 }}>
            <h2>Today's Events</h2>
            <EventTimeline />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
            <div>
              <h2>Lunch Plans</h2>
              <div className="information-card-container">
                {isSmallCard ? (
                  <List>
                    {data.map((item: any) => (
                      <ListItem key={item.id}>
                        <InformationCard
                          showImage={false}
                          poster={item.poster}
                          category={item.category}
                          time={item.time}
                          description={item.description}
                          imageUrl={item.imageUrl}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Grid container spacing={2} justifyContent="center">
                    {data.map((item: any) => (
                      <Grid item key={item.id}>
                        <InformationCard
                          showImage={false}
                          poster={item.poster}
                          category={item.category}
                          time={item.time}
                          description={item.description}
                          imageUrl={item.imageUrl}
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
