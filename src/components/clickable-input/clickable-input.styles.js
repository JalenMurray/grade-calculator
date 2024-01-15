import styled from 'styled-components';

export const BaseInput = styled.input`
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  outline: none;
  cursor: pointer;
  background: transparent;
  color: ${(props) => props.theme.dark};
`;

export const Editing = styled(BaseInput)`
  color: ${(props) => props.theme.light};
`;
