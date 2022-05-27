import PopupWithForm from "./PopupWithForm";
import React, {useState, useEffect} from "react";

const EditAvatarPopup = ({isOpened, onClose, onAvatarUpdate}) => {
 
  const [link, setLink] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isBtnActive, setBtnActive] = useState(false);

  const handleClose = () => {
    setIsValid(true);
    onClose();
  }

  const handleLinkChange = (e) => {
    setLink(e.target.value);
    if (e.target.validity.valid) {
        setIsValid(true);
        setBtnActive(true);
    } else {
        setIsValid(false);
        setBtnActive(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onAvatarUpdate(link)
  }

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
          name='edit'
          title='Редактировать аватар'
          onClose={handleClose}
          isOpened={isOpened}
          onSubmit={handleSubmit}
      >
          <>
              <label className="popup__field">
                  <input value={link} onChange={handleLinkChange}
                         className={`popup__input popup__input_type_title ${isValid ? '' : 'popup__input_type_error'}`}
                         type="url"
                         placeholder="Адрес картинки"
                         required/>
                  <span className={`popup__input-error link-input-error ${isValid ? '' :  'popup__input-error_active'}`}>Please enter a url</span>
                  <input type="submit" className={`popup__save popup__save_avatar-update ${isBtnActive ? '' : 'popup__save_inactive'}`} value={'Сохранить'}/>
              </label>
          </>
      </PopupWithForm>
  )
}

export default EditAvatarPopup