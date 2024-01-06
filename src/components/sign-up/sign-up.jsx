import { useState } from 'react';

import { Form, Label, Input, SubmitButton } from './sign-up.styles';
import Button from '../button/button';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    displayname: '',
    password: '',
    confirmpassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('ATTEMPTING TO SUBMIT FORM');
    try {
      await fetch('http://localhost:3001/api/user/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error('Error submitting form: ', err.message);
    }
  };

  const getInput = (name, value, onChange) => {
    return <Input type="text" name={name} value={value} onChange={onChange} />;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="displayname">
        Display Name
        {getInput('displayname', formData.displayname, handleChange)}
      </Label>
      <Label htmlFor="email">
        Email
        <Input type="email" name="email" value={formData.email} onChange={handleChange} />
      </Label>
      <Label htmlFor="password">
        Password
        {getInput('password', formData.password, handleChange)}
      </Label>
      <Label htmlFor="confirmpassword">
        Confirm Password
        {getInput('confirmpassword', formData.confirmpassword, handleChange)}
      </Label>
      <SubmitButton type="submit">Sign Up!</SubmitButton>
      <Button buttonType={'google'}></Button>
    </Form>
  );
};

export default SignUp;
