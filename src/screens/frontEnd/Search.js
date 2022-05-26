import React from "react";

// router dom
import { useLocation } from "react-router-dom";

// components
import SearchResult from "../../components/frontEnd/classComponents/pageComponents/searchResult/SearchResult";

const Search = () => {

 
  const location = useLocation();
  const data = Object.assign({}, location?.state?.data, location?.state?.coordinate)
  return (
    <>
      <SearchResult
        data={data}
      />
    </>
  );
};

export default Search