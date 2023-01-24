// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleName: '',
    dateFormat: '',
    appointmentList: [],
    isActive: false,
  }

  getTitleName = event => {
    this.setState({titleName: event.target.value})
  }

  getDateFormat = event => {
    this.setState({dateFormat: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {titleName, dateFormat} = this.state
    const formattedDate = dateFormat
      ? format(new Date(dateFormat), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleName,
      date: formattedDate,
      isTrue: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleName: '',
      dateFormat: '',
    }))
  }

  onAdd = () => {
    this.setState(prevState => ({isActive: !prevState.isActive}))
  }

  getToggleButton = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (id === each.id) {
          return {...each, isTrue: !each.isTrue}
        }
        return each
      }),
    }))
  }

  getFilterAppointmentList = () => {
    const {appointmentList, isActive} = this.state

    if (isActive) {
      return appointmentList.filter(each => each.isTrue === true)
    }
    return appointmentList
  }

  render() {
    const {titleName, dateFormat, isActive} = this.state
    const style = isActive ? 'Starred-button active' : 'Starred-button'
    const filterAppointmentList = this.getFilterAppointmentList()

    return (
      <div className="app-container">
        <div className="bg-container">
          <div className="top-container">
            <form className="form" onSubmit={this.addAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <div className="input-container">
                <label className="label" htmlFor="input">
                  TITLE
                </label>
                <input
                  id="input"
                  type="text"
                  className="input-name"
                  placeholder="Title"
                  onChange={this.getTitleName}
                  value={titleName}
                />
              </div>
              <div className="input-container">
                <label className="label" htmlFor="date">
                  DATE
                </label>
                <input
                  className="input-name"
                  type="date"
                  id="date"
                  onChange={this.getDateFormat}
                  value={dateFormat}
                />
                <div>
                  <button className="button" type="submit">
                    Add
                  </button>
                </div>
              </div>
            </form>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>
          </div>
          <hr className="line" />
          <div>
            <div className="add-appointment-container">
              <h1 className="add-heading">Appointments</h1>
              <button className={style} type="button" onClick={this.onAdd}>
                Starred
              </button>
            </div>
            <ul className="appointment-list">
              {filterAppointmentList.map(each => (
                <AppointmentItem
                  appointmentDetails={each}
                  key={each.id}
                  getToggleButton={this.getToggleButton}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
