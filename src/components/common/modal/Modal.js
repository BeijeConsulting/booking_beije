import React from "react";
import ReactPortal from "../../../utils/reactPortal/ReactPortal";
import "./Modal.less";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';


function Modal({ children, isOpen, callback }) {
    return (
        <>
            {
                isOpen &&
                <ReactPortal idElement="react-modal" >
                    <div className="modal-content">
                        <FontAwesomeIcon onClick={callback} className="closeModal" icon={faCircleXmark} />

                        {
                            children
                        }
                    </div>
                </ReactPortal>
            }
        </>

    )
}

export default Modal