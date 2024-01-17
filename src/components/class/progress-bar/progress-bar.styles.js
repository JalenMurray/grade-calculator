import styled from 'styled-components';

export const BarContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  border: 1px solid black;
  border-radius: 8px;
`;

export const Progress = styled.div`
  height: 100%;
  background-color: ${(props) => props.color || 'green'};
  width: ${(props) => props.width || '100'};
  max-width: 100%;
  border-radius: 8px;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

export const ProgressNum = styled.h5`
  margin: auto;
  padding-top: 12px;
`;
