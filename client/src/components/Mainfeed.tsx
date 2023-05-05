import Box from '@mui/material/Box';
import MapComponent from './MapComponent';

const Mainfeed = () => {
  return (
    <Box
      sx={{
        width: 600,
        overflowY: 'auto',
        m: 1,
        p: 1,
        justifyContent: 'space-between',
      }}>
      <Box sx={{ height: 280, mb: 2, bgcolor: 'green' }}>Latest runs</Box>
      <Box sx={{ height: 280, mb: 2, bgcolor: 'blue' }}>Stats</Box>
      <Box>
        <MapComponent></MapComponent>
      </Box>
    </Box>
  );
};

export default Mainfeed;
