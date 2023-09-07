/* eslint-disable jsx-a11y/no-autofocus */
import PropTypes from 'prop-types'
import { useState, useRef, useEffect } from 'react'

function NewTaskForm({ handleInputKeyDown }) {
  const [inputValue, setInputValue] = useState({ newTask: '', minutes: '', seconds: '' })
  const { newTask, minutes, seconds } = inputValue
  const newTaskRef = useRef()

  useEffect(() => {
    newTaskRef.current.focus()
  }, [newTask])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInputValue({ ...inputValue, [name]: Math.abs(value) || value })
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && String(newTask).trim().length !== 0) {
      e.preventDefault()
      const validMinutes = parseInt(minutes, 10) || 0
      const validSeconds = parseInt(seconds, 10) || 0
      const userTimerSeconds = validMinutes * 60 + validSeconds
      handleInputKeyDown(newTask, userTimerSeconds)
      setInputValue({ newTask: '', minutes: '', seconds: '' })
    }
  }
  return (
    <form className="new-todo-form">
      <input
        value={newTask}
        className="new-todo"
        placeholder="Task"
        type="text"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        name="newTask"
        ref={newTaskRef}
      />
      <input
        value={minutes}
        className="new-todo-form__timer"
        placeholder="Min"
        name="minutes"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        type="number"
      />
      <input
        value={seconds}
        className="new-todo-form__timer"
        placeholder="Sec"
        name="seconds"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        type="number"
        title="Введите значение от 0 до 59"
      />
    </form>
  )
}

NewTaskForm.propTypes = {
  handleInputKeyDown: PropTypes.func.isRequired,
}

export default NewTaskForm
