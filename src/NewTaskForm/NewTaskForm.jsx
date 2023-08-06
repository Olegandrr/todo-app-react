
export const NewTaskForm = ({className, placeholder, 
                              type, onKeyDown, autoFocus})=> {
  return (
      <input 
        className={ className } 
        placeholder={ placeholder } 
        type={ type }
        onKeyDown={onKeyDown}
        autoFocus={ autoFocus } 
      />
  )
}

