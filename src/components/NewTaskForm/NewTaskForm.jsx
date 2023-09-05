/* eslint-disable jsx-a11y/no-autofocus */
import PropTypes from 'prop-types'
import { Component } from 'react'

class NewTaskForm extends Component {
  state = {
    inputValue: { newTask: '', minutes: '', seconds: '' },
  }

  handleInputChange = (e) => {
    const { name, value } = e.target
    const { inputValue } = this.state
    this.setState({ inputValue: { ...inputValue, [name]: Math.abs(value) || value } })
  }

  handleKeyDown = (e) => {
    const {
      inputValue: { newTask, minutes, seconds },
    } = this.state
    const { handleInputKeyDown } = this.props
    if (e.key === 'Enter' && String(newTask).trim().length !== 0) {
      e.preventDefault()
      const validMinutes = parseInt(minutes, 10) || 0
      const validSeconds = parseInt(seconds, 10) || 0
      const userTimerSeconds = validMinutes * 60 + validSeconds
      handleInputKeyDown(newTask, userTimerSeconds)
      this.setState({ inputValue: { newTask: '', minutes: '', seconds: '' } })
    }
  }

  render() {
    const {
      inputValue: { newTask, minutes, seconds },
    } = this.state
    return (
      <form className="new-todo-form">
        <input
          value={newTask}
          className="new-todo"
          placeholder="Task"
          type="text"
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          name="newTask"
          autoFocus
        />
        <input
          value={minutes}
          className="new-todo-form__timer"
          placeholder="Min"
          name="minutes"
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          type="number"
        />
        <input
          value={seconds}
          className="new-todo-form__timer"
          placeholder="Sec"
          name="seconds"
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          type="number"
          max="59"
          title="Введите значение от 0 до 59"
        />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  handleInputKeyDown: PropTypes.func.isRequired,
}

export default NewTaskForm
