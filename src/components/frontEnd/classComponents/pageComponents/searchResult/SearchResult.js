// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import UiButton from '../../../funcComponents/ui/buttons/uiButtons/UiButton';
import { t } from 'i18next';


// style
import './SearchResult.scss';
import SearchButton from '../../../funcComponents/ui/searchButton/SearchButton';
import Helmet from 'react-helmet';
import { withTranslation } from 'react-i18next';
import Card from '../../../funcComponents/card/Card';
import PropertyCard from '../../ui/propertyCard/PropertyCard';
import { showAllStruttureGetApi } from '../../../../../services/api/struttura/strutturaApi';



class SearchResult extends Component {

    constructor(props) {
        super(props)
        this.state = {
            property: null
        }
    }
    
    componentDidMount(){
        this.getapi();  
    }

    async getapi(){
        const response = await showAllStruttureGetApi();
        this.setState({
            property: response.data
        })
    }

    handleButton = () => {
        return null
    }

    render() {
        return (
            <div className='researchContainer'>
                <Helmet>
                    <title>{this.props.t("common.research")}</title>
                </Helmet>
                <section className='ButtonContainer'>
                    <SearchButton
                    />
                    <div>

                        <UiButton className="becomeHost"
                            callback={this.handleButton}
                            label={this.props.t('fe.screens.searchResult.filterButton')}
                        />

                        <UiButton className="becomeHost"
                            callback={this.handleButton}
                            label={this.props.t('fe.screens.searchResult.mapButton')}
                        />
                    </div>

                </section>
                <Card>
                    <PropertyCard />
                </Card>
            </div>
        )
    }
}

export default withTranslation()(SearchResult)