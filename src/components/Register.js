import headerLogoPath from '../images/header-logo.svg'
import {useState} from "react";
import {useHistory} from "react-router-dom";

const Register = ({onRegister}) => {

    const [value, setValue] = useState({});
    const history = useHistory();

    const {email, password} = value;

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(email, password);
    }

    const handleChange = (e) => {
      const name = e.target.name;
      const newValue = e.target.value;
      setValue({
          ...value,
          [name]: newValue
      })
    }

    const handleLoginClick = (e) => {
      e.preventDefault();
      history.push('/sign-in')
    }

    return (
        <div className="login-page">
            <header className="login-page__header">
                <img src={headerLogoPath} alt="Логотип в виде надписи MESTO"
                    className="header__logo"/>
                    <button onClick={handleLoginClick} className="login-page__btn">Войти</button>
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
                    <div className='auth-form__ctrl'>
                        <input className='auth-form__submit auth-form__submit_type_register' type="submit" value={"Зарегистрироваться"}/>
                        <div className='auth-form__is-registered-container'>
                            <p className='auth-form__is-registered'>Уже зарегистрированы?</p>
                            <button onClick={handleLoginClick} className='auth-form__is-registered-login'>Войти</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register