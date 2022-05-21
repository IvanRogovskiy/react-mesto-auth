import headerLogoPath from '../images/header-logo.svg'

const Register = () => {
    return (
        <div className="login-page">
            <header className="login-page__header">
                <img src={headerLogoPath} alt="Логотип в виде надписи MESTO"
                    className="header__logo"/>
                    <button className="login-page__btn">Регистрация</button>
            </header>
            <div className='auth-main-container'>
                <form className='auth-form'>
                <p className='auth-main-container__title'>Зарегистрироваться</p>
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
                    <input className='auth-form__submit auth-form__submit_type_register' type="submit" value={"Зарегистрироваться"}/>
                    <div className='auth-form__is-registered'>
                        <p>Уже зарегистрированы?</p> 
                        <a href='#' className='auth-form__is-registered-login'>Войти</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register