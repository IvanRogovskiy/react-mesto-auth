import tooltipErrorPath from '../images/tooltip-error.png'
import tooltipSuccessPath from '../images/tooltip-success.png'

const InfoToolTip = ({successfully, message, onClose}) => {

  const imagePath = successfully ? tooltipSuccessPath : tooltipErrorPath;

  return (
      <div className='popup popup_type_edit popup_opened' >
        <div className="popup__container">
            <button type="button" onClick={onClose} className="popup__close"/>
            <div className="tooltip">
                <img className='tooltip_type_success' src={imagePath} alt=""/>
                <p className='tooltip__message'>
                    {message}
                </p>
            </div>
        </div>
      </div>
  )
}

export default InfoToolTip