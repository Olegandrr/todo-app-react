/* eslint-disable jsx-a11y/no-autofocus */
import PropTypes from 'prop-types'

function NewTaskForm({ value, onChange, onKeyDown }) {
  return (
    <form className="new-todo-form">
      <input
        value={value}
        className="new-todo"
        placeholder="Task"
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoFocus
      />
      <input className="new-todo-form__timer" placeholder="Min" autoFocus />
      <input className="new-todo-form__timer" placeholder="Sec" autoFocus />
    </form>
  )
}

NewTaskForm.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
}

export default NewTaskForm
