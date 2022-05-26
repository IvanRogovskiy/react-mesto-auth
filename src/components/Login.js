import headerLogoPath from '../images/header-logo.svg'
import {useHistory, withRouter} from "react-router-dom";
import * as auth from "../utils/auth";
import {useState} from "react";
import InfoToolTip from "./InfoToolTip";

const Login = ({onLogin}) => {

    const [value, setValue] = useState({});
    const [showTooltip, setShowTooltip] = useState(false);
    const [loggedInSuccessfully, setloggedInRegisteredSuccessfully] = useState(false);
    const [message, setMessage] = useState('');
    const history = useHistory();

    const {email, password} = value;

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.authorize(email, password)
            .then((res) => {
                console.log(res)
                setShowTooltip(true);
                setMessage('Вы успешно вошли в систему!')
                setloggedInRegisteredSuccessfully(true);
                onLogin();
            })
            .catch((err) => {
                setloggedInRegisteredSuccessfully(false);
                setMessage(err.message)
                setShowTooltip(true);
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
        if (loggedInSuccessfully) {
            history.push('/')
        }
        setShowTooltip(false);
    }

    const handleRegisterClick = () => {
      history.push('/sign-up')
    }

    return (
        <div className="login-page">
            <header className="login-page__header">
                <img src={headerLogoPath} alt="Логотип в виде надписи MESTO"
                    className="header__logo"/>
                    <button onClick={handleRegisterClick} className="login-page__btn">Регистрация</button>
            </header>
            <div className='auth-main-container'>
                <form className='auth-form' onSubmit={handleSubmit}>
                <p className='auth-main-container__title'>Вход</p>
                    <input
                        className='auth-form__input auth-form__input_type_email'
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Email'
                        onChange={handleChange}
                        required
                    />
                    <input
                        className='auth-form__input auth-form__input_type_password'
                        type='password'
                        id='password'
                        name='password'
                        placeholder='Пароль'
                        onChange={handleChange}
                        required
                    />
                    <div className='auth-form__ctrl'>
                        <input className='auth-form__submit auth-form__submit_type_login' type="submit" value={"Войти"}/>
                    </div>
                </form>
            </div>
            { showTooltip && <InfoToolTip successfully={loggedInSuccessfully} message={message} onClose={handleTooltipClose}/> }
        </div>
    )
}

export default withRouter(Login)