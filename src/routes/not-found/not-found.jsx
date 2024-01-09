import { NotFoundContainer, NotFoundHeader, NotFoundText } from './not-found.styles';

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundHeader>404 Not Found</NotFoundHeader>
      <NotFoundText>Sorry the page you are looking for does not exist</NotFoundText>
    </NotFoundContainer>
  );
};

export default NotFound;
