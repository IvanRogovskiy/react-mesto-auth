import PopupWithForm from "./PopupWithForm";
import React, {useEffect, useState} from "react";

const AddPlacePopup = ({isOpened, onAddPlace, onClose}) => {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  }

  const clearTextFields = () => {
      setName('');
      setLink('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({name, link});
  }

  useEffect(clearTextFields, [isOpened])

  useEffect(() => {
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
          name='add'
          title='Новое место'
          onClose={onClose}
          isOpened={isOpened}
          onSubmit={handleSubmit}
      >
          <>
              <label className="popup__field">
                  <input className="popup__input popup__input_type_title" name="title" type="text"
                         placeholder="Название" id="title"
                         value={name} onChange={handleNameChange}
                         required minLength="2" maxLength="40"/>
                  <span className="popup__input-error title-input-error"/>
              </label>
              <label className="popup__field">
                  <input className="popup__input popup__input_type_src" name="src" type="url" id="src"
                         placeholder="Ссылка на картинку" value={link} onChange={handleLinkChange}
                         required/>
                  <span className="popup__input-error src-input-error"/>
              </label>
              <input type="submit" className="popup__save" value="Создать"/>
          </>
      </PopupWithForm>
  )
}

export default AddPlacePopup