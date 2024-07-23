
import React from 'react';
import { Carousel } from 'react-bootstrap';

const HighlightCarousel = () => {
  return (
    <Card className="highlight-carousel-card mt-3">
      <Card.Body>
        <h4>Servizi in evidenza</h4>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/600x200"
              alt="First slide"
            />
            <Carousel.Caption>
              <h5>Servizio 1</h5>
              <p>Descrizione del servizio 1.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/600x200"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h5>Servizio 2</h5>
              <p>Descrizione del servizio 2.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/600x200"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h5>Servizio 3</h5>
              <p>Descrizione del servizio 3.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Card.Body>
    </Card>
  );
};

export default HighlightCarousel;
