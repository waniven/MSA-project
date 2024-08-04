import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

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
    margin: 0, 
    minHeight: '94vh', 
    minWidth: '97vw', 
}}));

export default StyledPaper;