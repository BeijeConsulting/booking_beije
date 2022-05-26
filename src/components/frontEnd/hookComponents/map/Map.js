import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// REACT LEAFLET
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ChangeView from './ChangeView';

// redux
import { connect } from 'react-redux';

// components
import PropertyCards from '../../funcComponents/propertyCards/PropertyCards';



function Map(props) {
    console.log('list', props.propertyList)
    const [selectPosition, setSelectPosition] = useState(props.positionDuck?.coordinates)

    const navigate = useNavigate();

    function setState() {
        setSelectPosition(props?.positionDuck?.coordinates)
    }

    const goToProperty = (id) => (e) => {
        navigate("/detailsproperty/" + id)
    }

    function markers(marker, key) {
        console.log(marker);
        return <Marker key={key} position={[marker?.indirizzo.latitudine, marker?.indirizzo.longitudine]}>
            <Popup >
                <div onClick={
                    goToProperty(marker?.id)
                }>
                    <PropertyCards
                        title={marker?.nome_struttura}
                    >
                        <h4>{`${marker?.indirizzo.citta} ${marker?.indirizzo.via} `}</h4>
                        <h5>{`${marker?.checkin} ${marker?.checkout}`}</h5>
                        <p>{marker?.descrizione}</p>
                    </PropertyCards>
                </div>
            </Popup>
        </Marker>
    }

    useEffect(setState, [props.coordinatesDuck?.coordinates])


    return (
        <>
            <MapContainer style={{ width: '100vw', height: '100vh' }} center={[selectPosition[0], selectPosition[1]]} zoom={13} scrollWheelZoom={true}>

                <ChangeView center={{ lat: selectPosition[0], lon: selectPosition[1] }} zoom={10} />

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                    props.propertyList.map(markers)
                }

            </MapContainer>
        </>
    );
}

const mapStateToProps = (state) => ({
    positionDuck: state.positionDuck,
    addressDuck: state.addressDuck
})

export default connect(mapStateToProps)(Map);