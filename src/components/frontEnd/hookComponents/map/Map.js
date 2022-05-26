import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../routes/routes';
// REACT LEAFLET
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ChangeView from './ChangeView';

// redux
import { connect } from 'react-redux';

// components
import SearchPlace from '../ui/searchPlace/SearchPlace';



function Map(props) {
    console.log('list', props?.propertyList)
    const [selectPosition, setSelectPosition] = useState(props?.coordinatesDuck?.coordinates)

    const navigate = useNavigate();

    function setState() {
        setSelectPosition(props?.coordinatesDuck?.coordinates)
        // console.log(props.addressDuck.address);

    }

    const goToProperty = (id) => (e) => {
        navigate("/detailsproperty/" + 2)
    }

    function marker(cord, key) {
        return <Marker key={key} position={[cord.indirizzo.latitudine, cord.indirizzo.longitudine]}>
            <Popup >
                <div onClick={
                    goToProperty(cord.id)
                }>
                    {cord.title} <br /> Easily customizable.
                </div>
            </Popup>
        </Marker>
    }

    useEffect(setState, [props?.coordinatesDuck?.coordinates])


    return (
        <>
            <MapContainer style={{ width: '100vw', height: '100vh' }} center={[props.initialPos.latitudine, props.initialPos.longitudine]} zoom={13} scrollWheelZoom={true}>

                <ChangeView center={{ lat: selectPosition[0], lon: selectPosition[1] }} zoom={10} />

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                    props.propertyList.map(marker)
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