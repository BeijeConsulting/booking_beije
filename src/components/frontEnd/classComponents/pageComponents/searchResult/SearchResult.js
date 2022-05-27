// import PropTypes from 'prop-types'
import React, { Component } from 'react';

<<<<<<< HEAD
// api
import { showAllStruttureGetApi } from '../../../../../services/api/struttura/strutturaApi';

// components
import UiButton from '../../../funcComponents/ui/buttons/uiButtons/UiButton';
import SearchButton from '../../../funcComponents/ui/searchButton/SearchButton';
import Card from '../../../funcComponents/card/Card';
import PropertyCard from '../../ui/propertyCard/PropertyCard';
import Modal from "../../../../common/modal/Modal";
import Filter from '../../../hookComponents/filter/Filter';

// modules
import Helmet from 'react-helmet';
import { withTranslation } from 'react-i18next';

// style
import './SearchResult.scss';
=======
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
import { showAllStruttureGetApi } from '../../../../../services/api/struttura/strutturaApi';
import Filter from '../../../hookComponents/filter/Filter';
import SearchForm from '../modalChildrenComponent/searchForm/SearchForm';

// utils
import { paginationArrowsRender } from "../../../../../utils/pagination/pagination";
>>>>>>> c1963132e43f7bdbbd0f62881dea92300359f960



class SearchResult extends Component {

   constructor(props) {
      super(props)
      this.state = {
         property: null,
         isOpen: false
      }
      this.searchFilters = {};
   }

   componentDidMount() {
      this.getapi();
   }

   async getapi() {
      const response = await showAllStruttureGetApi();
      this.setState({
         property: response.data
      })
   }

   handleButton = () => {
      return null
   }

   handleClick = () => {
      this.setState({
         isOpen: !this.state.isOpen
      })
   }

   getFilters = (data) => {
      this.searchFilters = data;
      console.log(this.searchFilters);
   }

   render() {
      return (
         <>
            <Modal
               isOpen={this.state.isOpen}
               callback={this.handleClick}
               classNameCustom={'modal filters-modal'}
            >
               <Filter closeModal={this.handleClick} callback={this.getFilters} />
            </Modal>

            <Helmet>
               <title>{this.props.t("common.research")}</title>
            </Helmet>

            <div className={this.state.isOpen ? 'prevent-scrolling' : 'researchContainer'}>
               <section className='ButtonContainer'>
                  <SearchButton
                  />
                  <div>

                     <UiButton className="becomeHost"
                        callback={this.handleClick}
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
         </>
      )
   }
}

export default withTranslation()(SearchResult)