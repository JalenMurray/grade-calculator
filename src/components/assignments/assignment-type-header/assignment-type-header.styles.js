import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

export const Header = styled(Row)`
  margin-top: 30px;
`;

export const NameContainer = styled(Col)`
  display: flex;
`;

export const AddButton = styled.span`
  margin-left: 30px;
  cursor: pointer;
`;

export const LockIcon = styled.span`
  margin-left: 30px;
`;

export const DynamicValueContaier = styled(Col)`
  padding-top: 10px;
`;
