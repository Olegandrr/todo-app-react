import PropTypes from 'prop-types';

export const NewTaskForm = ({className, placeholder, type, value, onChange, onKeyDown, autoFocus})=> {
  return (
      <input 
        className={ className } 
        placeholder={ placeholder } 
        type={ type }
        value={value}
        onChange={ onChange }
        onKeyDown={onKeyDown}
        autoFocus={ autoFocus } 
      />
  )
}

NewTaskForm.defaultProps = {
  className: "main",
};

NewTaskForm.propTypes = {
  className: PropTypes.string,
  onKeyDown: PropTypes.func.isRequired
};

