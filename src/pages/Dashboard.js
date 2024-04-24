import React from 'react';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const { Meta } = Card;

export default function Dashboard() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 mb-3"> {/* Added margin bottom class */}
          <Card className='bg-primary'>
            <Meta
              avatar={<FontAwesomeIcon icon={faBook} style={{ fontSize: '54px' }} />}
              title="Buku"
              description={<div style={{ fontSize: '24px', marginTop: '10px' }}>10</div>}
            />
          </Card>
        </div>
        <div className="col-md-3 mb-3"> {/* Added margin bottom class */}
          <Card className='bg-danger'>
            <Meta
              avatar={<FontAwesomeIcon icon={faBook} style={{ fontSize: '50px' }} />}
              title=" Peminjam"
              description={<div style={{ fontSize: '24px', marginTop: '10px' }}>5</div>}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
