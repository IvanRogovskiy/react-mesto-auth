import {useContext} from 'react';
import {CurrentUserContext} from "../contexts/currentUserContext";

const AccountInfo = ({onProfileLogout}) => {
  const value = useContext(CurrentUserContext);

  const handleExit = (e) => {
    e.preventDefault()
    onProfileLogout();
  }

  return (
      <>
        <p className='header__account-email'>{value.account}</p>
        <button onClick={handleExit} className='header__account-action'>{'Выйти'}</button>
      </>
  )
}

export default AccountInfo