function createPortalNode(className) {

   // simple function to create an element and add it to the dom
   const nodeElement = document.createElement('div');
   nodeElement.setAttribute('class', className)
   document.body.appendChild(nodeElement);

   return nodeElement;
}

function renderSelectOptions(name) {

   return function (item, key) {
      return (
         <option key={`${name}-${key}`} value={item}>{item}</option>
      );
   }
}

export {
   renderSelectOptions,
   createPortalNode
}