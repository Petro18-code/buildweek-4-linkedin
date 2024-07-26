import { Card } from "react-bootstrap";
import { PencilFill, PlusLg } from "react-bootstrap-icons";


const Courses = () => {
  return (
    <>
      <Card id="courses" className="mb-2">
        <Card.Body className="pb-0">
          <div className="d-flex flex-row">
            <Card.Title>Corsi</Card.Title>
            <span className="d-flex flex-row ml-auto">
              <PlusLg size={26} className="mt-1 mr-4" />
              <PencilFill size={20} style={{ marginTop: ".5em" }} />
            </span>
          </div>

          {/* Usa div invece di Card.Text per evitare l'annidamento di <p> */}
          <div className="mt-3 mb-0">
            <p>English School</p>
            <p>Coding Bootcamp</p>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Courses;
