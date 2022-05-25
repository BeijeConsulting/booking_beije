import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// REACT LEAFLET
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ChangeView from './ChangeView';

// redux
import { connect } from 'react-redux';

// components
import SearchPlace from '../ui/searchPlace/SearchPlace';


function Map(props) {

    const [selectPosition, setSelectPosition] = useState(props?.coordinatesDuck?.coordinates)

    let coord = [ //sarà popolato da una chiamata  api che ci recupererà i dati
        { title: 'test1', lat: 45.44982831807649, lng: 9.238670319666845 },
        { title: 'test2', lat: 45.49087870822447, lng: 9.154384590428563 },
        { title: 'tes3t', lat: 45.50182845052437, lng: 9.209659549318028 },
        { title: 'test4', lat: 45.46174925331295, lng: 9.117649058744261 },
        { title: 'test5', lat: 45.492322752158586, lng: 9.1150741382991 },
        { title: 'test6', lat: 45.45633095878929, lng: 9.20622632205781 },
        { title: 'test7', lat: 45.51037017739112, lng: 9.166572547202327 },
        { title: 'test8', lat: 45.474510289350064, lng: 9.100654583806195 },
    ]

    function setState() {
        setSelectPosition(props?.coordinatesDuck?.coordinates)
        // console.log(props.addressDuck.address);

    }

    function marker(cord, key) {
        return <Marker key={key} position={[cord.lat, cord.lng]}>
            <Popup>
                {cord.title} <br /> Easily customizable.
            </Popup>
        </Marker>
    }

    useEffect(setState, [props?.coordinatesDuck?.coordinates])


    return (
        <>
            <SearchPlace />
            <MapContainer style={{ width: '100px', height: '100px' }} center={[45.44982831807649, 9.238670319666845]} zoom={13} scrollWheelZoom={true}>

                <ChangeView center={{ lat: selectPosition[0], lon: selectPosition[1] }} zoom={10} />

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                    coord.map(marker)
                }

            </MapContainer>
        </>
    );
}

const mapStateToProps = (state) => ({
    coordinatesDuck: state.positionDuck,
    addressDuck: state.addressDuck
})

export default connect(mapStateToProps)(Map);