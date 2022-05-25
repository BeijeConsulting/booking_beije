// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

// components
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// style
import './PropertyCard.scss';
import { getStructureImage } from '../../../../../services/api/struttura/struttura-immagini-controller/structureImagesApi';

class PropertyCard extends Component {
    constructor(props) {
        super(props)

        this.State = {
            image: null
        }

        // const {descrizione} = this.props.data
    }

    componentDidMount(){
        getStructureImage(this.props?.data?.indirizzo?.struttura_id).then(res => {
            this.setState({image: res.data?.immagine?.urlImage})})
        
    }

    render() {
        return (
            <>
                <section className='propertyCardContainer'>
                    {/* <img src={this.state.image}/> */}
                    <div>
                        <h4>{this.props?.data?.indirizzo?.nome_struttura}</h4>
                        <small>{this.props?.data?.tipologiaStrutturaId?.tipo}</small>
                        <div>
                            <FontAwesomeIcon icon={faStar} />
                            <small>{this.props?.data?.media_recensioni}</small>
                        </div>
                        {/* <small>{this.props.t()}</small> */}
                        {/* <h4>{this.props.t()}</h4> */}
                    </div>

                    <span>prezzo</span>
                    {/* <span>{this.props.t()}</span> */}
                </section>
            </>
        )
    }
}

PropertyCard.propTypes = {

}

export default withTranslation()(PropertyCard);