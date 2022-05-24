import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

// style
import './PropertyCard.scss';

class PropertyCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <section className='propertyCardContainer'>
                    <img src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.J3rvJKi_e9YzbAdBCqOChQHaE8%26pid%3DApi&f=1"}/>
                    <div>
                        <h4>title</h4>
                        <small>Categoria</small>
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