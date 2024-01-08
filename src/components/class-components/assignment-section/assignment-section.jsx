import { AddButton, AssignmentsContainer } from './assignment-section.styles';
import Assignment from '../assignment/assignment';
import axios from 'axios';
import { BASE_URL } from '../../../utils/settings';

import { AddCircleOutline } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ClassContext } from '../../../contexts/class';

const AssignmentSection = ({ atId }) => {
  const { assignmentTypes } = useContext(ClassContext);
  const [assignmentType, setAssignmentType] = useState({});
  const [name, setName] = useState('');
  const [totalScore, setTotalScore] = useState(0.0);
  const [maxTotalScore, setMaxTotalScore] = useState(0.0);
  const [lostPoints, setLostPoints] = useState(0.0);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    setAssignmentType(assignmentTypes[atId]);
  }, []);

  useEffect(() => {
    setName(assignmentType.name);
    setTotalScore(assignmentType.total_score);
    setMaxTotalScore(assignmentType.max_total_score);
    setAssignments(assignmentType.assignments);
  }, [assignmentType]);

  useEffect(() => {
    setLostPoints(maxTotalScore - totalScore);
  }, [maxTotalScore, totalScore]);

  const updatedFloat = (n) => {
    if (n) {
      return parseFloat(n.toFixed(2));
    }
    return '';
  };

  const handleAdd = async () => {
    const id = assignmentType.id;
    const newAssignment = {
      name: assignmentType.default_name,
      assignment_type: id,
    };
    const url = `${BASE_URL}classes/assignments/`;
    try {
      const response = await axios.post(url, newAssignment);
      console.log(response);
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  return (
    <AssignmentsContainer>
      <Row className="mt-4">
        <Col lg="8">
          <h3>
            {name}
            <AddButton>
              <AddCircleOutline onClick={handleAdd} />
            </AddButton>
          </h3>
        </Col>
        <Col className="pt-2" lg="2">
          <h4>
            {updatedFloat(totalScore)} / {updatedFloat(maxTotalScore)}
          </h4>
        </Col>
        <Col className="pt-2" lg="2">
          <h4>{updatedFloat(lostPoints)}</h4>
        </Col>
      </Row>
      <hr />
      {assignments &&
        assignments.map((assignment, i) => <Assignment key={assignment.id} atId={assignmentType.id} aIdx={i} />)}
    </AssignmentsContainer>
  );
};

export default AssignmentSection;
