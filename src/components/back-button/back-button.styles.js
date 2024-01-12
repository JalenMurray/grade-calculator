import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BackButtonContainer = styled(Link)`
  text-decoration: none;
  margin-left: 0;
`;

export const BackButtonText = styled.h4`
  color: ${(props) => props.theme.secondary};
  font-size: 1.3rem;
`;
