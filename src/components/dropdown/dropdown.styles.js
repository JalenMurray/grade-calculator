import styled from 'styled-components';

export const Menu = styled.div`
  position: relative;
  cursor: pointer;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  background-color: #faf3dd;
  border: 1px solid black;
  cursor: pointer;

  span {
    padding: 12px;
    text-decoration: none;
    color: black;
    display: block;
  }
`;
