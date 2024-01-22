import { Fragment, useContext, useEffect } from 'react';
import { FEATURES } from '../../utils/utils';
import { getUserAuth } from '../../utils/api';
import { signInWithGoogleRedirect } from '../../utils/firebase/firebase';

// Components
import {
  SiteNameContainer,
  SiteName,
  Description,
  HeaderButtonContainer,
  HeaderButton,
  FeaturesContainer,
  SectionHeader,
  SectionText,
} from './home.styles';
import { Row, Col } from 'react-bootstrap';
import Carousel from '../../components/carousel/carousel';
import { UserContext } from '../../contexts/user';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (user.current_semester) {
      navigate(`/semester/${user.current_semester.id}`);
    } else {
      signInWithGoogleRedirect();
    }
  };

  return (
    <Fragment>
      <SiteNameContainer>
        <SiteName>Grade Master</SiteName>
        <Description>Your go-to tool for tracking assignments, calculating grades, and more!</Description>
        <HeaderButtonContainer>
          <a href="/class/guest">
            <HeaderButton variant="secondary" size="lg">
              Use as a Guest
            </HeaderButton>
          </a>
          <HeaderButton variant="info" size="lg" onClick={handleLogin}>
            Login
          </HeaderButton>
        </HeaderButtonContainer>
      </SiteNameContainer>
      <FeaturesContainer>
        <Row style={{ height: '100%' }}>
          <Col lg="4">
            <SectionHeader>Features</SectionHeader>
            <SectionText>
              Explore the key features that set GradeMaster apart. Create and manage classes effortlessly, customize
              assignment types and weights for precise grading, and let our smart calculator handle the complexities,
              giving you the insights you need for academic excellence.
            </SectionText>
          </Col>
          <Col lg="8">
            <Carousel slides={FEATURES} />
          </Col>
        </Row>
      </FeaturesContainer>
    </Fragment>
  );
};

export default Home;

// 1. Welcome Section:

// Content:
// "Welcome to GradeMaster, your dedicated companion in academic success. Whether you're a student aiming for excellence or an educator streamlining your grading process, GradeMaster is here to simplify your academic journey."
// Fade Effect: Consider a subtle fade-in transition for the welcome message.
// 2. Features Section:

// Content:
// "Explore the key features that set GradeMaster apart. Create and manage classes effortlessly, customize assignment types and weights for precise grading, and let our smart calculator handle the complexities, giving you the insights you need for academic excellence."
// Fade Effect: Gradually fade in as users scroll through this section.
// 3. Calculator Section:

// Content:
// "Our intuitive grade calculator empowers you to foresee the impact of each assignment on your final grade. Set desired scores, calculate lost points, and gain a deep understanding of your academic progress."
// Fade Effect: Initiate a smooth fade-in when this section becomes visible.
// 4. Assignment Types Section:

// Content:
// "Diversify your grading approach with flexible assignment types. Define specific types like projects or exams, assign weights to ensure fairness, and watch as GradeMaster transforms grading into a transparent and efficient process."
// Fade Effect: Introduce this section with a gradual fade-in animation.
// 5. Future Features (Commented Out for Now):

// Content:
// "Exciting developments are on the horizon! Stay tuned for our upcoming feature – a built-in class schedule. Effortlessly manage your time and organize your academic life with GradeMaster."
// Fade Effect: Consider a subtle fade-in effect when this section is visible.
// 6. Get Started Section:

// Content:
// "Ready to revolutionize your academic journey? Sign up today and experience the power of GradeMaster. Take control of your grades, plan effectively, and embark on a path to success."
// Fade Effect: Conclude the page with a gentle fade-in as users reach the end.
