import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../utils/settings';

// Context

// Components
import { Input, Header } from '../assignment-input/assignment-input.styles';

const INPUT_TYPE_PROPS = {
  num: { type: 'text', inputMode: 'numeric', pattern: '[0-9]*[.,]?[0-9]+' },
  text: { type: 'text' },
};

const AssignmentInput = ({ assignmentId, inputType, ...otherProps }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [typeProps, setTypeProps] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    const inputProps = INPUT_TYPE_PROPS[inputType];
    setTypeProps(inputProps);
  }, []);

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    const url = `${BASE_URL}classes/assignments/${assignmentId}/`;
    const toUpdate = { [name]: value };
    console.log(toUpdate);
    console.log(url);
    try {
      const response = await axios.patch(url, toUpdate);
    } catch (error) {
      console.log('Error Editing Assignment:', error);
    }
    setIsEditing(false);
  };

  const handleClick = () => {
    setIsEditing(true);
    console.log(inputRef.current);
    inputRef.current && inputRef.current.select();
  };

  return (
    <div>
      {isEditing && <Input autoFocus onBlur={handleBlur} {...typeProps} {...otherProps}></Input>}
      {!isEditing && <Header onClick={handleClick}>{otherProps.value}</Header>}
    </div>
  );
};

export default AssignmentInput;
