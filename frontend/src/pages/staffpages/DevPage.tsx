import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import MemberCard from '../../MemberCard';


const members = [
  {
    name: 'John Doe',
    role: 'Manager',
    office: 'R315',
    email: 'john.doe@example.com',
    phoneExtension: '1234',
    phoneNumber: '123-456-7890',
    about: 'John is a dedicated manager with over 10 years of experience in HR. He is passionate about improving workplace culture and employee satisfaction. John is a dedicated manager with over 10 years of experience in HR. He is passionate about improving workplace culture and employee satisfaction. John is a dedicated manager with over 10 years of experience in HR. He is passionate about improving workplace culture and employee satisfaction. John is a dedicated manager with over 10 years of experience in HR. He is passionate about improving workplace culture and employee satisfaction. John is a dedicated manager with over 10 years of experience in HR. He is passionate about improving workplace culture and employee satisfaction. John is a dedicated manager with over 10 years of experience in HR. He is passionate about improving workplace culture and employee satisfaction. John is a dedicated manager with over 10 years of experience in HR. He is passionate about improving workplace culture and employee satisfaction. John is a dedicated manager with over 10 years of experience in HR. He is passionate about improving workplace culture and employee satisfaction. John is a dedicated manager with over 10 years of experience in HR. He is passionate about improving workplace culture and employee satisfaction. John is a dedicated manager with over 10 years of experience in HR. He is passionate about improving workplace culture and employee satisfaction.',
    image: 'https://via.placeholder.com/200', 
  },
];

const DevPage: React.FC = () => {
  return (
    <Container sx={{ marginTop: 4 }}>
          <Paper elevation={6} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h4" align="center">
              Develeop Department
            </Typography>
          </Paper>
      <Grid container spacing={4}>
        {members.map((member) => (
          <Grid item xs={12} key={member.name}>
            <MemberCard {...member} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DevPage;