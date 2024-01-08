import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const SubmitButton = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  :hover {
    background-color: green;
  }
`;

export const ButtonContainer = styled.div`
  padding: 2rem;
  display: flex;
`;
