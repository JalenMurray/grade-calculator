import styled from 'styled-components';

const BaseInput = styled.input`
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  outline: none;
  cursor: text;
  background: transparent;
`;

export const LightInput = styled(BaseInput)`
  color: ${(props) => props.theme.light};
`;

export const DarkInput = styled(BaseInput)`
  color: ${(props) => props.theme.dark};
`;

const BaseSpanHeader = styled.span`
  cursor: pointer;
  font-size: 1.5rem;
`;

export const LightSpanHeader = styled(BaseSpanHeader)`
  color: ${(props) => props.theme.light};
`;

export const DarkSpanHeader = styled(BaseSpanHeader)`
  color: ${(props) => props.theme.dark};
`;

const BaseHeader = styled.h3`
  cursor: pointer;
`;

export const LightHeader = styled(BaseHeader)`
  color: ${(props) => props.theme.light};
`;

export const DarkHeader = styled(BaseHeader)`
  color: ${(props) => props.theme.dark};
`;
