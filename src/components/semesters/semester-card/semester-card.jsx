import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { StarSharp } from '@mui/icons-material';
import { formatFloat } from '../../../utils/utils';
import { SemesterCardContainer, NameContainer, GPAContainer, DropdownOption } from './semester-card.styles';
import Dropdown from '../../dropdown/dropdown';

const SemesterCard = ({ semester }) => {
  return (
    <Fragment>
      <Link to={`/semester/${semester.id}`}>
        <SemesterCardContainer>
          <NameContainer>
            <h1>
              {semester.season} {semester.year}
              {semester.current && <StarSharp style={{ marginLeft: '10px' }} />}
            </h1>
          </NameContainer>
          <GPAContainer>
            <h1>{formatFloat(semester.gpa, 2)}</h1>
          </GPAContainer>
          <Dropdown
            children={
              <Fragment>
                <DropdownOption>Set Current Semester</DropdownOption>
                <DropdownOption>Delete Semester</DropdownOption>
              </Fragment>
            }
            style={{ padding: '20px', fontSize: '20px', width: '100px' }}
          />
        </SemesterCardContainer>
      </Link>
    </Fragment>
  );
};

export default SemesterCard;
