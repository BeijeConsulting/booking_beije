// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import UiButton from '../../../funcComponents/ui/buttons/uiButtons/UiButton';
import { withTranslation } from 'react-i18next';


// style
import './SearchResult.scss';
import '../../../../../assets/variables/_common.scss';
import SearchButton from '../../../funcComponents/ui/searchButton/SearchButton';
import Helmet from 'react-helmet';
import Card from '../../../funcComponents/card/Card';
import PropertyCard from '../../ui/propertyCard/PropertyCard';
import Modal from '../../../../common/modal/Modal';
import Map from '../../../hookComponents/map/Map';

// api
import { showAllStruttureGetApi } from '../../../../../services/api/struttura/strutturaApi';
import Filter from '../../../hookComponents/filter/Filter';
import SearchForm from '../modalChildrenComponent/searchForm/SearchForm';
import { Pagination } from 'antd';



class SearchResult extends Component {

    constructor(props) {
        super(props)
        this.state = {
            property: [],
            isFilter: false,
            isMap: false,
            isSearch: false,
            data: this.props.data,
            page: 1
        }
    }
    componentDidMount() {
        this.getapi();
        console.log('data', this.props.data)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.page !== prevState.page) {
            showAllStruttureGetApi(5, this.state.page).then(res =>
                this.setState({
                    property: res?.data?.list
                }))

        }
    }

    async getapi() {
        const response = await showAllStruttureGetApi(5, this.state.page);
        console.log(response.data);
        this.setState({
            property: response.data.list
        })
        // console.log(this.state.property);
    }

    handleButton = (params) => () => {
        this.setState({
            [params]: !this.state[params]
        })
    }

    handleDetails = () => {

    }

    onChange = (page) => {
        this.setState({
            page: page
        })
    }

    mapping = (item, key) => {
        return (
            <Card
                key={`${key}- ${item?.indirizzo?.citta}`}
                onClick={this.handleDetails}
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

                {/* modals */}

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
                    <Map
                        propertyList={this.state.property}
                        initialPos={this.props.data}
                    />
                </Modal>

                <Modal
                    isOpen={this.state.isSearch}
                    callback={this.handleButton("isSearch")}  >
                    <SearchForm />
                </Modal>

                {/* end modals */}

                <section className='ButtonContainer flex column jcCenter aiCenter'>
                    <SearchButton
                        callback={this.handleButton("isSearch")}
                    />
                    <div className='w100 flex jcSpaceA'>

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
                    this.state.property.length > 0 && this.state.property.map(this.mapping)
                }

                <div>
                    <Pagination
                        size={"small"}
                        total={10}
                        pageSize={5}
                        current={this.state.page}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        )
    }
}

export default withTranslation()(SearchResult)