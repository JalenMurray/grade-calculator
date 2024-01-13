// import { useState } from 'react';
// import { redirect } from 'react-router-dom';
// import axios from 'axios';
// import { BASE_URL } from '../../utils/settings';

// import { Form, Label, Input, SubmitButton } from './sign-up.styles';
// import Button from '../button/button';

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     display_name: '',
//     username: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = `${BASE_URL}classes/users/`;
//     const newUserData = {
//       ...formData,
//       created_at: new Date(),
//     };
//     try {
//       const response = await axios.post(url, newUserData);
//       setFormData({
//         email: '',
//         display_name: '',
//         username: '',
//       });
//     } catch (error) {
//       console.error('Error creating user:', error);
//     }
//     redirect(BASE_URL);
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Label htmlFor="displayname">
//         Display Name
//         <Input type="text" name="display_name" value={formData.display_name} onChange={handleChange} />
//       </Label>
//       <Label htmlFor="username">
//         Username
//         <Input type="text" name="username" value={formData.username} onChange={handleChange} />
//       </Label>
//       <Label htmlFor="email">
//         Email
//         <Input type="email" name="email" value={formData.email} onChange={handleChange} />
//       </Label>
//       <SubmitButton type="submit">Sign Up!</SubmitButton>
//       <Button buttonType={'google'}></Button>
//     </Form>
//   );
// };

// export default SignUp;
