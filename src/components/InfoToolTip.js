import tooltipErrorPath from '../images/tooltip-error.png'
import tooltipSuccessPath from '../images/tooltip-success.png'

const InfoToolTip = ({message, image, onClose}) => {
  return (
      <div className='popup popup_type_edit popup_opened' >
        <div className="popup__container">
            <button type="button" onClick={onClose} className="popup__close"/>
            <div className="tooltip">
                <img className='tooltip_type_success' src={tooltipErrorPath} alt=""/>
                <p className='tooltip__message'>
                    Что-то пошло не так!
                    Попробуйте ещё раз.
                </p>
            </div>
        </div>
      </div>
  )
}

export default InfoToolTip