import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/settings';

// Components
import { ClassPageContainer, AssignmentsContainer, ClassHeader } from './class-page.styles';
import AssignmentSection from '../../components/class-components/assignment-section/assignment-section';
import ProgressBar from '../../components/progress-bar/progress-bar';
import { Col, Row } from 'react-bootstrap';
import { ClassContext } from '../../contexts/class';

const ClassPage = ({ classId }) => {
  const { name, setName, semester, setSemester, score, setScore, assignmentTypes, setAssignmentTypes } =
    useContext(ClassContext);

  useEffect(() => {
    const fetchClass = async () => {
      const url = `${BASE_URL}classes/classes/${classId}`;
      try {
        const response = await axios.get(url);
        const classData = response.data;
        const assignmentTypes = classData.assignment_types.reduce((acc, obj) => {
          acc[obj.id] = { ...obj };
          return acc;
        }, {});
        setName(classData.name);
        setSemester(classData.semester);
        setScore(classData.score);
        setAssignmentTypes(assignmentTypes);
        console.log(assignmentTypes);
      } catch (error) {
        console.error('Error fetching class:', error);
      }
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
            <AssignmentSection key={aType.id} atId={aType.id} className="mb-4"></AssignmentSection>
          ))}
      </AssignmentsContainer>
    </ClassPageContainer>
  );
};

export default ClassPage;
