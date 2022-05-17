const routes = {
    // FE
    HOME: '/',
    LOGIN: '/login',
    REGISTRATION: '/registration',

    BOOKED: '/login/bookings',
    FAVOURITE: '/login/favourites',
    MESSAGES: '/login/messages',
    SINGLECONVERSATION: '/login/singleconversation',
    SETTINGS: '/login/settings',

    //details
    DETAILSPROP: 'detailsproperty',
    DETAILSPROPROOM: 'detailspropertyroom',

    //all
    CHECKOUT: '/checkout',
    NOTFOUND: '/*',
    SEARCH: '/search',
    MRA: '/mostreviewedBuilding',


    // BO
    DASHBOARD: 'dashboard',
    HOST_ACCOUNT: 'host-account',
    MESSAGE_LIST: 'message-list',
    MESSAGE_CHAT: 'message-chat',
    STRUCTURE_OPERATION: 'structure-operation',
    STRUCTURE_LIST: 'structure-list',
    STRUCTURE_DETAILS: 'structure-details',
    RESERVATION_CALENDAR: 'reservation-calendar'
}

export {
    routes
}