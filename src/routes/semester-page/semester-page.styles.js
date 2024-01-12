import styled from 'styled-components';

export const SemesterHeaderContainer = styled.div`
  padding: 10px;
  width: 100%;
`;

export const GPA = styled.span`
  color: ${(props) => props.theme.secondary};
  font-size: 1.4rem;
`;

export const ClassCard = styled.div`
  padding: 10px;
  width: 100%;
  min-height: 25vh;
  border-radius: 15px;
  background-color: ${(props) => props.theme.info};
  text-align: center;
`;

export const ClassCode = styled.h1`
  color: ${(props) => props.theme.light};
  font-size: 2rem;
  margin-top: 6vh;
`;

export const ClassScore = styled.h1`
  color: ${(props) => props.theme.light};
  font-size: 2rem;
`;

export const ClassTitle = styled.h1`
  color: ${(props) => props.theme.light};
  font-size: 1.8rem;
  width: 100%;
`;
