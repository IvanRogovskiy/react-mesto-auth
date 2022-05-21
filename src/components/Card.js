import React from "react";
import cardDeletePath from "../images/place-delete.svg";
import {CurrentUserContext} from "../contexts/currentUserContext";

const Card = ({card, onImageClick, onCardLike, onCardDelete}) => {

  const handleCardClick = () => {
    onImageClick(card)
  }

    const { currentUser } = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `place__delete ${isOwn ? 'place__delete_visible' : ''}`
    );

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `place__fav ${isLiked ? 'place__fav_liked' : ''}`;

    const handleLikeClick = () => {
      onCardLike(card)
    }

    const handleDeleteClick = () => {
      onCardDelete(card);
    }

    return (
      <div className="place">
          <img alt={card.name} src={card.link} className="place__image" onClick={handleCardClick} />
          <div className="place__info">
              <h2 className="place__name">{card.name}</h2>
              <div className="place__fav-container">
                  <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}/>
                  <p className="place__fav-counter">{card.likes.length}</p>
              </div>
          </div>
          <img alt="Кнопка удаления карточки" onClick={handleDeleteClick} src={cardDeletePath}
               className={cardDeleteButtonClassName}/>
      </div>
  )
}

export default Card