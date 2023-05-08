import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPage from './pages/UserPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import Layout from './components/Layout';

import { RecoilRoot } from 'recoil';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<LandingPage></LandingPage>}></Route>
            <Route path='/userPage' element={<UserPage></UserPage>}></Route>
            <Route path='/homePage' element={<HomePage></HomePage>}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
