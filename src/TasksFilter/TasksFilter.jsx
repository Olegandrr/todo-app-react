export const TasksFilter = (props)=>{
  //console.log(props)
  return(
    <ul className={ props.className[0] }>
      <li>
        <button className={ props.className[1] }>All</button>
      </li>
      <li>
        <button>Active</button>
      </li>
      <li>
        <button>Completed</button>
      </li>
    </ul>
  )
}