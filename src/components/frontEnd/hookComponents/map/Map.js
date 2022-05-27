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
import PropertyCards from '../../funcComponents/propertyCards/PropertyCards';



function Map(props) {
    console.log('list', props.propertyList)
    const [selectPosition, setSelectPosition] = useState(props.coordinatesDuck?.coordinates)

    const navigate = useNavigate();

    function setState() {
        setSelectPosition(props?.coordinatesDuck?.coordinates)
        // console.log(props.addressDuck.address);

    }

    const goToProperty = (id) => (e) => {
        navigate("/detailsproperty/" + id)
    }

    function marker(cord, key) {
        return <Marker key={key} position={[cord?.indirizzo.latitudine, cord?.indirizzo.longitudine]}>
            <Popup >
                <div onClick={
                    goToProperty(cord?.id)
                }>
                    <PropertyCards
                        title={cord?.nome_struttura}
                    >
                        <h4>{`${cord?.indirizzo.citta} ${cord?.indirizzo.via} `}</h4>
                        <h5>{`${cord?.checkin} ${cord?.checkout}`}</h5>
                        <p>{cord?.descrizione}</p>
                    </PropertyCards>
                </div>
            </Popup>
        </Marker>
    }

    useEffect(setState, [props.coordinatesDuck?.coordinates])


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