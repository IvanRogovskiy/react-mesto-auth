import tooltipSuccessPath from '../images/tooltip-success.png'

const InfoToolTip = () => {
  return (
      <div className='popup popup_type_edit popup_opened' >
        <div className="popup__container">
            <img className='tooltip_type_success' src={tooltipSuccessPath} alt=""/>
        </div>
      </div>
  )
}

export default InfoToolTip