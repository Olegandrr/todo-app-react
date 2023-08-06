export const TasksFilter = ({className, filterComplete, 
                              filterActive, filterAll, 
                              completedFlag, activeFlag})=>{
  return(
    <ul className={ className[0] }>
      <li>
        <button  
          className={ activeFlag || completedFlag? "" : className[1] } 
          onClick={ filterAll }
        >All</button>
      </li>
      <li>
        <button 
          className={ activeFlag? className[1] : ""   } 
          onClick={ filterActive }
        >Active</button>
      </li>
      <li>
        <button
          className={ completedFlag? className[1] : ""  }
          onClick={ filterComplete }
        >Completed</button>
      </li>
    </ul>
  )
}