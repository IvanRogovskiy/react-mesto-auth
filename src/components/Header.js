import headerLogoPath from '../images/header-logo.svg'
import AccountInfo from "./AccountInfo";

const Header = ({logOut}) => {

    const handleLogout = () => {
        logOut();
    }

    return (
        <header className="header">
            <img src={headerLogoPath} alt="Логотип в виде надписи MESTO"
                 className="header__logo"/>
            <div className="header__account">
                <AccountInfo onProfileLogout={handleLogout}/>
            </div>

        </header>
    )
}

export default Header