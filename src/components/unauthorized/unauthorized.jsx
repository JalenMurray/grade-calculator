import { PageContainer } from '../basic-component.styles';
import { MessageContainer, Message } from './unauthorized.styles';

const Unauthorized = ({ msg }) => {
  return (
    <PageContainer>
      <MessageContainer>
        <Message>Access Denied{msg && `: ${msg}`}</Message>
      </MessageContainer>
    </PageContainer>
  );
};

export default Unauthorized;
