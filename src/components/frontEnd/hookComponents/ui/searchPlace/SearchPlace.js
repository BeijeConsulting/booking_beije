import React, { useState } from "react";

// COMPONENTS
import { Popover, Button } from 'antd';

// REDUX
import { connect } from "react-redux";

// DUCKS
import { setAddress } from "../../../../../redux/ducks/addressDuck";
import { setPosition } from "../../../../../redux/ducks/positionDuck";

// MODULES
import { useTranslation } from "react-i18next";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

let obj;

function SearchPlace(props) {

   const { t } = useTranslation();

   const [state, setState] = useState({
      selectPosition: null,
      searchText: '',
      listPlace: []
   })

   const handleButtonSearch = (item) => () => {              
      props.dispatch(setPosition([item.lat, item.lon]))
      props.dispatch(setAddress(item))
      setState({
         ...state,
         selectPosition: item,
         searchText: '',
         listPlace: []
      })
   }

   function handleChange(event) {
      obj = Object.assign({}, state);

      obj = { ...obj, searchText: event.target.value }

      if (state.searchText.length >= 3) {
         let params = {
            q: state.searchText,
            format: "json",
            addressdetails: 1,
            polygon_geojson: 0,
         };
         const queryString = new URLSearchParams(params).toString();
         const requestOptions = {
            method: "GET",
            redirect: "follow",
         };
         fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {

               setState({
                  ...state,
                  listPlace: JSON.parse(result),
                  searchText: event.target.value
               });
            })
            .catch((err) => console.log("err: ", err));
      } else if (state.searchText.length < 3) {
         obj = {
            ...obj,
            listPlace: [],
            searchText: event.target.value
         }
      }
      setState(obj)
   }

   function item(item) {
      return (
         <Button
            key={item?.place_id}
            onClick={handleButtonSearch(item)}>

            {item?.display_name}

         </Button>
      );
   }

   return (
      <Popover
         placement="bottom"
         trigger="click"
         content={state.listPlace.map(item)}
      >
         <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
               <div style={{ flex: 1 }}>
                  <input
                     style={{ width: "100%" }}
                     value={state.searchText}
                     onChange={handleChange}
                     placeholder={t('common.searchPlaceholder')}
                  />
               </div>
            </div>
            <div>
            </div>
         </div>
      </Popover>
   );
}

export default connect()(SearchPlace);