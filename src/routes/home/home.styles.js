import { Button } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';

const fadeInSiteName = keyframes`
  from {
    opacity: 0;
    transform: translateY(0);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const SiteNameContainer = styled.div`
  height: 80vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${(props) => props.theme.dark};
`;

export const SiteName = styled.h1`
  font-size: 6rem;
  margin-top: 40vh;
  animation: ${fadeInSiteName} 2s;
`;

export const Description = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;
  animation: ${fadeIn} 6s;
`;

export const HeaderButtonContainer = styled.div`
  animation: ${fadeIn} 6s;
`;

export const HeaderButton = styled(Button)`
  margin: 20px;
`;

export const SectionContainer = styled.div`
  height: 80vh;
`;

export const FeaturesContainer = styled(SectionContainer)`
  background-color: ${(props) => props.theme.info};
  padding: 40px;
  text-align: center;
`;

export const SectionHeader = styled.h1`
  font-size: 4rem;
  margin-bottom: 50px;
  margin-top: 25vh;
`;

export const SectionText = styled.h4`
  font-size: 2rem;
`;
