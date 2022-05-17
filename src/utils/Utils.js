function createPortalNode(idNode) {  // simple function for make an element and add it to the dom
    const nodeElement = document.createElement('div');
    
    nodeElement.setAttribute('id', idNode);
    document.body.appendChild(nodeElement);
 
    return nodeElement;
 }
 
 const renderSelectOptions = (item, key) => {
    return (
       <option key={`${item}-${key}`} value={item}>{item}</option>
    )
 }
 
 export {
    renderSelectOptions,
    createPortalNode
 }