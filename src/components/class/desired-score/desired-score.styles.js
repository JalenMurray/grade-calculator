import styled from 'styled-components';

export const DesiredScoreContainer = styled.div`
  border-radius: 15px;
  color: ${(props) => props.theme.light};
  background-color: ${(props) => props.theme.darkSecondary};
  height: 70px;
  text-align: center;
`;

export const DesiredScore = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  padding-top: 10px;
  color: ${(props) => props.color};
`;

export const SuccessMsg = styled.p`
  padding-top: 5px;
  font-size: 18px;
  font-weight: bold;
  color: #63ff00;
`;
