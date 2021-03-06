// import PropTypes from 'prop-types';
import React, { Component } from 'react';

// modules
import { withTranslation } from 'react-i18next';
import withRouting from '../../../../../../withRouting/withRouting';


// components
import FormInput from '../../../../funcComponents/ui/input/formInput/FormInput';
import TextArea from '../../../../hookComponents/ui/textArea/TextArea';
import FormButton from '../../../../funcComponents/ui/buttons/formButton/FormButton';

// api
import { reviewPostApi } from '../../../../../../services/api/recensioni/recensioniApi';

// utils
import { getLocalStorage } from '../../../../../../utils/localStorage/localStorage';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutlined } from '@fortawesome/free-regular-svg-icons';

import './Rate.scss';
import '../../../../../../assets/variables/_common.scss';



class Rate extends Component {
   constructor(props) {
      super(props)
      this.state = {
         isDisable: true,
         clickedStar: 0,
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
         rate: 0,
         propertyId: props?.struttura_id
      }
      this.map = [1, 2, 3, 4, 5];
   }


   componentDidMount() {
      // this.setState({
      //     property: 
      // })
      //chiamata api
   }

   handleSubmit = async (e) => {
      e.preventDefault();
      await reviewPostApi(this.rating, getLocalStorage('token'));
   }

   handleChange = (params) => (e) => {
      this.rating[params] = e;
      let newState = Object.assign({}, this.state);
      if ((this.rating.title && this.rating.message) !== '') {
         newState.isDisable = false;
      } else {
         newState.isDisable = true;
      }
      this.setState(newState);
   }

   handleRate = (value) => (e) => {
      this.setState({ clickedStar: value });
      this.rating.rate = value;
   }

   handleMap = (item, key) => {
      return <FontAwesomeIcon key={key} icon={key < this.state.clickedStar ? faStar : faStarOutlined} onClick={this.handleRate(item)} />
   }



   render() {

      return (
         <>
            <section className='rateContainer'>
               <div>
                  {/* da fare chiamata per l'immagine della propriet?? */}
                  <img className='rateImg' src={this.state.property.host.user.url_image} />
                  <div>
                     <h3>{this.state.property.nome_struttura}</h3>
                     <small>{`${this.state.property.indirizzo.citta}, ${this.state.property.indirizzo.stato}`}</small>
                     <small>{this.props.t('common.extendedDate', { value: this.state.property.checkin })} - {this.props.t('common.extendedDate', { value: this.state.property.checkout })} </small>
                     <small>
                        <FontAwesomeIcon icon={faStar} />
                        {this.state.property.media_recensioni}
                        ({this.state.property.numero_recensioni})
                     </small>
                  </div>

                  <div>
                     <img className='rateImg' src={this.state.property.host.user.url_image} />
                     <h4>{this.state.property.host.user.name}</h4>
                  </div>

                  <form className='flex column jcCenter'>
                     <FormInput
                        type='text'
                        className=''
                        placeholder={this.props.t('common.insertTitle')}
                        callback={this.handleChange("title")}
                     />

                     <TextArea
                        callback={this.handleChange("message")}
                     />

                     <FormButton
                        className="btn-primary"
                        label={this.props.t("common.rate")}
                        callback={this.handleSubmit}
                        disabled={this.state.isDisable}
                     />

                     <div>
                        {
                           this.map.map(this.handleMap)
                        }
                     </div>

                  </form>

               </div>
            </section>
         </>
      )
   }
}

export default withTranslation()(withRouting(Rate));