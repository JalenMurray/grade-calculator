import { Routes, Route } from 'react-router-dom';
import './colors.scss';

import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

// Routes
import Navigation from './routes/navigation/navigation';
import Home from './routes/home/home';
import SemesterPage from './routes/semester-page/semester-page';
import ClassPage from './routes/class-page/class-page';
import NotFound from './routes/not-found/not-found';
import Semesters from './routes/semesters/semesters';

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
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

a {
  text-decoration: none;
}
`;

const ColorTheme = {
  light: '#faf3dd',
  secondary: '#829191',
  primary: '#5bc0eb',
  darkSecondary: '#6677a2',
  dark: '#212738',
  info: '#23447d',
  success: '#51a270',
  warning: '#ce9238',
  danger: '#f44336',
};

const AppContainer = styled.div`
  background-color: ${(props) => props.theme.dark};
  color: ${(props) => props.theme.light};
  width: 100%;
`;

const App = () => {
  return (
    <ThemeProvider theme={ColorTheme}>
      <GlobalStyle />
      <AppContainer>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="/semester" element={<Semesters />} />
            <Route path="/semester/:id" element={<SemesterPage />} />
            <Route path="/class/:id" element={<ClassPage />} />
            <Route path="/not_found" element={<NotFound />} />
          </Route>
        </Routes>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
