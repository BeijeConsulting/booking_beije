import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
// routes 
import { routes } from "../../../../routes/routes";
import './Footer.less';

let permission = 'guest';
function Footer(props) {
    let vector = useNavigate()
    //function to Map link in Footer
    const mapLinks = ((link, key) => {

        return (
            <li onClick={goTo(link.route)} key={key}>
                {link.nameLink}
            </li>
        )
    })
    // function to Go on Linkspage
    const goTo = (params) => () => {
        console.log(params)
        vector(routes[params])
    }
    return (
        <footer>
            <ul>
                {props.link.map(mapLinks)}
            </ul>
            {
                permission === 'guest' &&
                <button onClick={goTo('HOME')}>becomeHost</button>
            }
        </footer>
    )
}

const mapStateToProps = (state) => ({
    tokenDuck: state.tokenDuck
})
export default connect(mapStateToProps)(Footer);