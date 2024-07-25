import { Container, Col, Card, Image, Row, Button } from "react-bootstrap";
import "./Profile.css";
import "./ProfileEditingModal.css";
import ProfileEditForm from "./ProfileEditingForm";
const UsereProfile = ({ userProfile }) => {
  return (
    <>
      <Card
        style={{
          borderRadius: "9px",
        }}
        className=" mb-4 px-2"
      >
        <Container
          className=" pb-4 "
          style={{
            background: "#fff",
            borderRadius: "7px",
          }}
        >
          <Row className="profile__bg">
            <img
              src="https://i.pinimg.com/originals/2d/e8/82/2de882cd4f3992ada3d609e3a183f7a4.jpg"
              alt=""
            />
          </Row>
          <Row className="profile__photo ml-1">
            <img className="img-fluid" src={userProfile.image} />
          </Row>

          <Col style={{ marginLeft: "9em" }}>
            <ProfileEditForm profileDetails={userProfile} />
          </Col>

          <Row className="user__detail ">
            <Col xs={12} md={8}>
              <h4 className="name mb-0">
                {userProfile.name} {userProfile.surname}
              </h4>
              <p className="my-0 occupation">{userProfile.title}</p>
              <p className="my-0 location text-muted">Roma, Lazio, Italia</p>

              <p className="my-2 connections">
                580 follower - 951 collegamenti
              </p>
              <div className="d-flex justify-content-start w-100">
                <Button className="profile__button open-to-btn">
                  Disponibile per
                </Button>
                <Button
                  variant="outline-primary"
                  className="add__btn profile__button  mx-3"
                >
                  Aggiungi sezione profilo
                </Button>
                <Button variant="outline-secondary" className="profile__button">
                  Altro
                </Button>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <ul>
                <li className="education mb-1">
                  <img
                    src="https://strive.school/favicon.ico"
                    alt=""
                    style={{ width: "3em", height: "3em" }}
                    className="mr-2"
                  />{" "}
                  Strive school
                </li>

                <li className="education">
                  <img
                    src="https://www.schema17project.com/wp-content/uploads/2020/10/logo-palla-291x300.png"
                    alt=""
                    style={{ width: "3em", height: "3em" }}
                    className="mr-2"
                  />{" "}
                  Tech University
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </Card>
    </>
  );
};
export default UsereProfile;
