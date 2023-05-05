import Sidebar from '../components/Sidebar';
import Mainfeed from '../components/Mainfeed';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';

const HomePage = () => {
  const isSmallScreen = useMediaQuery('(max-width: 850px)');

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: '10px',
        minHeight: '100vh',
        justifyContent: 'center',
      }}>
      {isSmallScreen ? null : <Sidebar></Sidebar>}
      <Mainfeed></Mainfeed>
    </Container>
  );
};

export default HomePage;
