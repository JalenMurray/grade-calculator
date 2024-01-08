import { Modal, Row, Col } from 'react-bootstrap';
import { ButtonContainer, Form, Input, Label, SubmitButton } from './sign-in-modal.styles';
import Button from '../button/button';
import { useState } from 'react';

import { createUserAPI } from '../../utils/firebase/firebase';

const SignInModal = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, 'CHANGED', value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { display_name: 'Changed Name' };
    createUserAPI(user);
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg="6">
              <Label htmlFor="username">
                Username
                <Input type="text" name="username" value={formData.username} onChange={handleChange} />
              </Label>
              <Label htmlFor="password">
                Password
                <Input type="password" name="password" value={formData.password} onChange={handleChange} />
              </Label>
            </Col>
            <Col lg="6">
              <Row className="p-4">
                <Col>
                  <SubmitButton type="submit">Sign In</SubmitButton>
                </Col>
                <Col>
                  <SubmitButton type="submit">Sign Up</SubmitButton>
                </Col>
              </Row>
              <Row className="p-4">
                <Button buttonType={'google'}></Button>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignInModal;
