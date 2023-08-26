function TasksFilter({ filterComplete, filterActive, filterAll, completedFlag, activeFlag }) {
  return (
    <ul className="filters">
      <li>
        <button className={activeFlag || completedFlag ? '' : 'selected'} onClick={filterAll} type="button">
          All
        </button>
      </li>
      <li>
        <button className={activeFlag ? 'selected' : ''} onClick={filterActive} type="button">
          Active
        </button>
      </li>
      <li>
        <button className={completedFlag ? 'selected' : ''} onClick={filterComplete} type="button">
          Completed
        </button>
      </li>
    </ul>
  )
}
export default TasksFilter
