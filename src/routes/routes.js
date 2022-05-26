const routes = {
    // FE
    LAYOUT: '/',
    HOME: 'home',
    LOGIN: 'login',
    REGISTRATION: '/registration',

    BOOKINGS: '/bookings',
    CHAT: '/chat',
    FAVOURITES: '/favourites',
    MESSAGES: '/messages',
    SINGLECONVERSATIONMOBILE: '/singleconversation/:id',
    SINGLECONVERSATION: 'singleconversation/:id',
    SETTINGS: 'settings',
    ACCOUNT: '/account',

    //details
    DETAILSPROP: '/detailsproperty/:id',
    DETAILSPROPROOM: 'detailsproperty/rooms/:id',

    //all
    CHECKOUT: '/checkout',
    NOTFOUND: '*',
    SEARCH: '/search',
    MRA: 'mostreviewedBuilding',
    DISCLAIMER: 'disclaimer',


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

let routesDetails = {
    singleConversation: function (params) {
        return `singleconversation/${params}`
    },
    singleConversationMobile: function (params) {
        return `/singleconversation/${params}`
    },
    detailProperty: function (params) {
        return `detailsproperty/${params} `
    },
    detailPropertyRoom: function (params) {
        return `detailsproperty/rooms/${params} `
    }
}

export {
    routes,
    routesDetails
}