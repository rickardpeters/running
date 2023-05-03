import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StravaTest from './pages/stravaTest';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import Layout from './components/Layout';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<LandingPage></LandingPage>}></Route>
          <Route path='/stravaTest' element={<StravaTest></StravaTest>}></Route>
          <Route path='/homePage' element={<HomePage></HomePage>}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
