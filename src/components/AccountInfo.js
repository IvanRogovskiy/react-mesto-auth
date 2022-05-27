import {useHistory} from "react-router-dom";
import {useContext} from 'react';
import {CurrentUserContext} from "../contexts/currentUserContext";

const AccountInfo = () => {
  const history = useHistory();
  const value = useContext(CurrentUserContext);

  const handleExit = (e) => {
    e.preventDefault()
    localStorage.removeItem('jwt');
    history.push('/sign-in')
  }

  return (
      <>
        <p className='header__account-email'>{value.account}</p>
        <button onClick={handleExit} className='header__account-action'>{'Выйти'}</button>
      </>
  )
}

export default AccountInfo