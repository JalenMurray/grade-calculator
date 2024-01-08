import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './colors.scss';

import { createGlobalStyle } from 'styled-components';

// Context
import { UserProvider } from './contexts/user';

// Routes
import Navigation from './routes/navigation/navigation';
import Home from './routes/home/home';
import SignIn from './components/sign-in/sign-in';
import ClassPage from './routes/class-page/class-page';

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

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <div className="App bg-dark text-light">
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="auth" element={<SignIn />} />
            <Route path="/test_class" element={<ClassPage classId={1} />} />
          </Route>
        </Routes>
      </div>
    </Fragment>
  );
};

export default App;
