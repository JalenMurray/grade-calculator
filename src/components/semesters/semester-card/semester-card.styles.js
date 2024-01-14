import styled from 'styled-components';

export const SemesterCardContainer = styled.div`
  background-color: ${(props) => props.theme.info};
  border-radius: 15px;
  height: 75px;
  margin: 20px;
  display: flex;
  color: ${(props) => props.theme.light};
`;

export const NameContainer = styled.div`
  padding: 10px;
`;

export const GPAContainer = styled.div`
  margin-right: 10px;
  margin-left: auto;
  padding: 10px;
`;

export const DropdownOption = styled.span`
  font-size: 1rem;
  border: solid 1px black;
`;
