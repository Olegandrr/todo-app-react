/* eslint-disable jsx-a11y/no-autofocus */
import PropTypes from 'prop-types'

function NewTaskForm({ value, onChange, onKeyDown }) {
  return (
    <form className="new-todo-form">
      <input
        value={value.newTask}
        className="new-todo"
        placeholder="Task"
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        name="newTask"
        autoFocus
      />
      <input
        value={value.minutes}
        className="new-todo-form__timer"
        placeholder="Min"
        name="minutes"
        onChange={onChange}
        onKeyDown={onKeyDown}
        type="number"
      />
      <input
        value={value.seconds}
        className="new-todo-form__timer"
        placeholder="Sec"
        name="seconds"
        onChange={onChange}
        onKeyDown={onKeyDown}
        type="number"
        max="59"
        title="Введите значение от 0 до 59"
      />
    </form>
  )
}

NewTaskForm.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
}

export default NewTaskForm
