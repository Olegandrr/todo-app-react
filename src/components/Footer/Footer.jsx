import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter'

function Footer({ list, filterComplete, filterActive, filterAll, clearCompleted }) {
  const itemsLeft = () => (list.length !== 0 ? list.filter((item) => !item[4]).length : 0)

  const handleClickCompleted = () => {
    const clearList = list.filter((item) => !item[4])
    clearCompleted(clearList)
  }

  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft()} items left</span>
      <TasksFilter filterComplete={filterComplete} filterActive={filterActive} filterAll={filterAll} />
      <button className="clear-completed" onClick={handleClickCompleted} type="button">
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
