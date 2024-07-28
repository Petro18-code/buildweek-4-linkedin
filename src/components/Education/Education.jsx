import { Card } from 'react-bootstrap';
import { PencilFill, PlusLg } from 'react-bootstrap-icons';

import './Education.css';
const Education = () => {
  return (
    <Card
    className="px-2 mt-4 mb-2"
    style={{
      borderRadius: '9px',
    }}
  >
    <div className="d-flex flex-row align-items-center justify-content-between">
      <h5 className="title__activity mb-4">Formazione</h5>
      <div className="d-flex">
        <PlusLg size={26} className="me-3 mt-4" />
        <PencilFill size={20} className="mt-4" />
      </div>
    </div>
  
    <div className="px-3">
      <div className="row mb-3">
        <div className="col-2 col-sm-1">
          <img
            src="https://strive.school/favicon.ico"
            alt="Strive School Logo"
            className="img-fluid"
            style={{ width: '3em', height: '3em' }}
          />
        </div>
        <div className="col-10 col-sm-11">
          <h6>Strive School</h6>
          <p>
            <small>Front-End Developer</small>
            <br />
            <small className="text-muted">Sep 2022 - Presente · 6 mesi</small>
            <br />
            React, Redux, JS, HTML, CSS
          </p>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-2 col-sm-1">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNhVyHu5OACnFHxC_p2GvxaohaKoV5jgAyX24XbxpVIH17txURg5aKC60IHQ&s=10"
            alt="Google Logo"
            className="img-fluid"
            style={{ width: '3em', height: '3em' }}
          />
        </div>
        <div className="col-10 col-sm-11">
          <h6>Google</h6>
          <p>
            <small>Communication Marketing</small>
            <br />
            <small className="text-muted">
              2012 - 2016
              <br />
              Tampa, Florida, USA
            </small>
          </p>
        </div>
      </div>
    </div>
    <Card.Footer
      className="d-flex justify-content-center text-muted"
      style={{ backgroundColor: 'transparent' }}
    >
      <Card.Text>Mostra tutti i titoli di studio (2)</Card.Text>
    </Card.Footer>
  </Card>
  );
};
export default Education;

