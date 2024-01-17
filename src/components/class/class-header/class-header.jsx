import { Fragment } from 'react';

import BackButton from '../../back-button/back-button';
import { ClassHeaderContainer, ClassName } from './class-header.styles';

const ClassHeader = ({ headerStr, semester, color }) => {
  return (
    <Fragment>
      <BackButton text={semester.str} url={`/semester/${semester.id}`} />
      <ClassHeaderContainer>
        <ClassName color={color}>{headerStr}</ClassName>
        <span className="text-secondary">{semester.str}</span>
      </ClassHeaderContainer>
    </Fragment>
  );
};

export default ClassHeader;
