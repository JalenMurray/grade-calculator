import styled from 'styled-components';

export const CardContainer = styled.div`
  padding: 10px;
  min-height: 25vh;
  border-radius: 15px;
  border: 2px solid black;
  background-color: ${(props) => props.color};
  text-align: center;
`;

export const Code = styled.h1`
  color: ${(props) => props.theme.dark};
  font-size: 2rem;
`;

export const Score = styled.h1`
  color: ${(props) => props.theme.dark};
  font-size: 2rem;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.dark};
  font-size: 1.8rem;
  width: 100%;
`;

export const OptionsContainer = styled.div`
  height: 10%;
  width: 100%;
  text-align: right;
  justify-content: right;
  align-items: right;
  font-size: '32px';
  cursor: 'pointer';
  display: flex;
`;

export const InfoContainer = styled.div`
  height: 80%;
  width: 100%;
  text-align: center;
  padding: 50px;
`;

export const DropdownOption = styled.span`
  font-size: 1rem;
`;
