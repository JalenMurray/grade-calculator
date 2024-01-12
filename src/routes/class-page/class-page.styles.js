import styled from 'styled-components';

export const ClassPageContainer = styled.div`
  width: 98%;
  min-height: 1920px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const ClassHeader = styled.header`
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`;

export const AssignmentsContainer = styled.div`
  width: 100%;
  height: 90%;
  border-radius: 15px;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const ButtonContainer = styled.div`
  margin-top: 50px;
`;

export const ButtonIconContainer = styled.span`
  margin-right: 10px;
`;

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
