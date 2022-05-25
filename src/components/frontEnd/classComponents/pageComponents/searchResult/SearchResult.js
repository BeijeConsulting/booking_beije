// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import UiButton from '../../../funcComponents/ui/buttons/uiButtons/UiButton';
import { withTranslation } from 'react-i18next';


// style
import './SearchResult.scss';

// components
import SearchButton from '../../../funcComponents/ui/searchButton/SearchButton';
import Helmet from 'react-helmet';
import Card from '../../../funcComponents/card/Card';
import PropertyCard from '../../ui/propertyCard/PropertyCard';
import Modal from '../../../../common/modal/Modal';
import Map from '../../../hookComponents/map/Map';

// api
import { showAllStruttureGetApi } from '../../../../../services/api/struttura/strutturaApi';
import Filter from '../../../hookComponents/filter/Filter';



class SearchResult extends Component {

    constructor(props) {
        super(props)
        this.state = {
            property: null,
            isFilter: false,
            isMap: false
        }
    }
    
    componentDidMount(){
        this.getapi();  
    }

    async getapi(){
        const response = await showAllStruttureGetApi();
        // console.log(response);
        this.setState({
            property: response.data
        })
    }

    handleButton =(params) => () => {
        this.setState({
            [params]: !this.state[params]
        })
    }

    mapping = (item, key) => {
        return (
            <Card
                key={`${key}- ${item?.indirizzo?.citta}`}
            >
                <PropertyCard
                    data={item}
                />
            </Card>
        )
    }

    render() {
        return (
            <div className='researchContainer'>
                <Helmet>
                    <title>{this.props.t("common.research")}</title>
                </Helmet>

                <Modal
                callback={this.handleButton("isFilter")}
                isOpen={this.state.isFilter}
                >
                    <Filter />
                </Modal>

                <Modal
                callback={this.handleButton("isMap")}
                isOpen={this.state.isMap}

                >
                    <Map />
                </Modal>

                <section className='ButtonContainer'>
                    <SearchButton
                    />
                    <div>

                        <UiButton className="becomeHost"
                            callback={this.handleButton("isFilter")}
                            label={this.props.t('fe.screens.searchResult.filterButton')}
                        />

                        <UiButton className="becomeHost"
                            callback={this.handleButton("isMap")}
                            label={this.props.t('fe.screens.searchResult.mapButton')}
                        />
                    </div>

                </section>
              {
                  this.state.property !== null && this.state.property.map(this.mapping)
              }
            </div>
        )
    }
}

export default withTranslation()(SearchResult)