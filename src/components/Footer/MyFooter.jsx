import "./MyFooter.css";
import { Container, Row, Col } from "react-bootstrap";
import { FaQuestion, FaCog, FaShieldAlt } from "react-icons/fa";
const MyFooter = () => {
  return (
    <footer className="my-footer">
      <Container className="me-2 mt-5">
        <Row className="footer-row">
          <Col xs={6} md={2} className="footer-column">
            <ul className="list-unstyled small">
              <li>
                <a href="#about">Informazioni</a>
              </li>
              <li>
                <a href="#accessibility">Accessibilità</a>
              </li>
              <li>
                <a href="#community-guidelines">
                  Informativa sulla community professionale
                </a>
              </li>
              <li>
                <a href="#careers">Carriera</a>
              </li>
            </ul>
          </Col>
          <Col xs={6} md={2} className="footer-column">
            <ul className="list-unstyled small">
              <li>
                <a href="#privacy-terms">Privacy e condizioni</a>
              </li>
              <li>
                <a href="#advertising-options">
                  Opzioni per gli annunci pubblicitari
                </a>
              </li>
              <li>
                <a href="#sales-solutions">Sales Solutions</a>
              </li>
              <li>
                <a href="#mobile">Mobile</a>
              </li>
            </ul>
          </Col>
          <Col xs={6} md={2} className="footer-column">
            <ul className="list-unstyled small">
              <li>
                <a href="#safety-center">Centro sicurezza</a>
              </li>
              <li>
                <a href="#talent-solutions">Talent Solutions</a>
              </li>
              <li>
                <a href="#marketing-solutions">Soluzioni di marketing</a>
              </li>
              <li>
                <a href="#advertising">Pubblicità</a>
              </li>
            </ul>
          </Col>
          <Col xs={6} md={2} className="footer-column">
            <ul className="list-unstyled small">
              <li>
                <a href="#small-business">Piccole imprese</a>
              </li>
              <li>
                <a href="#help-center">
                  <FaQuestion className="footer-icon" /> Domande?
                </a>
              </li>
              <li>
                <a href="#privacy-settings">
                  <FaCog className="footer-icon" /> Gestisci il tuo account e la
                  tua privacy
                </a>
              </li>
              <li>
                <a href="#content-recommendations">
                  <FaShieldAlt className="footer-icon" /> Trasparenza sui
                  contenuti consigliati
                </a>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={2} className="footer-language mt-3 small">
            <label htmlFor="language-select" className="me-2">
              Seleziona lingua:
            </label>
            <select
              name="language"
              id="language-select"
              className="form-select  w-100">
              <option value="it">Italiano (Italiano)</option>
              <option value="en">English (English)</option>
              <option value="fr">Français (Français)</option>
              <option value="de">Deutsch (Deutsch)</option>
            </select>
          </Col>
        </Row>
        <Row className="footer-bottom mt-0 pt-0">
          <Col className="small ">
            <p>&copy; 2024 LinkedIn Corporation</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;
