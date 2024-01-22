import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { formatFloat } from '../../utils/utils';
import { createClass, getSemester } from '../../utils/api';
import { UserContext } from '../../contexts/user';

// Imported
import { Row, Col, Container, Button } from 'react-bootstrap';
import { AddCircleOutline } from '@mui/icons-material';

// Custom
import { SemesterHeaderContainer, GPA, ButtonContainer } from './semester-page.styles';
import VModal from '../../components/v-modal/v-modal';
import Form from '../../components/form/form';
import { PageContainer, ContentContainer } from '../../components/basic-component.styles';
import ClassCard from '../../components/semesters/class-card/class-card';
import BackButton from '../../components/back-button/back-button';
import Unauthorized from '../../components/unauthorized/unauthorized';

const SemesterPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [semester, setSemester] = useState({});
  const [colsPerRow, setColsPerRow] = useState(3);
  const [classGrid, setClassGrid] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newClassForm, setNewClassForm] = useState({
    code: '',
    title: '',
    units: 0,
    desired_score: 70,
  });
  const [authorized, setAuthorized] = useState(null);
  const [authMsg, setAuthMsg] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const data = await getSemester(id);
      setSemester(data);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (user.id === semester.user) {
      setAuthorized(true);
    } else {
      console.log('setting false');
      setAuthorized(false);
      const msg = user.id ? 'You do not have access to this semester' : 'You must be logged in to view this page';
      setAuthMsg(msg);
    }
  }, [user, semester]);

  useEffect(() => {
    document.title = `${semester.season} ${semester.year}`;

    return () => {
      document.title = 'Grade Master';
    };
  }, [semester]);

  useEffect(() => {
    const grid = [];
    if (semester.classes) {
      for (let i = 0; i < semester.classes.length; i += colsPerRow) {
        const row = semester.classes.slice(i, i + colsPerRow);
        grid.push(row);
      }
      setClassGrid(grid);
    }
  }, [semester, colsPerRow]);

  const handleAddClass = async (e) => {
    e.preventDefault();
    const newClass = { ...newClassForm, semester: id, user: semester.user };
    const data = await createClass(newClass);
    const newClassList = [...semester.classes, data];
    setSemester({ ...semester, classes: newClassList });
    setModalOpen(false);
  };

  const handleAddClassChange = (e) => {
    const { name, value } = e.target;
    setNewClassForm({ ...newClassForm, [name]: value });
  };

  if (authorized == null) {
    return <PageContainer></PageContainer>;
  }

  return authorized ? (
    <PageContainer>
      <SemesterHeaderContainer>
        <BackButton text={'Semesters'} url={`/semester`} />
        <h1>
          {semester.season} {semester.year}
        </h1>
        <GPA>GPA: {formatFloat(semester.gpa, 2)}</GPA>
      </SemesterHeaderContainer>
      <Container fluid>
        <Row>
          <Col lg="1">
            <ButtonContainer>
              <Button variant="success" size="lg" onClick={() => setModalOpen(true)}>
                <AddCircleOutline /> Add Class
              </Button>
            </ButtonContainer>
          </Col>
          <Col lg="10">
            <ContentContainer>
              <Container fluid>
                {classGrid &&
                  classGrid.map((row, i) => {
                    return (
                      <Row key={i} style={{ marginTop: '20px' }}>
                        {row.map((cls, j) => {
                          return (
                            <Col lg={12 / colsPerRow} key={j}>
                              <ClassCard cls={cls} />
                            </Col>
                          );
                        })}
                      </Row>
                    );
                  })}
              </Container>
            </ContentContainer>
          </Col>
          <Col lg="1"></Col>
        </Row>
      </Container>
      <VModal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        header={'New Class'}
        body={
          <Form
            formData={[
              {
                label: 'Code',
                name: 'code',
                value: newClassForm.code,
                placeholder: 'Ex. CMSC101',
                onChange: handleAddClassChange,
              },
              {
                label: 'Title',
                name: 'title',
                value: newClassForm.title,
                placeholder: 'Ex. Intro to Compute: Science',
                onChange: handleAddClassChange,
              },
              {
                label: 'Units/Credits',
                name: 'units',
                value: newClassForm.units,
                type: 'number',
                onChange: handleAddClassChange,
              },
              {
                label: 'Desired Score',
                name: 'desired_score',
                value: newClassForm.desired_score,
                type: 'number',
                onChange: handleAddClassChange,
              },
            ]}
            onSubmit={handleAddClass}
          />
        }
      />
    </PageContainer>
  ) : (
    <Unauthorized msg={authMsg} />
  );
};

export default SemesterPage;
