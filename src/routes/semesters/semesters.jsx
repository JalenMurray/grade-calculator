import { createSemester, getUser } from '../../utils/api';
import { useContext, useEffect, useState } from 'react';

// Imported
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { AddCircleOutline } from '@mui/icons-material';

// Custom
import { ButtonContainer, HeaderContainer } from './semesters.styles';
import { PageContainer, ContentContainer } from '../../components/basic-component.styles';
import SemesterCard from '../../components/semesters/semester-card/semester-card';
import VModal from '../../components/v-modal/v-modal';
import { UserContext } from '../../contexts/user';

const Semesters = () => {
  const { user } = useContext(UserContext);
  const [semesters, setSemesters] = useState([]);
  const [name, setName] = useState('');
  const [newSemesterForm, setNewSemesterForm] = useState({
    season: 'Fall',
    year: new Date().getFullYear(),
  });
  const [modalOpen, setModalOpen] = useState(false);

  const sortSemesters = (semesters) => {
    return semesters.sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year;
      }

      const seasonOrder = ['Winter', 'Spring', 'Summer', 'Fall'];
      return seasonOrder.indexOf(b.season) - seasonOrder.indexOf(a.season);
    });
  };

  useEffect(() => {
    if (user.display_name) {
      setName(user.display_name);
      setSemesters(sortSemesters(user.semesters));
    }
  }, [user]);

  const handleAddSemester = async (e) => {
    e.preventDefault();
    const newSemester = { ...newSemesterForm, user: 1 };
    const data = await createSemester(newSemester);
    const newSemesters = sortSemesters([...semesters, data]);
    setSemesters(newSemesters);
    setModalOpen(false);
    window.location.reload();
  };

  const handleSemesterAddChange = (e) => {
    const { name, value } = e.target;
    console.log(e);
    console.log('NEW FORM', { ...newSemesterForm, [name]: value });
    setNewSemesterForm({ ...newSemesterForm, [name]: value });
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <h1>Welcome {name}!</h1>
      </HeaderContainer>
      <Container fluid>
        <Row>
          <Col lg="1">
            <ButtonContainer>
              <Button size="lg" variant="success" onClick={() => setModalOpen(true)}>
                <AddCircleOutline /> Add Semester
              </Button>
            </ButtonContainer>
          </Col>
          <Col lg="10">
            <ContentContainer>
              {semesters && semesters.map((semester) => <SemesterCard key={semester.id} semester={semester} />)}
            </ContentContainer>
          </Col>
          <Col lg="1"></Col>
        </Row>
      </Container>
      <VModal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        header={'New Semester'}
        body={
          <Form onSubmit={handleAddSemester}>
            <Form.Group style={{ marginBottom: '20px' }}>
              <Form.Label style={{ fontSize: '20px' }}>Semester:</Form.Label>
              <Form.Check
                type="radio"
                label="Winter"
                name="season"
                value="Winter"
                checked={newSemesterForm.season === 'Winter'}
                onChange={handleSemesterAddChange}
              />
              <Form.Check
                type="radio"
                label="Spring"
                name="season"
                value="Spring"
                checked={newSemesterForm.season === 'Spring'}
                onChange={handleSemesterAddChange}
              />
              <Form.Check
                type="radio"
                label="Summer"
                name="season"
                value="Summer"
                checked={newSemesterForm.season === 'Summer'}
                onChange={handleSemesterAddChange}
              />
              <Form.Check
                type="radio"
                label="Fall"
                name="season"
                value="Fall"
                checked={newSemesterForm.season === 'Fall'}
                onChange={handleSemesterAddChange}
              />
            </Form.Group>
            <Form.Group style={{ marginBottom: '20px' }}>
              <Form.Label>Year:</Form.Label>
              <Form.Control type="number" name="year" value={newSemesterForm.year} onChange={handleSemesterAddChange} />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        }
      />
    </PageContainer>
  );
};

export default Semesters;
