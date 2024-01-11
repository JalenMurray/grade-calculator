import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

export const CarouselImageContainer = styled.div`
  height: 90%;
  border: 3px solid black;
  border-radius: 20px;
  background-image: url(${(props) => props.$image});
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: #1a2745;
`;

export const CarouselDescriptionContainer = styled.div`
  height: 10%;
`;

export const CarouselRow = styled(Row)`
  height: 100%;
`;

export const ArrowContainer = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
