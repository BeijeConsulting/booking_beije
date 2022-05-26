import React from 'react';
import PropTypes from 'prop-types';

// style
import './Card.scss';
import '../../../../assets/variables/_common.scss';

function Card({children}) {
  return (
    <div className='cardLayout br2 p1'>
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
