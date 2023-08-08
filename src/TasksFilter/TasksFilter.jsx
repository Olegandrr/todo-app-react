function TasksFilter({ className, filterComplete, filterActive, filterAll, completedFlag, activeFlag }) {
  return (
    <ul className={className[0]}>
      <li>
        <button className={activeFlag || completedFlag ? '' : className[1]} onClick={filterAll} type="button">
          All
        </button>
      </li>
      <li>
        <button className={activeFlag ? className[1] : ''} onClick={filterActive} type="button">
          Active
        </button>
      </li>
      <li>
        <button className={completedFlag ? className[1] : ''} onClick={filterComplete} type="button">
          Completed
        </button>
      </li>
    </ul>
  )
}
export default TasksFilter
