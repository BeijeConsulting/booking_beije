import React, { useEffect, useState } from 'react';

// style
import './Filter.scss';
import '../../../../assets/variables/_common.scss'

// components
import FormButton from '../../funcComponents/ui/buttons/formButton/FormButton';
import { Slider } from 'antd';
import CheckboxInput from '../../funcComponents/ui/input/checkboxInput/CheckboxInput';

// modules
import { useTranslation } from 'react-i18next';

// api
import { showAllTipoStrutturaGetApi } from '../../../../services/api/struttura/tipoStruttura/tipoStruttura';
import { servicesGetApi } from '../../../../services/api/servizio/servizioApi';

function Filter(props) {

   const { t } = useTranslation();

   const [state, setState] = useState({
      isDisable: false,
      propertyTypes: null,
      services: null
   })

   const filtersData = {
      min_price: null,
      max_price: null,
      lista_id_tipo_strutture: [],
      lista_id_tipo_servizi: []
   }

   const callbackUseEffect = () => {
      (async () => {
         const types = await showAllTipoStrutturaGetApi();
         const amenities = await servicesGetApi();
         setState({
            ...state,
            propertyTypes: types?.data,
            services: amenities?.data
         })
      })()
   }

   useEffect(callbackUseEffect, []);

   const handleCheck = (dataKey, dataId) => (value) => {
      if (value) {
         if (!filtersData[dataKey].includes(dataId)) {
            filtersData[dataKey].push(dataId);
         }
      } else {
         filtersData[dataKey].splice(filtersData[dataKey].indexOf(dataId), 1);
      }
   }

   const mapType = (item, key) => {
      return <div key={`${key}-${item.tipo}`}>
         <CheckboxInput callback={handleCheck('lista_id_tipo_strutture', item.id)} value={item.id} />
         <label>{t(item.tipo)}</label>
      </div>
   };

   const mapService = (item, key) => {
      return <div key={`${key}-${item?.nome}`}>
         <CheckboxInput callback={handleCheck('lista_id_tipo_servizi', item?.id)} value={item?.id} />
         <label>{t(item?.nome)}</label>
      </div>
   };

   function handleSubmit(e) {
      e.preventDefault();
      props.closeModal();

      let filtersAsArray = Object.entries(filtersData);
      let filtered = filtersAsArray.filter(([key, value]) => {
         return (Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value !== null);
      });
      let appliedFilters = Object.fromEntries(filtered);

      props.callback(appliedFilters);
   }

   const handlePrice = (value) => {
      [filtersData.min_price, filtersData.max_price] = value;
   };


   return (
      <form className={props.classNameCustom}>
         <section>
            <h3>{t("common.price")}</h3>
            <div className='filter-container br3 p1 w100'>
               <Slider
                  range
                  defaultValue={[0, 1000]} /* check default prices */
                  onAfterChange={handlePrice}
               />
            </div>
         </section>

         <section>

            <h3>{t('common.properties')}</h3>
            <div className='filter-container br3 p1 w100'>
               {
                  state.propertyTypes !== null && state.propertyTypes.map(mapType)
               }
            </div>


            <h3>{t('common.services')}</h3>
            <div className='filter-container br3 p1 w100'>
               {
                  state.services !== null && state.services.map(mapService)
               }
            </div>

         </section>

         <FormButton className="btn-primary" label={t("fe.modals.filter.apply")} callback={handleSubmit} disabled={state.isDisable} />

      </form>
   )
}

export default Filter;