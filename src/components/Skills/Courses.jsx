import { Card } from "react-bootstrap";
import { PencilFill, PlusLg } from "react-bootstrap-icons";


const Courses = () => {
  return (
    <>
    <Card id="courses" className="mb-2">
      <Card.Body className="pb-0">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
          <Card.Title className="mb-2 mb-md-0">Corsi</Card.Title>
          <div className="d-flex flex-row ms-auto align-items-center">
            <PlusLg size={26} className="me-2" />
            <PencilFill size={20} className="" />
          </div>
        </div>
  
       
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