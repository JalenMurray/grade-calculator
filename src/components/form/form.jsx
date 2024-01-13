import { Fragment, useEffect, useState } from 'react';
import { FormContainer, Label, Input } from './form.styles';
import Button from '../button/button';
import { Row, Col } from 'react-bootstrap';

// Ex. Form Data
// [
//   { label: 'somelabel', name: 'somename', value: 'somevalue', onChange: '', ...otherProps },
//   { label: 'somelabel', name: 'somename', value: 'somevalue', onChange: '', ...otherProps },
// ];

const Form = ({ formData, onSubmit }) => {
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    setFormFields(formData);
  }, [formData]);

  const handleChangeBase = (e, handleChange, i) => {
    if (handleChange) {
      return handleChange(e);
    }
    const { value } = e.target;
    const newFormFields = formFields.map((field, j) => {
      if (i === j) {
        return { ...field, value: value };
      }
      return field;
    });
    setFormFields(newFormFields);
  };

  return (
    <FormContainer onSubmit={onSubmit}>
      <Row>
        <Col lg="12"></Col>
        {formFields.map((field, i) => {
          const { label, name, value, onChange, ...otherProps } = field;
          return (
            <Fragment key={i}>
              <Label htmlFor={name}>
                {label}
                <Input name={name} value={value} onChange={(e) => handleChangeBase(e, onChange, i)} {...otherProps} />
              </Label>
            </Fragment>
          );
        })}
        <Row className="p-4">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Row>
      </Row>
    </FormContainer>
  );
};

export default Form;
