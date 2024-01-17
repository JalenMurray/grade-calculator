import styled from 'styled-components';

export const ClassHeaderContainer = styled.header`
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`;

export const ClassName = styled.h1`
  color: ${(props) => props.color};
`;
