import { Paper, Button, Typography } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const ChallengeCard = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        height: 300,
        width: 280,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        bgcolor: 'white',
        mb: 2,
      }}>
      <DirectionsRunIcon sx={{ fontSize: '50px' }}></DirectionsRunIcon>
      <Typography variant={'h5'}>Nuvarande utmaning</Typography>
      <Typography>30 av 400km</Typography>
      <Button
        sx={{
          m: 2,
        }}
        variant='outlined'>
        Skicka ny utmaning
      </Button>
    </Paper>
  );
};

export default ChallengeCard;
