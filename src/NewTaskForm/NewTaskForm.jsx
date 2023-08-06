
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

