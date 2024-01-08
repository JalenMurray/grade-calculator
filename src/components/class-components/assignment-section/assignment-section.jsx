import { AddButton, AssignmentsContainer } from './assignment-section.styles';
import Assignment from '../assignment/assignment';
import axios from 'axios';
import { BASE_URL } from '../../../utils/settings';

import { AddCircleOutline } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

const AssignmentSection = ({ assignmentType }) => {
  const [name, setName] = useState('');
  const [maxScore, setMaxScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0.0);
  const [maxTotalScore, setMaxTotalScore] = useState(0.0);
  const [weight, setWeight] = useState(0.0);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    setName(assignmentType.name);
    setMaxScore(assignmentType.max_score);
    setTotalScore(assignmentType.total_score);
    setMaxTotalScore(assignmentType.max_total_score);
    setWeight(assignmentType.weight);
    setAssignments(assignmentType.assignments);
  }, [assignmentType]);

  const handleAdd = async () => {
    const id = assignmentType.id;
    const newAssignment = {
      name: assignmentType.default_name,
      assignment_type: id,
    };
    const url = `${BASE_URL}classes/assignments/`;
    try {
      const response = await axios.post(url, newAssignment);
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
            {parseFloat(totalScore.toFixed(2))} / {parseFloat(maxTotalScore.toFixed(2))}
          </h4>
        </Col>
        <Col className="pt-2" lg="2">
          <h4>{parseFloat((maxTotalScore - totalScore).toFixed(2))}</h4>
        </Col>
      </Row>
      <hr />
      {assignments.map((assignment) => (
        <Assignment key={assignment.name} assignment={assignment} maxScore={maxScore} />
      ))}
    </AssignmentsContainer>
  );
};

export default AssignmentSection;
