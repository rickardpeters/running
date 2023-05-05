import { Paper, Box, Typography, Avatar, Stack } from '@mui/material';

const CommunityCard = () => {
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
      <Avatar
        alt='Avatar'
        sx={{
          height: '100px',
          width: '100px',
        }}></Avatar>
      <Box
        sx={{
          textAlign: 'center',
        }}>
        <Typography variant={'h4'} sx={{ m: 2 }}>
          Kubblagsnamn
        </Typography>
      </Box>
      <Box>
        <Stack direction={'row'}>
          <Box
            sx={{
              textAlign: 'center',
            }}>
            <Typography fontWeight={'bold'} sx={{ m: 1 }}>
              Antal Kubbare
            </Typography>
            <Typography>3</Typography>
          </Box>
          <Box
            sx={{
              textAlign: 'center',
            }}>
            <Typography fontWeight={'bold'} sx={{ m: 1 }}>
              Kubbad Distans
            </Typography>
            <Typography>30mil</Typography>
          </Box>
          <Box
            sx={{
              textAlign: 'center',
            }}>
            <Typography fontWeight={'bold'} sx={{ m: 1 }}>
              Kubbat Längst
            </Typography>
            <Typography>Sticky Petrus</Typography>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default CommunityCard;
