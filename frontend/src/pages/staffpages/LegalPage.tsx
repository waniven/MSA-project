import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import MemberCard from '../../MemberCard';
import axios from 'axios';

const LegalPage: React.FC = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5022/api/Staff');
        const legalMembers = response.data.filter((member: any) => member.department === 'Legal');
        setMembers(legalMembers);
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
          Legal Department
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
              phoneExtension={member.phoneExtension}
              phoneNumber={member.phoneNumber}
              about={member.about}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LegalPage;
