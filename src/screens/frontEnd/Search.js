import React from "react";

// router dom
import { useLocation } from "react-router-dom";

const Search = () => {

   const location = useLocation();
   console.log(location.state);
   
  return (
    <>
      <p>Search</p>
    </>
  );
};

export default Search