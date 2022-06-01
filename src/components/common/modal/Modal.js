import React from "react";
import ReactPortal from "../reactPortal/ReactPortal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import "./Modal.scss";
import PropTypes from "prop-types";
function Modal({ classNameCustomParent, closeBtn, modalContent, classNameCustom, children, isOpen, callback }) {
   if (!isOpen) return null;

   return (
      <ReactPortal classNameContainer={classNameCustomParent}>
         <div className={classNameCustom}>
            <div className={modalContent}>
               <FontAwesomeIcon
                  onClick={callback}
                  className={closeBtn}
                  icon={faCircleXmark}
                  size={'2x'} />

               {
                  children
               }
            </div>
         </div>
      </ReactPortal>
   );
}

Modal.defaultProps = {
   classNameCustom: 'modal',
   closeBtn: 'close-btn',
   modalContent: 'modal-content',
   classNameCustomParent: 'modalPortalParent'
}

// propTypes 
Modal.propTypes = {
   classNameCustom: PropTypes.string,
   closeBtn: PropTypes.string,
   modalContent: PropTypes.string,
   callback: PropTypes.func.isRequired,
   classNameCustomParent: PropTypes.string
}
export default Modal;