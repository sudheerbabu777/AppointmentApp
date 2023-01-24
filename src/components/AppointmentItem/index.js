// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, getToggleButton} = props
  const {id, title, date, isTrue} = appointmentDetails

  const getSelectStar = () => {
    getToggleButton(id)
  }

  const imageUrl = isTrue
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="add-list">
      <div>
        <p className="title">{title}</p>
        <p className="date">{date}</p>
      </div>
      <div>
        <button
          className="star-button"
          type="button"
          onClick={getSelectStar}
          data-testid="star"
        >
          <img src={imageUrl} alt="star" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
