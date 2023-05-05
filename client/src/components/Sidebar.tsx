import Box from '@mui/material/Box';
import CommunityCard from './CommunityCard';
import ChallengeCard from './ChallengeCard';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: '300px',
        margin: '10px',
        padding: '10px',
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
      }}>
      <CommunityCard></CommunityCard>
      <ChallengeCard></ChallengeCard>
    </Box>
  );
};

export default Sidebar;
