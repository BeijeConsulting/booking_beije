const routes = {
    // FE
    LAYOUT : '/',
    HOME: 'home',
    LOGIN: 'login',
    REGISTRATION: '/registration',

    BOOKINGS: '/bookings',
    FAVOURITES: '/favourites',
    MESSAGES: '/messages',
    SINGLECONVERSATION: '/singleconversation',
    SETTINGS: 'settings',
    ACCOUNT: '/account',

    //details
    DETAILSPROP: 'detailsproperty',
    DETAILSPROPROOM: 'detailspropertyroom',

    //all
    CHECKOUT: 'checkout',
    NOTFOUND: '*',
    SEARCH: '/search',
    MRA: 'mostreviewedBuilding',
    DISCLAIMER : 'disclaimer',

    
    // BO
    DASHBOARD: 'dashboard',
    HOST_ACCOUNT: 'host-account',
    MESSAGE_LIST: 'message-list',
    MESSAGE_CHAT: 'message-chat',
    STRUCTURE_OPERATION: 'structure-operation',
    STRUCTURE_LIST: 'structure-list',
    STRUCTURE_DETAILS: 'structure-details',
    ANNOUNCE_OPERATION: 'announce-operation',
    RESERVATION_CALENDAR: 'reservation-calendar',
    RESERVATION_LIST: 'reservation-list',
    HOST_REGISTRATION: 'host-registration',
    PENDING_ANNOUNCE_LIST: 'pending-announce-list' //to add in admin route
}

export {
    routes
}