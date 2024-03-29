import styled from 'styled-components';

export const ContentContainer = styled.div`
  min-height: 60vh;
  height: fit-content;
  background-color: ${(props) => props.theme.secondary};
  width: 100%;
  border-radius: 15px;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 100px;
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  height: fit-content;
`;
