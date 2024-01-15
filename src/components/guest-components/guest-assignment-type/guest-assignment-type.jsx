import { useContext, useEffect, useState, Fragment } from 'react';
import { formatFloat } from '../../../utils/utils';
import { createAssignment, patchAssignmentType, destroyAssignmentType } from '../../../utils/api';

// Contexts
import { ClassContext } from '../../../contexts/class';

// Components
import { AssignmentsContainer } from './guest-assignment-type.styles';
import Assignment from '../../assignments/assignment/assignment';
import AssignmentTypeHeader from '../../assignments/assignment-type-header/assignment-type-header';

const GuestAssignmentType = ({ atId }) => {
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
      <AssignmentTypeHeader at={assignmentType} guest={true} />
      {assignmentType.assignments &&
        assignmentType.assignments.map((_, i) => <Assignment key={i} atId={assignmentType.id} aIdx={i} guest={true} />)}
    </AssignmentsContainer>
  );
};

export default GuestAssignmentType;
