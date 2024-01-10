import { Fragment, useState } from 'react';

// Components
import {
  LightInput,
  DarkInput,
  LightSpanHeader,
  DarkSpanHeader,
  LightHeader,
  DarkHeader,
} from './clickable-input.styles';

const INPUT_TYPES = {
  light: LightInput,
  dark: DarkInput,
};

const HEADER_TYPES = {
  lightSpan: LightSpanHeader,
  darkSpan: DarkSpanHeader,
  light: LightHeader,
  dark: DarkHeader,
};

const getInput = (i) => INPUT_TYPES[i];

const getHeader = (h) => HEADER_TYPES[h];

const ClickableInput = ({ input, header, blur, ...otherProps }) => {
  const [isEditing, setIsEditing] = useState(false);
  const Input = getInput(input);
  const Header = getHeader(header);

  const newHandleBlur = async (e) => {
    await blur(e);
    setIsEditing(false);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  return (
    <Fragment>
      {isEditing && <Input autoFocus onBlur={newHandleBlur} {...otherProps}></Input>}
      {!isEditing && <Header onClick={handleClick}>{otherProps.value}</Header>}
    </Fragment>
  );
};

export default ClickableInput;
