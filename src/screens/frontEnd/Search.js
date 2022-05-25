import React from "react";

// router dom
import { useLocation } from "react-router-dom";

// components
import SearchResult from "../../components/frontEnd/classComponents/pageComponents/searchResult/SearchResult";

const Search = () => {

  //  const location = useLocation();
  //  console.log(location.state);
   
  return (
    <>
      <SearchResult />
    </>
  );
};

export default Search