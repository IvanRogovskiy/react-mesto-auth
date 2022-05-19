import '../App.css';
import React from "react";
import '../index.css'
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/currentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

const App = () => {

    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({
        isOpened: false,
        name: "",
        link: ""
    });

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

    React.useEffect(() => {
        api.getMyProfileInfo()
            .then((userData) => {
                console.log(userData);
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

    React.useEffect(() => {
        const handleEscPress = (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }
        window.addEventListener('keydown', handleEscPress);
        return () => {
            window.removeEventListener('keydown', handleEscPress);
        }
    }, [closeAllPopups])

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className={'page-container'} onKeyPress={handleEscPress}>
            <Header/>
            <Main
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards = {cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
            />
            <Footer/>
            <AddPlacePopup
                isOpened={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handlePlaceAdd}
            />
            <EditProfilePopup
                isOpened={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUserUpdate={handleUpdateUser}
            />
            <EditAvatarPopup
                isOpened={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onAvatarUpdate={handleUpdateAvatar}
            />
            <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups}/>
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
