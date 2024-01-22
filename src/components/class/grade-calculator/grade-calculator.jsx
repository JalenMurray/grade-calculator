import { ContentContainer } from '../../basic-component.styles';
import { Header, HeaderItem, ScoreHeader } from './grade-calculator.styles';
import AssignmentType from '../../assignments/assignment-type/assignment-type';

const GradeCalculator = ({ assignmentTypes }) => {
  return (
    <ContentContainer>
      <Header>
        <HeaderItem>Name</HeaderItem>
        <ScoreHeader>Score</ScoreHeader>
        <HeaderItem>Weight</HeaderItem>
        <HeaderItem>Weighted Score</HeaderItem>
        <HeaderItem>Lost Points</HeaderItem>
      </Header>
      {assignmentTypes &&
        Object.values(assignmentTypes).map((aType, i) => (
          <AssignmentType key={i} atId={aType.id} guest={false} className="mb-4" />
        ))}
    </ContentContainer>
  );
};

export default GradeCalculator;
