import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import { PencilFill, PlusLg } from "react-bootstrap-icons";
import "./Skills.css";

const Skills = () => {
  const [contentToShow, setContentToShow] = useState(false);
  const toggleShowMore = () => {
    setContentToShow(!contentToShow);
  };

  const ArrowDown = () => <i className="bi bi-chevron-compact-down ml-1"></i>;
  const ArrowUp = () => <i className="bi bi-chevron-compact-up ml-1"></i>;
  const skillsList = [
    { name: "JavaScript" },
    { name: "React JS" },
    { name: "Redux" },
    { name: "TypeScript" },
    { name: "HTML" },
    { name: "CSS" },
    { name: "Angular" },
  ];

  return (
    <>
    <Card id="skills" className="mb-2">
      <Card.Body className="pb-0">
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
       <Card.Title className="mb-2 mb-md-0">Competenze</Card.Title>
         <div className="d-flex flex-row ms-auto align-items-center">
         <Button className="px-3 py-1 mr-2 ms-3">Quiz valutazioni competenze</Button>
           <div className="d-flex flex-row align-items-center ms-auto">
            <PlusLg size={26} className="me-2" />
            <PencilFill size={20} className="me-2" />
          </div>
        </div>
     </div>

  
        <div className="mt-3 mb-0">
          {skillsList.slice(0, 3).map((user, i) => (
            <p key={i}>{user.name}</p>
          ))}
          {contentToShow && (
            <div className="mt-3 mb-0">
              {skillsList.slice(3, 8).map((user, i) => (
                <p key={i}>{user.name}</p>
              ))}
            </div>
          )}
        </div>
      </Card.Body>
      <Card.Footer className="text-center d-flex justify-content-center">
        <Button
          className="btn-connect card-bottom align-items-center"
          onClick={() => toggleShowMore()}
        >
          {contentToShow ? `Riduci` : "Mostra tutte le competenze"}{" "}
          {contentToShow ? ArrowUp() : ArrowDown()}
        </Button>
      </Card.Footer>
    </Card>
  </>
  
  );
};

export default Skills;