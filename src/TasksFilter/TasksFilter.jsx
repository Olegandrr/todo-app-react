export const TasksFilter = ({className})=>{
  //console.log(props)
  return(
    <ul className={ className[0] }>
      <li>
        <button className={ className[1] }>All</button>
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