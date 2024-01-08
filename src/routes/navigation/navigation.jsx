import { Fragment } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

import Logo from '../../assets/grade_calculator_logo.png';
import DefaultProfilePic from '../../assets/default_profile_pic.png';
import { Outlet } from 'react-router-dom';
import { NavLinkText } from './navigation.styles';
import UserLogo from '../../components/user-logo/user-logo';

const Navigation = () => {
  return (
    <Fragment>
      <Navbar data-bs-theme="light" style={{ background: '#829191' }}>
        <Navbar.Brand href="/">
          <img src={Logo} width="50" height="50" className="d-inline-block align-top" alt="Logo" />
        </Navbar.Brand>
        <Nav className="me-auto text-lg">
          <Nav.Link href="/test_class">
            <NavLinkText>TEST CLASS</NavLinkText>
          </Nav.Link>
        </Nav>
        <Nav className="">
          <Nav.Link href="/auth">
            <UserLogo imgUrl={DefaultProfilePic} altTxt={'Jalen Murray'} />
          </Nav.Link>
        </Nav>
      </Navbar>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
