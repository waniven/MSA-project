import React from 'react';
import { Grid, Paper, List, ListItem, useMediaQuery, useTheme } from '@mui/material';
import EventTimeline from '../EventTimeline'; // Ensure the path is correct
import InformationCard from '../InformationCard'; // Ensure the path is correct

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isSmallCard = useMediaQuery('(max-width:250px)');

  return (
    <div style={{ padding: theme.spacing(2), textAlign: 'center', color: theme.palette.text.secondary }}>
      <Grid container spacing={2}>
        {/* Top section */}
        <Grid item xs={12}>
          <Paper elevation={6} sx={{ padding: 2 }}>
            <h1>Today's Date</h1>
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
                    <ListItem>
                      <InformationCard showImage={false} />
                    </ListItem>
                    <ListItem>
                      <InformationCard showImage={false} />
                    </ListItem>
                    <ListItem>
                      <InformationCard showImage={false} />
                    </ListItem>
                    <ListItem>
                      <InformationCard showImage={false} />
                    </ListItem>
                  </List>
                ) : (
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <InformationCard showImage={false} />
                    </Grid>
                    <Grid item>
                      <InformationCard showImage={false} />
                    </Grid>
                    <Grid item>
                      <InformationCard showImage={false} />
                    </Grid>
                    <Grid item>
                      <InformationCard showImage={false} />
                    </Grid>
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
