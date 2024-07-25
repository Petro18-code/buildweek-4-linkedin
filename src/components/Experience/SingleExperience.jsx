import { useState, useEffect } from 'react';
import { PencilFill } from 'react-bootstrap-icons';
import './Experience.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { IoSend } from 'react-icons/io5';
const SingleExperience = ({
  company,
  id,
  role,
  area,
  startDate,
  endDate,
  description,
}) => {
  const [selectedExperience, setSelectedExperience] = useState(null);

  const [singleCompany, setSingleCompany] = useState('');
  const [singleRole, setSingleRole] = useState('');
  const [singleDescription, setSingleDescription] = useState('');
  const [singleArea, setSingleArea] = useState('');
  const [singleStartDate, setSingleStartDate] = useState('');
  const [singleEndDate, setSingleEndDate] = useState('');

  const [setExperiences] = useState(null);
  const [editExperience, setEditExperience] = useState(false);
  const closeEditExperience = () => setEditExperience(false);
  useEffect(() => {
    setSingleCompany(company);
    setSingleRole(role);
    setSingleDescription(description);
    setSingleArea(area);
    setSingleStartDate(startDate);
    setSingleEndDate(endDate);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const experience = {
      role: singleRole,
      company: singleCompany,
      startDate: singleStartDate,
      endDate: singleEndDate || null,
      description: singleDescription,
      area: singleArea,
    };

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/66a165d55f8bd800152f8ccf/experiences/${selectedExperience}`,
        {
          method: 'PUT',
          body: JSON.stringify(experience),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmExNjVkNTVmOGJkODAwMTUyZjhjY2YiLCJpYXQiOjE3MjE4NTMzOTgsImV4cCI6MTcyMzA2Mjk5OH0.FNcSYBHP-5xFaFuJa1IOu7MdRvOqcL2efzBgbv8DXjk`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
        closeEditExperience();
      } else {
        console.error('fetch failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const showEditExperience = async () => {
    setEditExperience(true);
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/66a165d55f8bd800152f8ccf/experiences/${selectedExperience}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmExNjVkNTVmOGJkODAwMTUyZjhjY2YiLCJpYXQiOjE3MjE4NTMzOTgsImV4cCI6MTcyMzA2Mjk5OH0.FNcSYBHP-5xFaFuJa1IOu7MdRvOqcL2efzBgbv8DXjk`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSingleCompany(data.company);
        setSingleRole(data.role);
        setSingleDescription(data.description);
        setSingleArea(data.area);
        setSingleStartDate(data.startDate);
        setSingleEndDate(data.endDate);
      } else {
        console.log('Fetch Failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deleteExperience = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/66a165d55f8bd800152f8ccf/experiences/${selectedExperience}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmExNjVkNTVmOGJkODAwMTUyZjhjY2YiLCJpYXQiOjE3MjE4NTMzOTgsImV4cCI6MTcyMzA2Mjk5OH0.FNcSYBHP-5xFaFuJa1IOu7MdRvOqcL2efzBgbv8DXjk`,
          },
        }
      );
      if (response.ok) {
        closeEditExperience();
      } else {
        console.error('fetch failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div style={{ marginLeft: '12px' }}>
        <div className='col-md-1 mr-sm-2'>
          <PencilFill
            style={{ marginLeft: '42em' }}
            size={20}
            id='pencil-icon-open-edit-form'
            onClick={() => {
              showEditExperience();
              setSelectedExperience(id);
            }}
          />
        </div>
        <div className='row'>
          <div className='col-md-1'>
            <img
              src='https://strive.school/favicon.ico'
              alt=''
              style={{ width: '3em', height: '3em' }}
              className='ml-1'
            />
          </div>

          <div className='col-md-4'>
            <h6>{role} </h6>
            <p>
              <small> {company} </small>
              <br />
              <small className='text-muted '>
                {startDate} - {endDate}
                <br />
                {area}
              </small>
            </p>
            <p className='  '>
              <strong>
                <small>{description}</small>{' '}
                <small className='text-muted'> ...guarda di più</small>
              </strong>
            </p>
          </div>
        </div>
      </div>

      <Modal show={editExperience} onHide={closeEditExperience}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Compagnia</Form.Label>
              <Form.Control
                type='text'
                placeholder='Compagnia'
                value={singleCompany}
                onChange={e => setSingleCompany(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Ruolo</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ruolo'
                value={singleRole}
                onChange={e => setSingleRole(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                type='text'
                placeholder='Descrizione'
                value={singleDescription}
                onChange={e => setSingleDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Luogo</Form.Label>
              <Form.Control
                type='text'
                placeholder='Luogo'
                value={singleArea}
                onChange={e => setSingleArea(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Data inizio</Form.Label>
              <Form.Control
                type='date'
                value={singleStartDate}
                onChange={e => setSingleStartDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Data fine</Form.Label>
              <Form.Control
                type='date'
                value={singleEndDate}
                onChange={e => setSingleEndDate(e.target.value)}
              />
            </Form.Group>

            <div className='d-flex justify-content-end'>
              <Button
                variant='danger'
                type='button'
                className='mr-4'
                onClick={deleteExperience}
              >
                <RiDeleteBin6Line size={26} />
              </Button>
              <Button variant='success' type='submit'>
                <IoSend size={26} />
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SingleExperience;
