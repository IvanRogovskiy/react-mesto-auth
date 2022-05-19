const ImagePopup = ({selectedCard, onClose}) => {
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