import { Fragment, useEffect, useState } from 'react';
import { destroyClass, patchClass } from '../../../utils/api';
import { formatFloat } from '../../../utils/utils';

// Imported
import { ChromePicker } from 'react-color';
import { Link } from 'react-router-dom';

// Custom
import {
  CardContainer,
  OptionsContainer,
  InfoContainer,
  Code,
  Title,
  Score,
  DropdownOption,
} from './class-card.styles';
import Dropdown from '../../dropdown/dropdown';
import VModal from '../../v-modal/v-modal';

const ClassCard = ({ cls }) => {
  const [color, setColor] = useState(cls.display_color);
  const [pickColor, setPickColor] = useState(false);

  const colorChangeHandler = (newColor) => {
    setColor(newColor.hex);
  };

  const colorChangeCompleteHandler = async (newColor) => {
    const toUpdate = { display_color: newColor.hex };
    await patchClass(cls.id, toUpdate);
  };

  const handleDropdownOptionClick = (e) => {
    e.preventDefault();
    setPickColor(true);
  };

  const documentClickHandler = (e) => {
    if (pickColor) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const handleDeleteClass = async (e) => {
    e.preventDefault();
    await destroyClass(cls.id);
    window.location.reload();
  };

  useEffect(() => {
    document.addEventListener('click', documentClickHandler);

    return () => {
      document.removeEventListener('click', documentClickHandler);
    };
  }, []);

  return (
    <Fragment>
      <Link to={`/class/${cls.id}`}>
        <CardContainer color={color}>
          <OptionsContainer>
            <Dropdown
              children={
                <Fragment>
                  <DropdownOption onClick={handleDropdownOptionClick}>Edit Color</DropdownOption>
                  <DropdownOption onClick={handleDeleteClass}>Delete {cls.code}</DropdownOption>
                </Fragment>
              }
              style={{ color: 'black', width: '100px' }}
            />
          </OptionsContainer>
          <InfoContainer>
            <Code>{cls.code}</Code>
            <Title>{cls.title}</Title>
            <Score>{formatFloat(cls.score, 2)} %</Score>
          </InfoContainer>
        </CardContainer>
      </Link>
      <VModal
        show={pickColor}
        onHide={() => setPickColor(false)}
        onClick={(e) => e.stopPropagation()}
        header={`Change Display Color for ${cls.code}`}
        body={
          <ChromePicker
            onChange={colorChangeHandler}
            onChangeComplete={colorChangeCompleteHandler}
            color={color}
            styles={{ default: { picker: { width: '100%', height: '100%' } } }}
          />
        }
      />
    </Fragment>
  );
};

export default ClassCard;
