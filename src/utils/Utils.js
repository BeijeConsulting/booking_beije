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

function objToString(obj) {

   let string = "";
   for (const item in obj) {
      if (obj[item] !== null) {

         string += `${item}=${obj[item]}&`
      }
   }
   let finalString = string.slice(0, -1);
   return finalString;
}

export {
   renderSelectOptions,
   createPortalNode,
   objToString
}