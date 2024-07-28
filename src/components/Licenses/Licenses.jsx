import { Card, Container, Row } from "react-bootstrap";
import "./Licenses.css";
const Licenses = () => {
  return (
    <Card
    className="px-2 mt-4 mb-2"
    style={{
      borderRadius: '9px',
    }}
  >
    <h5 className="title__activity mb-4">Licenze e certificazioni</h5>
  
    <div className="px-3">
      <div className="row mb-3 align-items-center">
        <div className="col-2 col-sm-1">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
            alt="React Logo"
            className="img-fluid"
            style={{ width: '3em', height: '3em' }}
          />
        </div>
        <div className="col-10 col-sm-11">
          <h6>React-Redux Developer</h6>
          <p>
            <small>JSpiders - Training & Development Center</small>
            <br />
            <small className="text-muted">Issued Jun 2017 · No Expiration Date</small>
          </p>
        </div>
      </div>
  
      <hr />
  
      <div className="row mb-3 align-items-center">
        <div className="col-2 col-sm-1">
          <img
            src="https://strive.school/favicon.ico"
            alt="Strive School Logo"
            className="img-fluid"
            style={{ width: '3em', height: '3em' }}
          />
        </div>
        <div className="col-10 col-sm-11">
          <h6>Module-1</h6>
          <p>
            <small>Strive School</small>
          </p>
        </div>
      </div>
  
      <hr />
  
      <div className="row align-items-center">
        <div className="col-2 col-sm-1">
          <img
            src="https://strive.school/favicon.ico"
            alt="Strive School Logo"
            className="img-fluid"
            style={{ width: '3em', height: '3em' }}
          />
        </div>
        <div className="col-10 col-sm-11">
          <h6>Module-2</h6>
          <p>
            <small>Strive School</small>
          </p>
        </div>
      </div>
    </div>
  
    <Card.Footer
      className="d-flex justify-content-center text-muted"
      style={{ backgroundColor: 'transparent' }}
    >
      <Card.Text>Vedi tutte le licenze e le certificazioni</Card.Text>
    </Card.Footer>
  </Card>
  
  );
};
export default Licenses;