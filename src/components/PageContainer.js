import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import AddPlacePopup from "./AddPlacePopup"
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import ImagePopup from "./ImagePopup"
import {withRouter} from "react-router-dom";

const PageContainer = (props) => {
    return (
        <div className={'page-container'} onKeyPress={props.handleEscPress}>
        <Header
            logOut={props.handleLogout}
        />
        <Main
            onEditProfile={props.handleEditProfileClick}
            onEditAvatar={props.handleEditAvatarClick}
            onAddPlace={props.handleAddPlaceClick}
            onCardClick={props.handleCardClick}
            cards = {props.cards}
            onCardLike={props.handleCardLike}
            onCardDelete={props.handleCardDelete}
        />
        <Footer/>
        <AddPlacePopup
            isOpened={props.isAddPlacePopupOpen}
            onClose={props.closeAllPopups}
            onAddPlace={props.handlePlaceAdd}
        />
        <EditProfilePopup
            isOpened={props.isEditProfilePopupOpen}
            onClose={props.closeAllPopups}
            onUserUpdate={props.handleUpdateUser}
        />
        <EditAvatarPopup
            isOpened={props.isEditAvatarPopupOpen}
            onClose={props.closeAllPopups}
            onAvatarUpdate={props.handleUpdateAvatar}
        />
        <ImagePopup selectedCard={props.selectedCard} onClose={props.closeAllPopups}/>
        </div>
    )
}

export default withRouter(PageContainer)