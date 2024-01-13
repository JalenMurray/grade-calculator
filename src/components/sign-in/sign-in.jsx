// import { useEffect, useContext, useState } from 'react';
// import { getRedirectResult } from 'firebase/auth';

// import { UserContext } from '../../contexts/user';
// import { auth, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase';

// const SignIn = () => {
//   const { setCurrentUser } = useContext(UserContext);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const getRedirectUser = async () => {
//       const response = await getRedirectResult(auth);
//       if (response) {
//         const userDocRef = await createUserDocumentFromAuth(response.user);
//       }
//     };
//     getRedirectUser();
//   }, []);

//   return (
//     <div>
//       <h1>Sign In Page</h1>
//       <button onClick={() => setShowModal(true)}>Sign In Modal</button>
//       <button onClick={signInWithGoogleRedirect}>Sign In With Google</button>
//     </div>
//   );
// };

// export default SignIn;
