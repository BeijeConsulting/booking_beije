import React, { useState } from "react";

// REDUX
import { connect } from "react-redux";
import { eventBus } from "../../../../../eventBus/eventBus";

// DUCKS
import { setAddress } from "../../../../../redux/ducks/addressDuck";
import { setPosition } from "../../../../../redux/ducks/positionDuck";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

let obj;

function SearchPlace(props) {

    const [state, setState] = useState({
        selectPosition: null,
        searchText: '',
        listPlace: []
    })

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
            <div key={item?.place_id}>
                <ul
                    onClick={() => {
                        eventBus.onDispatch("coordinate", {
                            lat: item?.lat,
                            lon: item?.lon
                        })
                        props.dispatch(setPosition([item?.lat, item?.lon]))
                        props.dispatch(setAddress(item))
                        setState({
                            ...state,
                            selectPosition: item,
                            searchText: '',
                            listPlace: []
                        })
                    }}
                >
                    <li>{item?.display_name}</li>
                </ul>
                {/* <Divider /> */}
            </div>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                    <input
                        style={{ width: "100%" }}
                        value={state.searchText}
                        onChange={handleChange}
                    />
                </div>

                {/* <div style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}>
                    <button
                        onClick={() => {
                            // Search
                        }}
                    >
                        Search
                    </button>
                </div> */}
            </div>
            <div>
                <div component="nav" aria-label="main mailbox folders">
                    {
                        state.listPlace.map(item)
                    }
                </div>
            </div>
        </div>
    );
}

export default connect()(SearchPlace);