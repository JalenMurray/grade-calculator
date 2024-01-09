import { useEffect, useState } from 'react';
import { patchAssignment } from '../../../utils/api';

// Components
import { Input, Header } from './assignment-input.styles';

const INPUT_TYPE_PROPS = {
  num: { type: 'text', inputMode: 'numeric', pattern: '[0-9]*[.,]?[0-9]+' },
  text: { type: 'text' },
};

const AssignmentInput = ({ assignmentId, inputType, ...otherProps }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [typeProps, setTypeProps] = useState({});

  useEffect(() => {
    const inputProps = INPUT_TYPE_PROPS[inputType];
    setTypeProps(inputProps);
  }, [inputType]);

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    await patchAssignment(assignmentId, { [name]: value });
    setIsEditing(false);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  return (
    <div>
      {isEditing && <Input autoFocus onBlur={handleBlur} {...typeProps} {...otherProps}></Input>}
      {!isEditing && <Header onClick={handleClick}>{otherProps.value}</Header>}
    </div>
  );
};

export default AssignmentInput;
