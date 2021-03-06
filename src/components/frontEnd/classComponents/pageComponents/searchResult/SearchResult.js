// import PropTypes from 'prop-types'
import React, { Component } from 'react';

// components
import UiButton from '../../../funcComponents/ui/buttons/uiButtons/UiButton';
import { withTranslation } from 'react-i18next';
import SearchButton from '../../../funcComponents/ui/searchButton/SearchButton';
import Card from '../../../funcComponents/card/Card';
import PropertyCard from '../../ui/propertyCard/PropertyCard';
import Modal from '../../../../common/modal/Modal';
import Map from '../../../hookComponents/map/Map';
import { Pagination, Spin } from 'antd';

// modules
import Helmet from 'react-helmet';

// style
import './SearchResult.scss';
import '../../../../../assets/variables/_common.scss';
import '../../../../../assets/commonStyles/pagination.scss';

// api
import Filter from '../../../hookComponents/filter/Filter';
import SearchForm from '../modalChildrenComponent/searchForm/SearchForm';

// utils
import { paginationArrowsRender } from "../../../../../utils/pagination/pagination";
import withRouting from '../../../../../withRouting/withRouting';
import { getStructuresBySearch } from '../../../../../services/api/search/searchApi';
import { objToString } from '../../../../../utils/Utils';
// import { annuncioOnStrutturaGetApi } from '../../../../../services/api/annuncio/annuncioApi';



class SearchResult extends Component {

   constructor(props) {
      super(props)
      this.state = {
         property: [],
         isFilter: false,
         isMap: false,
         isSearch: false,
         isOpen: false,
         data: this.props.data,
         page: 1,
         isLoading: true
      }
      this.searchFilters = null;
      this.searchParams = null;
   }

   componentDidMount() {
      if (this.props.router.location.state !== null) {
         this.setState({
            property: this.props.router.location.state.property,
            isLoading: false
         })
      }
   }

   handleButton = (params) => (data) => {
      let newState = Object.assign({}, this.state);

      // case zero
      if (this.state.isFilter) newState.isFilter = false;
      if (this.state.isMap) newState.isMap = false;
      if (this.state.isSearch) newState.isSearch = false;


      switch (params) {
         case "isFilter":
            newState.isFilter = !newState.isFilter;
            break;
         case "isMap":
            newState.isMap = !newState.isMap
            break;
         case "isSearch":
            newState.isSearch = !newState.isSearch;
            newState.property = data;
            newState.isLoading = false;
            break;
         default:
            break;
      }

      this.setState({
         ...newState,
         isOpen: !this.state.isOpen
      })
   }

   handleDetails = (id) => (e) => {
      this.props.router.navigate("/detailsproperty/" + id)
   }

   onPageChange = (page) => {
      this.setState({
         page: page
      })
   }

   getFilters = async (data) => {
      const RESPONSE = await getStructuresBySearch(this.searchParams.concat('&', objToString(data)));
      this.setState({
         property: RESPONSE?.data
      })

      this.searchFilters = data;
   }

   handleData = (data) => {
      this.setState({
         property: data,
         isLoading: false
      })
   }

   handleParams = (data) => {
      console.log(data);
      this.searchParams = data;
   }

   render() {
      return (

         <div className='researchContainer'>
            <Helmet>
               <title>{this.props.t("common.research")}</title>
            </Helmet>

            {/* modals */}

            <Modal
               callback={this.handleButton("isOpen")}
               isOpen={this.state.isOpen}
            >
               {
                  this.state.isFilter && <Filter
                     classNameCustom={'filters-modal'}
                     closeModal={this.handleButton('isFilter')}
                     callback={this.getFilters}
                  // data={}
                  />
               }
               {
                  this.state.isMap && <Map
                     propertyList={this.state.property}
                     initialPos={this.props.data}
                  />
               }
               {
                  this.state.isSearch && <SearchForm
                     callback={this.handleButton("isSearch")}
                     data={this.handleData}
                     handleParams={this.handleParams}
                  />
               }
            </Modal>

            {/* end modals */}

            <section className='ButtonContainer flex column jcCenter aiCenter'>
               <SearchButton
                  callback={this.handleButton("isSearch")}
                  handleParams={this.handleParams}
                  handleData={this.handleData}
               />
               <div className='w100 flex jcSpaceB'>

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
               this.state.isLoading &&
               <Spin className='w100' />
            }

            {
               (!this.state.isLoading && this.state.property.length === 0) &&
               <h4 className='taC w mT1'>{this.props.t('common.noApartments')}</h4>
            }
            {
               this.state.property.length > 0 &&
               this.state.property.map(this.mapping)
            }

            {this.state.property.length > 5 && <Pagination
               size={"small"}
               total={10}
               pageSize={5}
               current={this.state.page}
               onChange={this.onPageChange}
               itemRender={paginationArrowsRender}
               className={'custom-pagination'}
            />}

         </div>
      )
   }

   mapping = (item, key) => {
      return (
         <Card
            key={`${key}- ${item?.indirizzo?.citta}`}
            callback={this.handleDetails(item?.indirizzo?.struttura_id)}
         >

            <PropertyCard
               data={item}
            />
         </Card>
      )
   }
}

export default withTranslation()(withRouting(SearchResult))