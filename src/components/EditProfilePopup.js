import PopupWithForm from "./PopupWithForm";
import React, {useState} from "react";
import {CurrentUserContext} from "../contexts/currentUserContext";

const EditProfilePopup = ({isOpened, onClose, onUserUpdate}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { currentUser } = React.useContext(CurrentUserContext);

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onUserUpdate({
        name,
        about: description
    })
  }

  React.useEffect(() => {
      setName(currentUser.name || '');
      setDescription(currentUser.about || '');
  }, [currentUser, isOpened])

  React.useEffect(() => {
    if (!isOpened) return;
    
    function handleESC(e) {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleESC);

    return () => document.removeEventListener("keydown", handleESC);
  }, [isOpened]);

  return (
      <PopupWithForm
          name='name'
          title='Редактировать профиль'
          onClose={onClose}
          isOpened={isOpened}
          onSubmit={handleSubmit}
      >
              <label className="popup__field">
                  <input className="popup__input popup__input_type_name" name="name"
                         type="text" placeholder="Имя" id="name" autoComplete="off" value={name}
                         minLength="2" maxLength="40" onChange={onNameChange} required/>
                  <span className="popup__input-error name-input-error"/>
              </label>
              <label className="popup__field">
                  <input className="popup__input popup__input_type_rank" name="rank" autoComplete="off"
                         type="text" id="rank" placeholder="Профессиональная деятельность" value={description}
                         minLength="2" maxLength="200" onChange={onDescriptionChange} required/>
                  <span className="popup__input-error rank-input-error"/>
              </label>
              <input type="submit" className="popup__save" value="Сохранить"/>
      </PopupWithForm>
  )
}

export default EditProfilePopup