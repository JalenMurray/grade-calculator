import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClass } from '../../utils/api';

// Components
import { ClassPageContainer, AssignmentsContainer, ClassHeader } from './class-page.styles';
import AssignmentType from '../../components/assignments/assignment-type/assignment-type';
import ProgressBar from '../../components/progress-bar/progress-bar';
import { Col, Row } from 'react-bootstrap';
import { ClassContext } from '../../contexts/class';

const ClassPage = () => {
  const { id } = useParams();
  const { name, setName, semester, setSemester, score, setScore, assignmentTypes, setAssignmentTypes } =
    useContext(ClassContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClass = async () => {
      const foundClass = await getClass(id);
      if (!foundClass) {
        navigate('/not_found');
        return;
      }

      const assignmentTypes = foundClass.assignment_types.reduce((acc, obj) => {
        acc[obj.id] = { ...obj };
        return acc;
      }, {});
      setName(foundClass.name);
      setSemester(foundClass.semester);
      setScore(foundClass.score);
      setAssignmentTypes(assignmentTypes);
    };
    fetchClass();
  }, []);

  return (
    <ClassPageContainer className="text-dark m-4">
      <ClassHeader className="text-light">
        <h1>{name}</h1>
        <span className="text-secondary">{semester}</span>
      </ClassHeader>
      <ProgressBar percentage={score} />
      <AssignmentsContainer className="bg-secondary m-3">
        <Row className="pb-4">
          <Col lg="2">Name</Col>
          <Col lg="4">Scores</Col>
          <Col lg="2">Weight</Col>
          <Col lg="2">Weighted Score</Col>
          <Col lg="2">Lost Points</Col>
        </Row>
        {assignmentTypes &&
          Object.values(assignmentTypes).map((aType) => (
            <AssignmentType key={aType.id} atId={aType.id} className="mb-4"></AssignmentType>
          ))}
      </AssignmentsContainer>
    </ClassPageContainer>
  );
};

export default ClassPage;
