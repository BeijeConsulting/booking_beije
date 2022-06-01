// import PropTypes from 'prop-types';
import React, { Component } from 'react';

// default img 
import homeplaceholder from '../../../../../../assets/images/homeplaceholder.png'

// modules
import withRouting from '../../../../../../withRouting/withRouting';
import { withTranslation } from 'react-i18next';

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
import '../../../../../../assets/variables/_common.scss';

import { notification } from 'antd';

import { routes } from '../../../../../../routes/routes';

class ContactHost extends Component {
   constructor(props) {
      super(props)
      this.state = {
         isDisable: true,
      }
      this.contactForm = {
         annuncioId: props.router.params.id,
         contenuto: "",
         receiverId: props.propertyRooms?.struttura?.host?.user?.id
      }
   }
   openNotification = (toastDescription, name, additionalCss = '') => {
      const key = `${name}-toast`;
      let cssClass = `custom-toast ${additionalCss}`;
      notification.open({
         description: toastDescription,
         onClick: () => {
            notification.close(key)
         },
         duration: 2,
         key,
         placement: 'bottom',
         className: cssClass
      });
   };
   handleSubmit = async (e) => {
      e.preventDefault();
      if (getLocalStorage('token') === null) {
         return this.openNotification(this.props.t('toasts.loginToPursue'), 'info-toast');
      }
      try {
         await messageInsertPostApi(this.contactForm, getLocalStorage('token'));
         this.openNotification(this.props.t('toasts.messageSent'));
         this.props.router.navigate(routes.LAYOUT);

      }
      catch (error) {
         this.openNotification(this.props.t('toasts.messageNotSent'))
      }

   }

   handleChange = (params) => (e) => {
      this.contactForm[params] = e;
      let newState = Object.assign({}, this.state);
      if (this.contactForm.contenuto !== '') {
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
               <div className="info_receiver">
                  {
                     this.props?.propertyRoomsImage?.length > 0 ?
                        <img className='rateImg' src={this.props.propertyRoomsImage[0]?.urlImage} /> :
                        <img className='rateImg' src={homeplaceholder} />
                  }
                  <h4>{this.props?.propertyRooms?.descrizione}</h4>
               </div>

               <form>
                  <TextArea
                     callback={this.handleChange("contenuto")}
                  />

                  <FormButton
                     className="btn-primary"
                     label={this.props.t("common.send")}
                     callback={this.handleSubmit}
                     disabled={this.state.isDisable}
                  />

               </form>
            </section>
         </>
      )
   }
}

export default withTranslation()(withRouting(ContactHost));