import { DesiredScore, DesiredScoreContainer, SuccessMsg } from './desired-score.styles';
import { COLOR_ZONES, formatFloat } from '../../../utils/utils';
import { useState, useEffect, Fragment } from 'react';

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

const DesiredScoreShowcase = ({ desiredScore, score }) => {
  const [desiredScoreDistance, setDesiredScoreDistance] = useState(0);
  const [desiredScoreColor, setDesiredScoreColor] = useState('');
  const [desiredScoreMet, setDesiredScoreMet] = useState(false);

  useEffect(() => {
    const newDistance = formatFloat(desiredScore - score, 2);
    setDesiredScoreDistance(newDistance);
    setDesiredScoreColor(getDesiredScoreColor(newDistance));
  }, [desiredScore, score]);

  useEffect(() => {
    setDesiredScoreMet(desiredScoreDistance <= 0);
  }, [desiredScoreDistance]);

  return (
    <DesiredScoreContainer>
      {!desiredScoreMet && (
        <Fragment>
          <DesiredScore color={desiredScoreColor}>{desiredScoreDistance}%</DesiredScore>to Desired Score
        </Fragment>
      )}
      {desiredScoreMet && <SuccessMsg>You have reached your desired score!</SuccessMsg>}
    </DesiredScoreContainer>
  );
};

export default DesiredScoreShowcase;
