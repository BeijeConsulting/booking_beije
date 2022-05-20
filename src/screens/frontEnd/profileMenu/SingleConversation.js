import React from "react";

import { Helmet } from 'react-helmet'



/* const single =
{
  announceName: 'string',
  announceProfileIcon: 'url',
  hostName: 'string',
  messages: [{
    id: int,
    idSender: int, //ID di chi ha inviato il messaggio (guest o host)
    text: 'string',
    dateTime: dateTime
  }]
}
 */


const SingleConversation = () => {
  return (
    <>
      <Helmet>
        <title>SingleConversation</title>
      </Helmet>
      <p>SingleConversation</p>
    </>
  );
};

export default SingleConversation
