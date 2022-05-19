import headerLogoPath from '../images/header-logo.svg'

const Header = () => {
    return (
        <header className="header">
            <img src={headerLogoPath} alt="Логотип в виде надписи MESTO"
                 className="header__logo"/>
        </header>
    )
}

export default Header