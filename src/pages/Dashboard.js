import React from 'react';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const { Meta } = Card;

export default function Dashboard() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-lg-3 mb-3"> {/* Use col-md-6 for medium screens and col-lg-3 for large screens, added margin bottom class */}
          <Card className='bg-primary'>
            <Meta
              avatar={<FontAwesomeIcon icon={faBook} style={{ fontSize: '10vw' }} />} 
              description={
                <div>
                  <div style={{ fontSize: '24px', marginTop: '10px' }}>10</div>
                  <div style={{ fontSize: '16px', marginTop: '10px' }}>Buku</div> {/* Text "Buku" */}
                </div>
              }
            />
          </Card>
        </div>
        <div className="col-md-6 col-lg-3 mb-3"> {/* Use col-md-6 for medium screens and col-lg-3 for large screens, added margin bottom class */}
        <Card className='bg-danger'>
            <Meta
              avatar={<FontAwesomeIcon icon={faBook} style={{ fontSize: '10vw' }} />} 
              description={
                <div>
                  <div style={{ fontSize: '24px', marginTop: '10px' }}>10</div>
                  <div style={{ fontSize: '16px', marginTop: '10px' }}>Peminjam</div> {/* Text "Buku" */}
                </div>
              }
            />
          </Card>        </div>
      </div>
    </div>
  );
}
