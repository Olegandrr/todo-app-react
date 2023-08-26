import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter'

function Footer({ list, filterComplete, filterActive, filterAll, clearCompleted, completedFlag, activeFlag }) {
  const itemsLeft = () => (list.length !== 0 ? list.filter((item) => !item[4]).length : 0)

  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft()} items left</span>
      <TasksFilter
        filterComplete={filterComplete}
        filterActive={filterActive}
        filterAll={filterAll}
        completedFlag={completedFlag}
        activeFlag={activeFlag}
      />
      <button className="clear-completed" onClick={clearCompleted} type="button">
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  list: [],
}

Footer.propTypes = {
  list: PropTypes.instanceOf(Array),
}

export default Footer
