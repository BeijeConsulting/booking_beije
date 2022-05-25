import React, { useEffect, useState } from 'react';

// style
import './Filter.scss';

// components
import FormButton from '../../funcComponents/ui/buttons/formButton/FormButton';
import { Slider } from 'antd';
import CheckboxInput from '../../funcComponents/ui/input/checkboxInput/CheckboxInput';

// api
import { showAllTipoStrutturaGetApi } from '../../../../services/api/struttura/tipoStruttura/tipoStruttura';
import { serviceListGetApi } from '../../../../services/api/lista/listaServizio/listaServizioApi';
import { useTranslation } from 'react-i18next';

function Filter() {

    const { t } = useTranslation();

    const [state, setState] = useState({
        isDisable: true,
        propertyTypes: null,
        services: null
    })

    const callbackUseEffect = () => {
        (async () => {
            const types = await showAllTipoStrutturaGetApi();
            const amenities = await serviceListGetApi();

            setState({
                ...state,
                propertyTypes: types?.data,
                services: amenities?.data
            })

            console.log(state);

        })()
    }


    useEffect(callbackUseEffect, [])

    function handleCheck(e) {
        return null
    }

    const mapType = (item, key) => {
       return  <div key={`${key}-${item.tipo}`}>
            <CheckboxInput callback={handleCheck} value={item.id} />
            <label>{t(item.tipo)}</label>
        </div>
    };

    const mapService = (item, key) => {
        return  <div key={`${key}-${item.servizioId?.nome}`}>
             <CheckboxInput  callback={handleCheck} value={item.servizioId?.id} />
             <label>{t(item.servizioId?.nome)}</label>
         </div>
     };

    function handleSubmit(e) {
        e.preventDefault();
    }


    return (
        <form>
            <section>
                <h3>{t("common.price")}</h3>
                <Slider
                    range
                    defaultValue={[10, 1000]}
                />
            </section>

            <section>

                {
                   state.propertyTypes !== null && state.propertyTypes.map(mapType)
                }
                {
                   state.services !== null && state.services.map(mapService)
                }

            </section>

            <FormButton className="btn-primary" label={t("fe.modals.filter.apply")} callback={handleSubmit} disabled={state.isDisable} />

        </form>
    )
}

export default Filter;