import headerLogoPath from '../images/header-logo.svg'
import {withRouter} from "react-router-dom";

const Login = () => {
    return (
        <div className="login-page">
            <header className="login-page__header">
                <img src={headerLogoPath} alt="Логотип в виде надписи MESTO"
                    className="header__logo"/>
                    <button className="login-page__btn">Войти</button>
            </header>
            <div className='auth-main-container'>
                <form className='auth-form'>
                <p className='auth-main-container__title'>Вход</p>
                    <input
                        className='auth-form__input auth-form__input_type_email'
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Email'
                        required
                    />
                    <input
                        className='auth-form__input auth-form__input_type_password'
                        type='password'
                        id='password'
                        name='password'
                        placeholder='Пароль'
                        required
                    />
                </form>
                <div>
                    <input className='auth-form__submit auth-form__submit_type_login' type="submit" value={"Войти"}/>
                </div>
            </div>

        </div>
    )
}

export default withRouter(Login)