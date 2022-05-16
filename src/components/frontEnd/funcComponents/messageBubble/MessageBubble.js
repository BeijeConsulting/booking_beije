import React from 'react';
import PropTypes from 'prop-types';

//localization
import { useTranslation } from 'react-i18next';

// style
import './MessageBubble.less';


function MessageBubble(props) {

   const { t } = useTranslation();

   return (
      <div className='message-container'>
         <header>
            {props.author}
         </header>
         <main>
            {props.message}
         </main>
         <footer>
            <time dateTime={props.datetime}>
               {t('common.shortDate', {
                  value: new Date(Date.now())
               })}
            </time> - 
            <time dateTime={props.datetime}>
               {t('common.time', {
                  value: new Date(Date.now())
               })}
            </time>
         </footer>
      </div>
   )
}

MessageBubble.propTypes = {
    datetime: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
}

export default MessageBubble;