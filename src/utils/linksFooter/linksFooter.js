// rules 
//if you want to add some Links in your footer :
// 1) the name of THe route is the same of the routepath (file routes.js)
// HOST 
const LinksFooterHost = [
    {
        route: 'HOME',
        nameLink: 'common.home'
    },
    {
        route: 'MRA',
        nameLink: 'common.mra'
    },
    {
        route: 'DASHBOARD',
        nameLink: 'inserire traduzione'
    }

]

// GUEST 
const LinksFooterGuest = [
    {
        route: 'HOME',
        nameLink: 'common.home'
    },
    {
        route: 'MRA',
        nameLink: 'common.mra'
    }
]
export { LinksFooterHost, LinksFooterGuest }