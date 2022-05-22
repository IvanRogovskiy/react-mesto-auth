import headerLogoPath from '../images/header-logo.svg'
import AccountInfo from "./AccountInfo";

const Header = ({loggedIn, currentUser}) => {
    return (
        <header className="header">
            <img src={headerLogoPath} alt="Логотип в виде надписи MESTO"
                 className="header__logo"/>
            <div className="header__account">
                <AccountInfo loggedIn={{loggedIn, currentUser}}/>
            </div>

        </header>
    )
}

export default Header