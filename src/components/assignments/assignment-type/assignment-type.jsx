import { useContext, useEffect, useState, Fragment } from 'react';
import { formatFloat } from '../../../utils/utils';
import { createAssignment, patchAssignmentType, destroyAssignmentType } from '../../../utils/api';

// Contexts
import { ClassContext } from '../../../contexts/class';

// Components
import { AddButton, AssignmentsContainer, LockIcon, DynamicValue } from './assignment-type.styles';
import Form from '../../form/form';
import VModal from '../../v-modal/v-modal';
import { Option } from '../assignment/assignment.styles';
import { AddCircleOutline, LockOpenRounded, LockRounded } from '@mui/icons-material';
import { Row, Col } from 'react-bootstrap';
import Assignment from '../assignment/assignment';
import Dropdown from '../../dropdown/dropdown';
import ClickableInput from '../../clickable-input/clickable-input';
import AssignmentTypeHeader from '../assignment-type-header/assignment-type-header';

const AssignmentType = ({ atId }) => {
  const { assignmentTypes, addAssignment, updateAssignmentType, deleteAssignmentType } = useContext(ClassContext);
  const [assignmentType, setAssignmentType] = useState({});
  const [lostPoints, setLostPoints] = useState(0.0);

  useEffect(() => {
    setAssignmentType(assignmentTypes[atId]);
  }, [assignmentTypes, atId]);

  useEffect(() => {
    setLostPoints(assignmentType.max_total_score - assignmentType.total_score);
  }, [assignmentType]);

  return (
    <AssignmentsContainer>
      <AssignmentTypeHeader at={assignmentType} guest={false} />
      {assignmentType.assignments &&
        assignmentType.assignments.map((assignment, i) => (
          <Assignment key={i} atId={assignmentType.id} aIdx={i} guest={false} />
        ))}
    </AssignmentsContainer>
  );
};

export default AssignmentType;
