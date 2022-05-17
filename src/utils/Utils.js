function createPortalNode(idNode) {  // simple function for make an element and add it to the dom
   const nodeElement = document.createElement('div');
   
   nodeElement.setAttribute('id', idNode);
   document.body.appendChild(nodeElement);

   return nodeElement;
}


<<<<<<< HEAD
// export {
//     navigate
// }

// {
//     "id": 40,
//     "email": "a@gmail.com",
//     "password": "pippo",
//     "name": "pippo",
//     "surname": "baudo"
// }
=======
const renderSelectOptions = (item, key) => {
   return (
      <option key={`${item}-${key}`} value={item}>{item}</option>
   )
}

export {
   renderSelectOptions,
   createPortalNode
}
>>>>>>> 3c3d3cf8d439a45b8aadb40b9005c4308083a895
