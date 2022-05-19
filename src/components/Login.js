import headerLogoPath from '../images/header-logo.svg'

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
                <p className='auth-main-container__title'>Регистрация</p>
                    <input
                        className='auth-form__input auth-form__input_type_email'
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Email'
                        required
                    ></input>
                    <input
                        className='auth-form__input auth-form__input_type_password'
                        type='text'
                        id='password'
                        name='password'
                        placeholder='Пароль'
                        required
                    ></input>
                </form>
                <div>
                <input className='auth-form__submit' type="submit" value={"Зарегистрироваться"}/>
                <p>Уже зарегистрированы?Войти</p>
                </div>
            </div>

        </div>
    )
}

export default Login