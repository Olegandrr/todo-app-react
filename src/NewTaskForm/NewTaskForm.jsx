


export const NewTaskForm = (props)=> {

  return (
   
      <input className={ props.className } 
      placeholder={ props.placeholder } 
      type={ props.type }
      value={props.value}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
      autoFocus={ props.autoFocus } />

  )
}

