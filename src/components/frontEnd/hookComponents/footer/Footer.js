import React from "react";

// translation 
import { useTranslation } from 'react-i18next';

import { connect } from "react-redux";
import { useNavigate } from "react-router";
// routes 
import { routes } from "../../../../routes/routes";
import './Footer.scss';
import '../../../../assets/variables/_common.scss';

import Button from '../../funcComponents/ui/buttons/uiButtons/UiButton'

import LanguagesSwitch from '../../../common/languagesSwitch/LanguagesSwitch'

//da cancellare quando implementato duck user
let permission = 'guest';

function Footer(props) {
    const { t } = useTranslation();

    let vector = useNavigate()
    //function to Map link in Footer
    const mapLinks = ((link, key) => {

        return (
            <li onClick={goTo(link.route)} key={key}>
                {t(link.nameLink)}
            </li>
        )
    })
    // function to Go on Linkspage
    const goTo = (params) => () => {
        vector(routes[params])
    }
    return (
        <footer>
            <div className="container_links_footer flex jcSpaceB">
                <ul>
                    {props.link.map(mapLinks)}
                </ul>
                {
                    permission === 'guest' &&
                    <div>
                        <Button className="becomeHost bNone fwB cursor" callback={goTo('DASHBOARD')} label={t('fe.screens.guestAccount.becomeAHost')}></Button>
                    </div>
                }
                {/* {
                props.userDuck.user.permission[0] === 'guest' &&
                <button onClick={goTo('HOME')}>{t('fe.screens.guestAccount.becomeAHost')}</button>
                } */}
            </div>

            <LanguagesSwitch />

            <div className='disclaimer_container_footer fsI'>
                <span className='mR1 fsXS'>&copy;BeijeBnb, Inc.</span><span className="cursor fsXS" onClick={goTo('DISCLAIMER')}>{t('common.termsConditions')}</span>
            </div>




        </footer>
    )
}

const mapStateToProps = (state) => ({
    tokenDuck: state.tokenDuck,
    // userDuck : state.userDuck
})
export default connect(mapStateToProps)(Footer);