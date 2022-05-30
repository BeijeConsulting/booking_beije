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
import { Pagination } from 'antd';

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
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
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
         page: 1
      }
      this.searchFilters = {};
   }

   componentDidMount() {
      this.getapi();
      // if(this.props.router.location.state.property !== prevState.property){
      this.setState({
         property: this.props.router.location.state.property
      })
      // }


   }

   componentDidUpdate(prevProps, prevState) {

      // if(this.props.router.location.state.property !== prevState.property){
      // this.setState({
      //    property: this.props.router.location.state.property
      // })
      // console.log('property',this.props.router.location.state.property);
      // console.log('state',this.state);
      // console.log('prev',prevState);
      // }

      // if (this.state.page !== prevState.page) {
      //    showAllStruttureGetApi(5, this.state.page).then(res =>
      //       this.setState({
      //          property: res?.data?.list
      //       }))

      // }
   }

   async getapi() {
      // const response = await showAllStruttureGetApi(5, this.state.page);
      // console.log(response.data.list);
      // this.setState({
      //    property: response.data.list
      // })
   }

   handleButton = (params) => () => {
      let newState = Object.assign({}, this.state);

      // case zero
      if (this.state.isFilter) newState.isFilter = false;
      if (this.state.isMap) newState.isMap = false;
      if (this.state.isSearch) newState.isSearch = false;


      switch (params) {
         case "isFilter":
            newState.isFilter = !newState.isFilter
            break;
         case "isMap":
            newState.isMap = !newState.isMap
            break;
         case "isSearch":
            newState.isSearch = !newState.isSearch
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

   getFilters = (data) => {
      this.searchFilters = data;
      console.log(this.searchFilters);
   }

   handleData = (data) => {
      this.setState({
         property: data
      })
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
                     callback={this.getFilters} />
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
                  />
               }
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
         // callback={this.handleDetails(item?.indirizzo?.struttura_id)}
         >

            <PropertyCard
               callback={this.handleDetails(item?.indirizzo?.struttura_id)}
               data={item}
            />
         </Card>
      )
   }
}

export default withTranslation()(withRouting(SearchResult))