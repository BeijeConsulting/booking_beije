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
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutlined } from '@fortawesome/free-regular-svg-icons';

import './ContactHost.less';




class ContactHost extends Component {
   constructor(props) {
      super(props)
      this.state = {
         isDisable: true,
         property: {
            host: {
               id: 0,
               user: {
                  name: "hotel bau",
                  url_image: "string"
               }
            },
            id: 0,
            nome_struttura: "string",
            numero_recensioni: 0,
         }
      }
      this.contactForm = {
         title: "",
         message: "",
      }
   }

   handleSubmit = async (e) => {
      e.preventDefault();
      await reviewPostApi(this.contactForm, getLocalStorage('token'));
   }

   handleChange = (params) => (e) => {
      this.contactForm[params] = e;
   }

   render() {

      return (
         <>
            <section className='contact-host-container'>
               <div>
                  {/* da fare chiamata per l'immagine della proprietà */}
                  <img className='rateImg' src={this.state.property.host.user.url_image} />
                  <div>
                     <h3>{this.state.property.descrizione}</h3>
                     <small>{`${this.state.property.indirizzo.citta}, ${this.state.property.indirizzo.stato}`}</small>
                     <small>{t('common.extendedDate', { value: this.state.property.checkin })} - {t('common.extendedDate', { value: this.state.property.checkout })} </small>
                     {this.state.property.numero_recensioni > 0 &&
                        <small>
                           <FontAwesomeIcon icon={faStar} />
                           {this.state.property.media_recensioni}
                           ({this.state.property.numero_recensioni})
                        </small>
                     }
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
                        label={t("common.rate")}
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

export default withRouting(ContactHost);