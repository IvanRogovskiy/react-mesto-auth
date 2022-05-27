import { useEffect } from "react";
const ImagePopup = ({selectedCard, onClose}) => {

  useEffect(() => {
    if (!selectedCard.isOpened) return;
    
    function handleESC(e) {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleESC);

    return () => document.removeEventListener("keydown", handleESC);
  }, [selectedCard.isOpened]);
    
  return (
      <div className={`popup popup_type_full ${selectedCard.isOpened ? 'popup_opened' : ''}`}>
          <div className="popup__container-full">
              <img alt={selectedCard.name} src={selectedCard.link} className="popup__container-full-image"/>
              <h2 className="popup__container-full-name">{selectedCard.name}</h2>
                  <button type="button" className="popup__close" onClick={onClose}/>
          </div>
      </div>
  )
}

export default ImagePopup