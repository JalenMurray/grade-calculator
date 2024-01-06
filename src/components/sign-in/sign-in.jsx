import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { auth, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase';

const SignIn = () => {
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
      <button onClick={signInWithGoogleRedirect}>Sign In With Google</button>
    </div>
  );
};

export default SignIn;
