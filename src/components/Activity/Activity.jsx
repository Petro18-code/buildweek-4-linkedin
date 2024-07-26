import { Card } from 'react-bootstrap';
import image from '../../assests/featured-post.png';

import './Activity.css';
const Activity = () => {
  return (
    <>
      <Card
        className='px-2 mt-4 mb-2'
        style={{
          borderRadius: '9px',
        }}
      >
        <h5 className='title__activity'>Attività</h5>

        <div style={{ marginLeft: '12px' }}>
          <p className='text-muted'>1,224 followers</p>
          <p className='text-muted'>
            <small>Lorem Impsum ha postato questo • 5h </small>
          </p>
          <p>
            Phasellus bibendum finibus aliquet. Suspendisse a risus ac velit
            fringilla ultrices. Vivamus dignissim sit amet magna et sagittis.
            Vivamus ultrices tempus neque. Donec aliquam justo mi, non convallis
            leo tincidunt eget. Donec cursus sapien diam, ultrices ornare diam
            vestibulum auctor.
          </p>
        </div>

        <div
          className='row card mb-3 justify-content-center'
          style={{ overflow: 'hidden', margin: '10px' }}
        >
          <div
            className='row g-0  align-items-center'
            style={{ backgroundColor: '#f9fafb' }}
          >
            <div className='col-md-2 '>
              <img
                src={image}
                className='img-fluid rounded-start ml-3'
                alt='...'
              />
            </div>
            <div className='col-md-10'>
              <div className='card-body'>
                <small className='card-text'>
                  Questa è una carta più ampia con testo di supporto sotto come
                  naturale introduzione a contenuti aggiuntivi.
                </small>
                <p className='card-text'>
                  <small className='text-muted'>dg-ramm.de • 7 min read</small>
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div style={{ marginLeft: '12px' }}>
          <p className='text-muted'>
            <small>And Pet ha postato questo • 3d </small>
          </p>
          <p>Scopri gli ultimi lavori che abbiamo in Germania 🔥</p>
        </div>
        <div
          className='row card mb-3 justify-content-center'
          style={{ overflow: 'hidden', margin: '10px' }}
        >
          <div
            className='row g-0  align-items-center'
            style={{ backgroundColor: '#f9fafb' }}
          >
            <div className='col-md-2 '>
              <img
                src={image}
                className='img-fluid rounded-start ml-3'
                alt='...'
              />
            </div>
            <div className='col-md-10'>
              <div className='card-body'>
                <small className='card-text'>
                  Questa è una carta più ampia con testo di supporto sotto come
                  naturale introduzione a contenuti aggiuntivi.
                </small>
                <p className='card-text'>
                  <small className='text-muted'>dg-ramm.de • 7 min read</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Card.Footer
          
          className='d-flex justify-content-center'
          style={{ backgroundColor: 'transparent' }}
        >
          <span className='text-muted'>Vedi tutte le attività</span>
        </Card.Footer>
      </Card>
    </>
  );
};
export default Activity;
