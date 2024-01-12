import { BackButtonContainer, BackButtonText } from './back-button.styles';
import { ChevronLeft } from '@mui/icons-material';

const BackButton = ({ text, url }) => {
  return (
    <BackButtonContainer to={url}>
      <BackButtonText>
        <ChevronLeft />
        {text}
      </BackButtonText>
    </BackButtonContainer>
  );
};

export default BackButton;
