import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatFloat } from '../../utils/utils';

// Components
import { SemesterHeaderContainer, SemesterPageContainer, GPA } from './semester-page.styles';
import { PageContainer, ContentContainer } from '../../components/basic-component.styles';
import { Row, Col, Container } from 'react-bootstrap';
import { getSemester } from '../../utils/api';
import ClassCard from '../../components/semesters/class-card/class-card';

const SemesterPage = () => {
  const { id } = useParams();
  const [semester, setSemester] = useState({});
  const [colsPerRow, setColsPerRow] = useState(3);
  const [classGrid, setClassGrid] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getSemester(id);
      setSemester(data);
    };
    fetch();
  }, [id]);

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

  return (
    <PageContainer>
      <SemesterHeaderContainer>
        <h1>
          {semester.season} {semester.year}
        </h1>
        <GPA>GPA: {formatFloat(semester.gpa, 2)}</GPA>
      </SemesterHeaderContainer>
      <Container fluid>
        <Row>
          <Col lg="1"></Col>
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
    </PageContainer>
  );
};

export default SemesterPage;
