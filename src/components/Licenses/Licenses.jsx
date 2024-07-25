import { Card, Container, Row } from "react-bootstrap";
import "./Licenses.css";
const Licenses = () => {
  return (
    <Card
      className="px-2 mt-4 mb-2"
      style={{
        borderRadius: "9px",
      }}
    >
      <h5 className="title__activity mb-4">Licenze e certificazioni</h5>

      <div style={{ marginLeft: "12px" }}>
        <div className="row">
          <div className="col-md-1">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
              alt=""
              style={{ width: "3em", height: "3em" }}
              className="ml-1"
            />
          </div>
          <div className="col-md-4">
            <h6>React-Redux Developer </h6>
            <p>
              <small>JSpiders - Training & Development Center </small>
              <br />
              <small className="text-muted">
                Issued Jun 2017 · No Expiration Date
              </small>
            </p>
          </div>
        </div>
      </div>

      <hr />

      <div style={{ marginLeft: "12px" }}>
        <div className="row">
          <div className="col-md-1">
            <img
              src="https://strive.school/favicon.ico"
              alt=""
              style={{ width: "3em", height: "3em" }}
              className="mr-2"
            />
          </div>
          <div className="col-md-4">
            <h6>Module-1</h6>
            <p>
              <small> Strive School</small>
            </p>
          </div>
        </div>
      </div>

      <hr />

      <div style={{ marginLeft: "12px" }}>
        <div className="row">
          <div className="col-md-1">
            <img
              src="https://strive.school/favicon.ico"
              alt=""
              style={{ width: "3em", height: "3em" }}
              className="mr-2"
            />
          </div>
          <div className="col-md-4">
            <h6>Module-2</h6>
            <p>
              <small> Strive School</small>
            </p>
          </div>
        </div>
      </div>

      <Card.Footer
        className="d-flex justify-content-center text-muted"
        style={{ backgroundColor: "transparent" }}
      >
        <Card.Text>Vedi tutte le licenze e le certificazioni</Card.Text>
      </Card.Footer>
    </Card>
  );
};
export default Licenses;
