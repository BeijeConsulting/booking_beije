import React from 'react';
import PropTypes from 'prop-types';

// style
import './Card.scss';

function Card({children}) {
  return (
    <div className='cardLayout'>
        {
            children
        }
    </div>
  )
}

Card.propTypes = {
    children: PropTypes.element
}

export default Card
