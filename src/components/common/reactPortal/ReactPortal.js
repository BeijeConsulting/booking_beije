import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { createPortalNode } from "../../../utils/Utils";
import './ReactPortal.scss'

function ReactPortal({ children,classNameContainer }) {  //function to create a portal.
    const [state, setState] = useState(null);

    useLayoutEffect(() => {

        let element = createPortalNode(classNameContainer);
        setState(element);

        return () => {
            //delete the programmatically created element
            element.parentNode.removeChild(element);
        }
    }, []);  // lifeCycle

    if (state === null) return null;

    return createPortal(children, state);
}

export default ReactPortal;