import PropTypes from 'prop-types'

function NewTaskForm({ className, placeholder, type, value, onChange, onKeyDown }) {
  return (
    <input
      className={className}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  )
}

NewTaskForm.defaultProps = {
  className: 'main',
}

NewTaskForm.propTypes = {
  className: PropTypes.string,
  onKeyDown: PropTypes.func.isRequired,
}

export default NewTaskForm
