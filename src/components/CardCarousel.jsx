import { Carousel, Card, Button } from 'react-bootstrap';
import { FaPencilAlt, FaEye } from 'react-icons/fa';
import './CardCarousel.css';

const CardCarousel = () => {
    const items = [
        {
          title: 'Disponibile a lavorare',
          description: 'Ruoli di Cameriera',
          more: 'Mostra dettagli',
        },
        {
            title: 'Disponibile a lavorare',
            description: 'Ruoli di Cameriera',
            more: 'Mostra dettagli',
        },
        {
            title: 'Disponibile a lavorare',
            description: 'Ruoli di Cameriera',
            more: 'Mostra dettagli',
        },
        {
            title: 'Disponibile a lavorare',
            description: 'Ruoli di Cameriera',
            more: 'Mostra dettagli',
          },
          {
              title: 'Disponibile a lavorare',
              description: 'Ruoli di Cameriera',
              more: 'Mostra dettagli',
          },
          {
              title: 'Disponibile a lavorare',
              description: 'Ruoli di Cameriera',
              more: 'Mostra dettagli',
          },
        
      ];
      const cardsPerSlide = 2;


  const groupedItems = Array.from({ length: Math.ceil(items.length / cardsPerSlide) }, (_, index) =>
    items.slice(index * cardsPerSlide, index * cardsPerSlide + cardsPerSlide)
  );

  return (
    <Carousel className="card-carousel">
      {groupedItems.map((group, index) => (
        <Carousel.Item key={index}>
          <div className="carousel-card-container">
            {group.map((item, idx) => (
              <Card key={idx} className="carousel-card">
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between p-0 m-0 ">{item.title} <Button variant="button">
                      <FaPencilAlt /> 
                    </Button></Card.Title>
                  <Card.Text className='p-0 m-0'>{item.description} </Card.Text>
                  <Card.Text className='p-0 m-0'>{item.more}</Card.Text>
                  
                </Card.Body>
              </Card>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default CardCarousel;
