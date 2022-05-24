import PropTypes from 'prop-types';
import React, { Component } from 'react';
import withRouting from '../../../../../../withRouting/withRouting';
import { t } from 'i18next';
import FormInput from '../../../../funcComponents/ui/input/formInput/FormInput';
import TextArea from '../../../../hookComponents/ui/textArea/TextArea';
import FormButton from '../../../../funcComponents/ui/buttons/formButton/FormButton';
import { reviewPostApi } from '../../../../../../services/api/recensioni/recensioniApi';
import { getLocalStorage } from '../../../../../../utils/localStorage/localStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';



class Rate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDisable: true,
            isRated: false,
            property: {
                checkin: "10-10-10",
                checkout: "11-11-10",
                descrizione: "descxrizione",
                host: {
                    id: 0,
                    user: {
                        name: "hotel bau",
                        url_image: "string"
                    }
                },
                id: 0,
                indirizzo: {
                    cap: "string",
                    citta: "Pippo",
                    disable_date: "2022-05-24T08:03:57.469Z",
                    id: 0,
                    latitudine: 0,
                    longitudine: 0,
                    numero_civico: "string",
                    provincia: "string",
                    stato: "Italia",
                    struttura_id: 0,
                    utente_id: 0,
                    via: "string"
                },
                media_recensioni: 0,
                nome_struttura: "string",
                numero_recensioni: 0,
            }
        }
        this.rating = {
            title: "",
            message: "",
            rate: 0
        }
        this.map = [1, 2, 3, 4, 5]
    }


    componentDidMount() {
        // this.setState({
        //     property: 
        // })
        //chiamata api
    }

    componentDidUpdate(prevProp, prevState) {
        if (prevState.isRated !== this.state.isRated) console.log(this.state.isRated);

    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await reviewPostApi(this.rating, getLocalStorage('token'));

    }

    handleChange = (params) => (e) => {
        this.rating[params] = e
    }

    handleRate = (key) => (e) => {
        if(key )
        this.setState({ isRated: true })
    }

    handleMap = (item, key) => {
        return <FontAwesomeIcon key={key} icon={this.state.isRated ? faStar : faStarHalf} onClick={this.handleRate(key)} />
    }



    render() {

        return (
            <>
                <section className='rateContainer'>
                    <div>
                        {/* da fare chiamata per l'immagine della proprietà */}
                        <img className='rateImg' src={this.state.property.host.user.url_image} />
                        <div>
                            <h3>{this.state.property.descrizione}</h3>
                            <small>{`${this.state.property.indirizzo.citta}, ${this.state.property.indirizzo.stato}`}</small>
                            <small>{t('common.extendedDate', { value: this.state.property.checkin })} - {t('common.extendedDate', { value: this.state.property.checkout })} </small>
                        </div>

                        <div>
                            <img className='rateImg' src={this.state.property.host.user.url_image} />
                            <h4>{this.state.property.host.user.name}</h4>
                        </div>

                        <form>
                            <FormInput
                                type='text'
                                className=''
                                placeholder={t('common.insertTitle')}
                                callback={this.handleChange("title")}
                            />

                            <TextArea
                                callback={this.handleChange("message")}
                            />

                            <FormButton
                                className="btn-primary"
                                label={t("common.loginLabel")}
                                callback={this.handleSubmit}
                                disabled={this.state.isDisable}
                            />

                            {
                                this.map.map(this.handleMap)
                            }

                        </form>

                    </div>
                </section>
            </>
        )
    }
}

export default withRouting(Rate);