import { Paper, Button, Typography } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const ChallengeCard = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        height: '300px',
        width: '280px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        bgcolor: 'white',
        marginBottom: '20px',
      }}>
      <DirectionsRunIcon sx={{ fontSize: '50px' }}></DirectionsRunIcon>
      <Typography variant={'h5'}>Nuvarande utmaning</Typography>
      <Typography>30 av 400km</Typography>
      <Button
        sx={{
          margin: '20px',
        }}
        variant='outlined'>
        Skicka ny utmaning
      </Button>
    </Paper>
  );
};

export default ChallengeCard;
