import * as auth from '../utils/auth'
import headerLogoPath from '../images/header-logo.svg'
import {useEffect, useState} from "react";
import InfoToolTip from "./InfoToolTip";
import {useHistory} from "react-router-dom";

const Register = () => {

    const [value, setValue] = useState({});
    const [showTooltip, setShowTooltip] = useState(false);
    const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false);
    const history = useHistory()

    const {email, password} = value;
    const handleSubmit = (e) => {
        e.preventDefault();
        auth.register(email, password)
            .then((res) => {
                setShowTooltip(true);
                if(res.code === 400) {
                    setRegisteredSuccessfully(false);
                }
                setRegisteredSuccessfully(true);
            })
    }

    const handleChange = (e) => {
      const name = e.target.name;
      const newValue = e.target.value;
      setValue({
          ...value,
          [name]: newValue
      })
    }

    const handleTooltipClose = () => {
        if (registeredSuccessfully) {
            history.push('/sign-in')
        }
        setShowTooltip(false);
    }

    return (
        <div className="login-page">
            <header className="login-page__header">
                <img src={headerLogoPath} alt="Логотип в виде надписи MESTO"
                    className="header__logo"/>
                    <button className="login-page__btn">Войти</button>
            </header>
            <div className='auth-main-container'>
                <form className='auth-form' onSubmit={handleSubmit}>
                <p className='auth-main-container__title'>Зарегистрироваться</p>
                    <input
                        className='auth-form__input auth-form__input_type_email'
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Email'
                        required
                        onChange={handleChange}
                        value={value.email}
                    />
                    <input
                        className='auth-form__input auth-form__input_type_password'
                        type='password'
                        id='password'
                        name='password'
                        placeholder='Пароль'
                        required
                        onChange={handleChange}
                        value={value.password}
                    />
                    <div>
                        <input className='auth-form__submit auth-form__submit_type_register' type="submit" value={"Зарегистрироваться"}/>
                        <div className='auth-form__is-registered'>
                            <p>Уже зарегистрированы?</p>
                            <a href='#' className='auth-form__is-registered-login'>Войти</a>
                        </div>
                    </div>
                </form>
            </div>
            {showTooltip && <InfoToolTip successfully={registeredSuccessfully} onClose={handleTooltipClose}/> }
        </div>
    )
}

export default Register