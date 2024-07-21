import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import MemberCard from '../../MemberCard';
import axios from 'axios';

const DevPage: React.FC = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5022/api/Staff');
        setMembers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Paper elevation={6} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h4" align="center">
          Develop Department
        </Typography>
      </Paper>
      <Grid container spacing={4}>
        {members.map((member: any) => (
          <Grid item xs={12} key={member.id}>
            <MemberCard
              image={member.imageUrl}
              name={member.department}
              role={member.role}
              office={member.office}
              email={member.email}
              phoneExtension={member.phoneExtention} // Corrected to match API response
              phoneNumber={member.phoneNumber}
              about={member.about}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DevPage;
