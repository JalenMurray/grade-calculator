import { useState, useEffect } from 'react';

import { CarouselRow, ArrowContainer, CarouselImageContainer, CarouselDescriptionContainer } from './carousel.styles';
import { Row, Col } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import exImage from '../../assets/feature-images/example-feature.png';

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slide, setSlide] = useState({});

  useEffect(() => {
    setSlide(slides[currentIndex]);
  }, [currentIndex]);

  const handleLeftClick = () => {
    if (currentIndex == 0) {
      setCurrentIndex(slides.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRightClick = () => {
    if (currentIndex == slides.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <CarouselRow>
      <ArrowContainer onClick={handleLeftClick} lg="1">
        <ChevronLeft style={{ fontSize: '6rem' }} />
      </ArrowContainer>
      <Col lg="10">
        <CarouselImageContainer $image={slide.image}></CarouselImageContainer>
        <CarouselDescriptionContainer>
          <h1>{slide.label}</h1>
          <p>{slide.description}</p>
        </CarouselDescriptionContainer>
      </Col>
      <ArrowContainer onClick={handleRightClick} lg="1">
        <ChevronRight style={{ fontSize: '6rem' }} />
      </ArrowContainer>
    </CarouselRow>
  );
};

export default Carousel;
