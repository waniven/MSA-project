import React from 'react';
import { Fab, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme, styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
    margin: theme.spacing(2), 
    padding: theme.spacing(2),
    minHeight: 'calc(100vh - 100px)', 
    minWidth: 'calc(100vw - 512px)', 
    textAlign: 'center',
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
    margin: 0, // Remove buffer space on smaller screens
    minHeight: '94vh', // Full height without margin
    minWidth: '97vw', // Full width without margin
}}));

export default StyledPaper;