// import PropTypes from 'prop-types';
import React, { Component } from 'react';

// modules
import withRouting from '../../../../../../withRouting/withRouting';
import { t } from 'i18next';

// components
// import FormInput from '../../../../funcComponents/ui/input/formInput/FormInput';
import TextArea from '../../../../hookComponents/ui/textArea/TextArea';
import FormButton from '../../../../funcComponents/ui/buttons/formButton/FormButton';

// api
import { messageInsertPostApi } from '../../../../../../services/api/messaggi/messaggiApi';

// utils
import { getLocalStorage } from '../../../../../../utils/localStorage/localStorage';


// style
import './ContactHost.scss';




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
         // id recuperati o per props o con event-driven
         annuncioId: 15,  
         contenuto: "",
         receiverId: 22
      }
   }

   handleSubmit = async (e) => {
      e.preventDefault();
      await messageInsertPostApi(this.contactForm, getLocalStorage('token'));
      
   }

   handleChange = (params) => (e) => {
      this.contactForm[params] = e;
      let newState = Object.assign({}, this.state);
      if (this.contactForm.contenuto !== ''){
         newState.isDisable = false;
      } else {
         newState.isDisable = true;
      }
      this.setState(newState);
   }

   render() {

      return (
         <>
            <section className='contact-host-container'>
               <div>
                  <img className='rateImg' src={this.state.property.host.user.url_image} />
                  <h4>{this.state.property.host.user.name}</h4>
               </div>

               <form>
{/* 
                  <FormInput
                     type='text'
                     className=''
                     placeholder={t('common.insertTitle')}
                     callback={this.handleChange()}
                  /> */}

                  <TextArea
                     callback={this.handleChange("contenuto")}
                  />

                  <FormButton
                     className="btn-primary"
                     label={t("common.send")}
                     callback={this.handleSubmit}
                     disabled={this.state.isDisable}
                  />

               </form>
            </section>
         </>
      )
   }
}

export default withRouting(ContactHost);