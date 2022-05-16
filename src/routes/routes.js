const routes = {
    // FE
    HOME: '/',
    LOGIN: '/login',
    REGISTRATION: '/registration',

    BOOKED: '/login/:bookings',
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
}

export {
    routes
}