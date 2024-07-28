import { Card, Image } from "react-bootstrap";
import "./Skills.css";

const Interests = () => {
  return (
    <>
    <Card id="interests" className="mb-2">
      <Card.Body className="pb-0">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
          <Card.Title className="mb-2 mb-md-0">Interessi</Card.Title>
        </div>
  
        <div className="d-flex flex-column flex-md-row mt-3 mb-0">
          <p className="me-3">Aziende</p>
          <p>Scuola</p>
        </div>
  
        <div className="d-flex flex-column flex-md-row mt-2 border-bottom">
          <div className="d-flex flex-row align-items-center me-md-5 mb-3 mb-md-0">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjLZu_hYhHfytqB5EAVhhh2RBgOXPdeGnXdQIeczjBdg&s=10"
              alt="startup logo"
              className="me-3"
              style={{ width: "2em", height: "2em" }}
            />
            <span className="d-flex flex-column justify-content-center">
              <h6 className="mb-0">Microsoft</h6>
              <span>4,851 followers</span>
            </span>
          </div>
  
          <div className="d-flex flex-row align-items-center ms-md-5">
            <Image
              src="https://strive.school/favicon.ico"
              alt="startup logo"
              className="me-3"
              style={{ width: "2em", height: "2em" }}
            />
            <span className="d-flex flex-column justify-content-center">
              <h6 className="mb-0">Strive School</h6>
              <span>2,242 followers</span>
            </span>
          </div>
        </div>
      </Card.Body>
  
      <Card.Footer className="text-center">
        <span className="mb-0">Mostra tutte le aziende (68)</span>
      </Card.Footer>
    </Card>
  </>
  
  );
};
export default Interests;