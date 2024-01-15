import { Fragment, useState } from 'react';

// Components
import { BaseInput, Editing } from './clickable-input.styles';

const ClickableInput = ({ input, header, blur, ...otherProps }) => {
  const [isEditing, setIsEditing] = useState(false);

  const newHandleBlur = async (e) => {
    await blur(e);
    setIsEditing(false);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  return (
    <Fragment>
      {isEditing && <Editing autoFocus onBlur={newHandleBlur} {...otherProps}></Editing>}
      {!isEditing && <BaseInput onClick={handleClick} {...otherProps} />}
    </Fragment>
  );
};

export default ClickableInput;
