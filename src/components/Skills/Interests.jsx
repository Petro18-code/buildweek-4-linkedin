import { Card, Image } from "react-bootstrap";
import "./Skills.css";

const Interests = () => {
  return (
    <>
      <Card id="interests" className="mb-2">
        <Card.Body className="pb-0">
          <div className="d-flex flex-row">
            <Card.Title>Interessi</Card.Title>
          </div>

          <Card.Text className="d-flex flex-row mt-3 mb-0">
            <p className="mr-3">Aziende</p>
            <p>Scuola</p>
          </Card.Text>
          <div className="d-flex flex-row  mt-2 border-bottom">
            <div className="d-flex flex-row mr-5">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjLZu_hYhHfytqB5EAVhhh2RBgOXPdeGnXdQIeczjBdg&s=10"
                alt="startup logo"
              />
              <span className="pl-3 d-flex flex-column justify-content-center">
                <h6 className="mb-0">Microsoft</h6>
                <p>4,851 followers</p>
              </span>
            </div>
            <div className="d-flex flex-row ml-5">
              <Image
                src="https://strive.school/favicon.ico"
                alt="startup logo"
              />
              <span className="pl-3 d-flex flex-column justify-content-center">
                <h6 className="mb-0">Strive School</h6>
                <p>2,242 followers</p>
              </span>
            </div>
          </div>
        </Card.Body>
        <Card.Footer className="text-center">
          <p className="mb-0">Mostra tutte le aziende (68)</p>
        </Card.Footer>
      </Card>
    </>
  );
};
export default Interests;
