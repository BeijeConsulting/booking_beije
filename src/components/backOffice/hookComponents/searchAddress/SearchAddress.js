import PropTypes from "prop-types";

import { AutoComplete } from "antd";
import { useState } from "react";

const MAP_URL = "https://nominatim.openstreetmap.org/search.php?";
const FORMAT_RES_URL = "&limit=10&format=jsonv2";

const SearchAddress = (props) => {
  const [state, setState] = useState({
    value: "",
    options: [],
  });

  const onSearch = (searchText) => {
    const getAddressInfo = async () => {
      let urlPar = new URLSearchParams({ q: searchText });
      const res = await fetch(`${MAP_URL}${urlPar}${FORMAT_RES_URL}`);
      const addressList = await res.json();
      setState({
        ...state,
        options: !searchText
          ? []
          : addressList.map((add) => {
              return {
                key: `add-${add.place_id}`,
                value: add.display_name,
                coo: {
                  lat: add.lat,
                  lon: add.lon,
                },
              };
            }),
      });
    };

    if (searchText.length > 3) {
      getAddressInfo();
    }
  };

  const onSelect = (data) => {
    return props.callback(state.options.find((add) => add.value === data));
  };

  //   const onChange = (data) => {
  //     setState({
  //       ...state,
  //       value: data,
  //     });
  //   };

  return (
    <AutoComplete
      options={state.options}
      style={{
        width: 500,
      }}
      onSelect={onSelect}
      onSearch={onSearch}
      //   onChange={onChange}
      placeholder={props.placeholder}
      allowClear
      defaultValue={props.defValue}
      status={`${state.value === '' ? "error" : ""}`}
    />
  );
};

export default SearchAddress;

SearchAddress.defaultProps = {
  placeholder: "Address",
  callback: () => console.log("Prova search indirizzi"),
};

SearchAddress.propTypes = {
  placeholder: PropTypes.string,
  callback: PropTypes.func.isRequired,
};
