import { useEffect, useContext, useState } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { UserContext } from '../../contexts/user';
import { auth, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase';
import SignInModal from '../sign-in-modal/sign-in-modal';

const SignIn = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getRedirectUser = async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    };
    getRedirectUser();
  }, []);

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={() => setShowModal(true)}>Sign In Modal</button>
      <SignInModal show={showModal} onHide={() => setShowModal(false)} />
      <button onClick={signInWithGoogleRedirect}>Sign In With Google</button>
    </div>
  );
};

export default SignIn;
