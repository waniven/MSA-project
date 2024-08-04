import React from 'react';
import { Grid, Paper, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const departments = ['HR', 'Marketing', 'Sales', 'Legal', 'IT', 'Development'];

const StaffDirectoryPage: React.FC = () => {

  return (
    <Container sx={{ marginTop: 4 }}>
      <Grid container spacing={2}>
        {/* Top section */}
        <Grid item xs={12}>
          <Paper elevation={6} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h4" align="center">
              Staff Directory
            </Typography>
          </Paper>
        </Grid>
        {/* Department cards */}
        {departments.map((department) => (
          <Grid item xs={12} sm={6} md={4} key={department}>
            <Paper
              component={Link}
              to={`/staff-directory/${department.toLowerCase()}`}
              elevation={6}
              sx={{
                textDecoration: 'none',
                padding: 2,
                textAlign: 'center',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="h6">
                {department}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StaffDirectoryPage;
