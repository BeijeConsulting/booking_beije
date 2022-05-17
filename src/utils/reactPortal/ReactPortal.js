import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { createPortalNode } from '../Utils';

// less 
import './ReactPortal.less'

function ReactPortal({ children, idElement = 'modal' }) { //function for create a portal.
    const [state, setState] = useState(null);

    function handleModal() {
        let element = document.getElementById(idElement);
        let nodeCreated = false;

        if (!element) {
            element = createPortalNode(idElement);
            nodeCreated = true;
        }

        setState(element);

        return handleUnMount;
    }
    function handleUnMount() {
        let element = document.getElementById(idElement);
        let nodeCreated = false;

        // delete the programatically created element
        if (nodeCreated && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }

    useLayoutEffect(handleModal, [idElement]) // lifeCycle

    if (state === null) return null;
    return createPortal(children, state);
}


export default ReactPortal;