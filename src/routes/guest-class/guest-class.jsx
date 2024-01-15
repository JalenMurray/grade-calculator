import { Fragment, useContext, useEffect, useState } from 'react';
import { COLOR_ZONES, formatFloat } from '../../utils/utils';
import { getClass } from '../../utils/api';

// Components
import {
  ClassPageContainer,
  ClassHeader,
  ButtonContainer,
  ButtonIconContainer,
  DesiredScoreContainer,
  DesiredScore,
  SuccessMsg,
  ClassName,
} from '../class-page/class-page.styles';
import { ContentContainer } from '../../components/basic-component.styles';
import ProgressBar from '../../components/progress-bar/progress-bar';
import Button from '../../components/button/button';
import { Col, Container, Row } from 'react-bootstrap';
import { Share, ImportExport, AddCircleOutline, Edit, ColorLens } from '@mui/icons-material';

// Context
import { ClassContext } from '../../contexts/class';
import GuestAssignmentType from '../../components/guest-components/guest-assignment-type/guest-assignment-type';

const getDesiredScoreColor = (distance) => {
  if (distance <= 5) {
    return COLOR_ZONES[4];
  } else if (distance <= 7.5) {
    return COLOR_ZONES[3];
  } else if (distance <= 10) {
    return COLOR_ZONES[2];
  } else if (distance <= 12.5) {
    return COLOR_ZONES[1];
  } else {
    return COLOR_ZONES[0];
  }
};

const DEFAULT_CLASS = {
  desired_score: 70,
  score: 0,
  assignmentTypes: [],
};

const GuestClass = () => {
  const { currentClass, setCurrentClass, updateClass, assignmentTypes, setAssignmentTypes, addAssignmentType } =
    useContext(ClassContext);
  const [atId, setAtId] = useState(1);
  const [desiredScoreDistance, setDesiredScoreDistance] = useState(0);
  const [desiredScoreColor, setDesiredScoreColor] = useState('');
  const [desiredScoreMet, setDesiredScoreMet] = useState(false);

  useEffect(() => {
    const fetchClass = async () => {
      const foundClass = await getClass(41);

      const assignmentTypes = foundClass.assignment_types.reduce((acc, obj) => {
        acc[obj.id] = { ...obj };
        return acc;
      }, {});
      setCurrentClass(foundClass);
      setAssignmentTypes(assignmentTypes);
      console.log(foundClass);
    };
    fetchClass();

    document.title = `Guest Class`;
    return () => {
      document.title = 'Grade Calculator';
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log('CURRENT CLASS UPDATED', currentClass);
    const newDistance = formatFloat(currentClass.desired_score - currentClass.score, 2);
    setDesiredScoreDistance(newDistance);
    setDesiredScoreColor(getDesiredScoreColor(newDistance));
  }, [currentClass]);

  useEffect(() => {
    setDesiredScoreMet(desiredScoreDistance <= 0);
  }, [desiredScoreDistance]);

  const handleAddAssignmentType = async () => {
    const newAssignmentType = {
      id: atId,
      name: 'New Assignment Type',
      max_score: 100,
      weight: 0,
      class_associated: 41,
      default_name: 'Assignment',
      lock_weights: false,
      assignments: [],
    };
    setAtId(atId + 1);
    addAssignmentType(newAssignmentType);
  };

  return (
    <ClassPageContainer className="text-dark m-4">
      <Container fluid>
        <Row>
          <Col lg="1">
            <DesiredScoreContainer>
              {!desiredScoreMet && (
                <Fragment>
                  <DesiredScore color={desiredScoreColor}>{desiredScoreDistance}%</DesiredScore>to Desired Score
                </Fragment>
              )}
              {desiredScoreMet && <SuccessMsg>You have reached your desired score!</SuccessMsg>}
            </DesiredScoreContainer>
            <ButtonContainer>
              <Button variant="success" className="text-light w-100" onClick={handleAddAssignmentType}>
                <ButtonIconContainer>
                  <AddCircleOutline />
                </ButtonIconContainer>
                Add Assignment Type
              </Button>
              {/*
              <Button variant="dark-secondary" className="text-light w-100" onClick={handleAddAssignmentType}>
                <ButtonIconContainer>
                  <ColorLens />
                </ButtonIconContainer>
                Customize Progress Bar
              </Button>
              <Button variant="danger" className="text-light w-100" onClick={handleAddAssignmentType}>
                <ButtonIconContainer>
                  <ImportExport />
                </ButtonIconContainer>
                Import/Export
              </Button>
              <Button variant="warning" className="text-light w-100" onClick={handleAddAssignmentType}>
                <ButtonIconContainer>
                  <Share />
                </ButtonIconContainer>
                Share
              </Button> */}
            </ButtonContainer>
          </Col>
          <Col lg="10">
            <ProgressBar percentage={currentClass.score} />
            <ContentContainer>
              <Row className="pb-4">
                <Col lg="2">Name</Col>
                <Col lg="4">Scores</Col>
                <Col lg="2">Weight</Col>
                <Col lg="2">Weighted Score</Col>
                <Col lg="2">Lost Points</Col>
              </Row>
              {assignmentTypes &&
                Object.values(assignmentTypes).map((aType, i) => <GuestAssignmentType key={i} atId={aType.id} />)}
            </ContentContainer>
          </Col>
          <Col lg="1">Something Else</Col>
        </Row>
      </Container>
    </ClassPageContainer>
  );
};

export default GuestClass;
