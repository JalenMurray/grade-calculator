import { BarContainer, Progress, ProgressNum } from './progress-bar.styles';

import { useState, useEffect } from 'react';

const COLOR_ZONES = ['#FF0000', '#FFC100', '#FFFF00', '#D6FF00', '#63FF00'];

const ProgressBar = ({ percentage }) => {
  const [percent, setPercent] = useState(0);
  const [barColor, setBarColor] = useState('#63FF00');

  useEffect(() => {
    if (percentage) {
      setPercent(parseFloat(percentage.toFixed(2)));
    }
  }, [percentage]);

  useEffect(() => {
    if (percent >= 90) {
      setBarColor(COLOR_ZONES[4]);
    } else if (percent >= 85) {
      setBarColor(COLOR_ZONES[3]);
    } else if (percent >= 77) {
      setBarColor(COLOR_ZONES[2]);
    } else if (percent >= 70) {
      setBarColor(COLOR_ZONES[1]);
    } else {
      setBarColor(COLOR_ZONES[0]);
    }
  }, [percent]);

  return (
    <BarContainer>
      <Progress width={`${percent}%`} color={barColor}>
        <ProgressNum className="text-dark">{percent}%</ProgressNum>
      </Progress>
    </BarContainer>
  );
};

export default ProgressBar;
