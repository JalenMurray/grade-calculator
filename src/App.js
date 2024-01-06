import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './colors.scss';

import { createGlobalStyle } from 'styled-components';

import Navigation from './routes/navigation/navigation';
import Home from './routes/home/home';
import { Fragment } from 'react';
import SignIn from './components/sign-in/sign-in';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
}
html, body {
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: $dark;
}
`;

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route index element={<Home />} />
              <Route path="auth" element={<SignIn />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Fragment>
  );
};

export default App;
