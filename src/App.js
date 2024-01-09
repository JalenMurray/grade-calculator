import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import './colors.scss';

import styled, { createGlobalStyle } from 'styled-components';

// Context
import { UserProvider } from './contexts/user';

// Routes
import Navigation from './routes/navigation/navigation';
import Home from './routes/home/home';
import SignIn from './components/sign-in/sign-in';
import ClassPage from './routes/class-page/class-page';
import NotFound from './routes/not-found/not-found';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
}
html, body {
  height: 100%;
  padding: 0;
  margin: 0;
}
`;

const AppContainer = styled.div`
  background-color: #212738;
  color: #faf3dd;
  height: 100%;
  overflow: hidden;
`;

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <AppContainer>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="auth" element={<SignIn />} />
            <Route path="/test_class" element={<ClassPage classId={1} />} />
            <Route path="/not_found" element={<NotFound />} />
          </Route>
        </Routes>
      </AppContainer>
    </Fragment>
  );
};

export default App;
