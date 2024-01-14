import { Fragment, useEffect, useState, useContext } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
  auth,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
  extractEmailUserName,
} from '../../utils/firebase/firebase';
import { Navbar, Nav } from 'react-bootstrap';

import Logo from '../../assets/grade_calculator_logo.png';
import DefaultProfilePic from '../../assets/default_profile_pic.png';
import { Outlet } from 'react-router-dom';
import { NavLinkText } from './navigation.styles';
import ProfilePicture from '../../components/profile-picture/profile-picture';
import { createUser, userExists } from '../../utils/api';
import { UserContext } from '../../contexts/user';

const DEFAULT_PIC_PROPS = {
  img: DefaultProfilePic,
  alt: 'Login',
  onClick: signInWithGoogleRedirect,
  style: { cursor: 'pointer' },
};

const Navigation = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const getRedirectUser = async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const docRef = await createUserDocumentFromAuth(response.user);
        const { displayName, email, photoURL, uid } = response.user;
        const userFound = await userExists(uid);
        console.log(userFound);
        if (userFound) {
          setUser(userFound);
        } else {
          const newUser = {
            username: extractEmailUserName(email),
            email: email,
            display_name: displayName,
            photo_url: photoURL,
            uid: uid,
            created_at: new Date(),
          };
          const data = await createUser(newUser);
          setUser(data);
        }
      }
    };
    getRedirectUser();
  }, []);

  return (
    <Fragment>
      <Navbar data-bs-theme="light" style={{ background: '#829191' }}>
        <Navbar.Brand href="/">
          <img
            src={Logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="Logo"
            style={{ borderRadius: '15px', marginLeft: '15px' }}
          />
        </Navbar.Brand>
        <Nav className="me-auto text-lg">
          <Nav.Link href="/class/1">
            <NavLinkText>Classes</NavLinkText>
          </Nav.Link>
        </Nav>
        {!user.uid && <ProfilePicture {...DEFAULT_PIC_PROPS} />}
        {user.uid && <ProfilePicture style={{ cursor: 'pointer' }} img={user.photo_url} alt={user.display_name} />}
      </Navbar>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
