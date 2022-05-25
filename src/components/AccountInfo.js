import {useHistory} from "react-router-dom";

const AccountInfo = ({currentUser}) => {
  const history = useHistory();

  const handleExit = (e) => {
    e.preventDefault()
    localStorage.removeItem('jwt');
    history.push('/sign-in')
  }

  return (
      <>
        <p className='header__account-email'>{'ivanqrg@gmail.com'}</p>
        <a href='www.ya.ru' onClick={handleExit} className='header__account-action'>{'Выйти'}</a>
      </>
  )
}

export default AccountInfo