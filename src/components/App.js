import React from "react";
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/currentUserContext';
import {Switch, Route, withRouter, useHistory, Redirect} from 'react-router-dom';
import PageContainer from './PageContainer';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from "./Register";
import * as auth from "../utils/auth";
import Preloader from "./Preloader";
import InfoToolTip from './InfoToolTip';

const App = () => {

    const [currentUser, setCurrentUser] = React.useState({});
    const [account, setAccount] = React.useState('')
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [showTooltip, setShowTooltip] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const [successfully, setSuccessfully] = React.useState(true);

    const history = useHistory()

    const [cards, setCards] = React.useState([]);

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({
        isOpened: false,
        name: "",
        link: ""
    });

    const handleLogin = (email, password) => {
        auth.authorize(email, password)
        .then(() => {
            handleTokenCheck();
            setIsLoggedIn(true);
            setShowTooltip(true);
            setMessage('Вы успешно вошли в систему!')
            setSuccessfully(true);
        })
        .catch((err) => {
            setIsLoggedIn(false);
            setMessage(err.message)
            setShowTooltip(true);
            setSuccessfully(false);
        })
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('jwt');
        history.push('/sign-in');
    }

    const handleRegister = (email, password) => {
        auth.register(email, password)
        .then(() => {
            setMessage('Вы успешно зарегистрировались!');
            setSuccessfully(true);
            setShowTooltip(true);
        })
        .catch((err) => {
            setMessage(err.message);
            setSuccessfully(false);
            setShowTooltip(true);
        })
    }

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }
    
    const closeAllPopups = () => {
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setSelectedCard({...selectedCard, isOpened: false})
    }

    const handleEscPress = (e) => {
      if (e.keyCode === 27) {
          closeAllPopups()
      }
    }

    const handleCardClick = (card) => {
        setSelectedCard({
            isOpened: true,
            name: card.name ,
            link: card.link,
        })
    }
    
    const handleUpdateUser = ({name, about}) => {
      api.updateUserInfo({name, about})
          .then(data => setCurrentUser({currentUser, ...data}))
          .catch(err => console.log(err)) 
      closeAllPopups();
    }

    const handleUpdateAvatar = (link) => {
        api.updateUserAvatar(link)
            .then(data => setCurrentUser({currentUser, ...data}))
            .catch(err => console.log(err))
        closeAllPopups();
    }

    const handlePlaceAdd = ({name, link}) => {
        api.addNewCard({name, link})
            .then(newCard => {
                setCards([newCard, ...cards])
            })
            .catch(err => console.log(err))
        closeAllPopups();
    }

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (!isLiked) {
            api.addLike(card._id)
                .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
                .catch(err => console.log(err));
        } else {
            api.removeLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c))})
                .catch(err => console.log(err))
        }
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id))})
            .catch(err => console.log(err))
    }
    
    const handleTokenCheck = () => {
      if (localStorage.getItem('jwt')) {
          const jwt = localStorage.getItem('jwt');
          auth.checkToken(jwt)
              .then(({data})=> {
                  setAccount(data.email)
                  setIsLoggedIn(true);
                  setIsLoading(false);
              })
              .catch(err => console.log(err))
              .finally(() => {
                  setIsLoading(false)
              })
      } else {
          setIsLoading(false)
      }
    }


    const handleTooltipClose = () => {
        debugger
        if (isLoggedIn) {
            history.push('/');
        } else {
            history.push('/sign-in');
        }
        setShowTooltip(false);
    }

    React.useEffect(() => {
        api.getMyProfileInfo()
            .then((userData) => {
                setCurrentUser(userData)
            })
            .catch(err => console.log(err))
    }, [])

    React.useEffect(() => {
        api.getUsersCards()
            .then((userCards) => {
                setCards(userCards)
            })
            .catch(err => console.log(err))
    }, [])

    React.useEffect(handleTokenCheck, [history])

    return (
      isLoading
          ? ( <Preloader/> )
          :
          ( <CurrentUserContext.Provider value={{currentUser, account, isLoggedIn}}>
                <Switch>
                    <ProtectedRoute
                        component={PageContainer}
                        exact
                        path={"/"}
                        handleEscPress={handleEscPress}
                        handleEditProfileClick={handleEditProfileClick}
                        handleEditAvatarClick={handleEditAvatarClick}
                        handleAddPlaceClick={handleAddPlaceClick}
                        handleCardClick={handleCardClick}
                        cards={cards}
                        user={currentUser}
                        handleUpdateUser={handleUpdateUser}
                        handleCardLike={handleCardLike}
                        handleCardDelete={handleCardDelete}
                        isAddPlacePopupOpen={isAddPlacePopupOpen}
                        closeAllPopups={closeAllPopups}
                        handlePlaceAdd={handlePlaceAdd}
                        isEditProfilePopupOpen={isEditProfilePopupOpen}
                        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                        handleUpdateAvatar={handleUpdateAvatar}
                        selectedCard={selectedCard}
                        handleLogout = {handleLogout}
                        loggedIn={isLoggedIn}
                    />
                    <Route path="/sign-in">
                        <Login onLogin={handleLogin}/>
                    </Route>
                    <Route path="/sign-up">
                        <Register onRegister={handleRegister}/>
                    </Route>
                    <Route path="*">
                       { isLoggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/> }
                    </Route>
                </Switch>
                { showTooltip && <InfoToolTip successfully={successfully} message={message} onClose={handleTooltipClose}/> }
            </CurrentUserContext.Provider>))
};
export default withRouter(App);