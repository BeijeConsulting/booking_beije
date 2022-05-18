// rules 
//if you want to add some Links in your footer :
// 1) the name of THe route is the same of the routepath (file routes.js)
// HOST 
const LinksFooterHost = [
    {
        route: 'HOME',
        nameLink: 'Home'
    },
    {
        route: 'MRA',
        nameLink: 'Most Reviewed Apartments'
    },
    {
        route : 'DASHBOARD',
        nameLink: 'Vai a dashboard'
    }
    
]

// GUEST 
const LinksFooterGuest = [
    {
        route: 'HOME',
        nameLink: 'Home'
    },
    {
        route: 'MRA',
        nameLink: 'Most Reviewed Apartments'
    }
]
export { LinksFooterHost, LinksFooterGuest }