import { useEffect, useState } from 'react';
import { patchAssignment } from '../../../utils/api';

// Components
import ClickableInput from '../../clickable-input/clickable-input';

const INPUT_TYPE_PROPS = {
  num: { type: 'number' },
  text: { type: 'text' },
};

const AssignmentInput = ({ assignmentId, inputType, ...otherProps }) => {
  const [typeProps, setTypeProps] = useState({});

  useEffect(() => {
    const inputProps = INPUT_TYPE_PROPS[inputType];
    setTypeProps(inputProps);
  }, [inputType]);

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    await patchAssignment(assignmentId, { [name]: value });
  };

  return <ClickableInput input={'light'} header={'darkSpan'} blur={handleBlur} {...typeProps} {...otherProps} />;
};

export default AssignmentInput;
