// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

// components
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// style
import './PropertyCard.scss';
import '../../../../../assets/variables/_common.scss';

// API
import { getStructureImage } from '../../../../../services/api/struttura/struttura-immagini-controller/structureImagesApi';
import { annuncioOnStrutturaGetApi } from '../../../../../services/api/annuncio/annuncioApi';
import withRouting from '../../../../../withRouting/withRouting';

class PropertyCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            image: null,
            price: [],
        }
        this.listings = []
    }

    componentDidMount() {
        this.handleApi()
    }

    handleApi = async () => {
        const LISTINGS = await annuncioOnStrutturaGetApi(this.props?.data?.struttura?.id);
        const IMAGE = await getStructureImage(this.props?.data?.struttura?.id)
        this.setState({
            image: IMAGE.data?.immagine?.urlImage
        })
        this.listings = LISTINGS?.data?.list;
        this.findLowestPrice()

    }
    findLowestPrice() {

        this.listings.forEach(item => {

            this.state.price.push(item.prezzo);
        });

        let lowerPrice = this.state.price.reduce((previousValue, currentValue) => previousValue < currentValue ? previousValue : currentValue);

        this.setState({
            price: lowerPrice
        })
    }

    handleNavigate = (id) => {
        this.props.router.navigate("/detailsproperty/" + id)
    }

    render() {
        return (
            <>
                <section className='propertyCardContainer flex relative aiCenter'>
                    <img src={this.state?.image} />
                    {/* <img className='ofC' src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcache.eupedia.com%2Fimages%2Fcontent%2Fburghley-2.jpg&f=1&nofb=1"} /> */}
                    <div>
                        <h4>{this.props?.data?.struttura.nome}</h4>
                        <small>{this.props?.data?.struttura?.tipologia}</small>
                        <div className='mediaRateCard'>
                            <FontAwesomeIcon icon={faStar} />
                            <small>{this.props?.data?.media_recensioni}</small>
                        </div>
                    </div>

                    <span className='absolute r0 b0'>{this.props?.t('common.currency', { price: this.state?.price })}</span>
                </section>
            </>
        )
    }
}

PropertyCard.propTypes = {

}

export default withTranslation()(withRouting(PropertyCard));