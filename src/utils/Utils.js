const renderSelectOptions = (item, key) => {
   return (
      <option key={`${item}-${key}`} value={item}>{item}</option>
   )
}

export {
   renderSelectOptions
}