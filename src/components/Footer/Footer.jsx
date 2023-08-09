import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter'

function Footer({
  className,
  list,
  filterComplete,
  filterActive,
  filterAll,
  clearCompleted,
  completedFlag,
  activeFlag,
}) {
  const itemsLeft = () => (list.length !== 0 ? list.filter((item) => !item[3]).length : 0)

  return (
    <footer className={className.footer}>
      <span className={className.span}>{itemsLeft()} items left</span>
      <TasksFilter
        className={[className.ul, className.buttonAll]}
        filterComplete={filterComplete}
        filterActive={filterActive}
        filterAll={filterAll}
        completedFlag={completedFlag}
        activeFlag={activeFlag}
      />
      <button className={className.buttonClear} onClick={clearCompleted} type="button">
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  list: [],
  className: {
    footer: 'footer',
    span: 'todo-count',
    ul: 'filters',
    buttonAll: 'selected',
    buttonClear: 'clear-completed',
  },
}

Footer.propTypes = {
  list: PropTypes.instanceOf(Array),
  className: PropTypes.shape({
    footer: PropTypes.string,
    span: PropTypes.string,
    ul: PropTypes.string,
    buttonAll: PropTypes.string,
    buttonClear: PropTypes.string,
  }),
}

export default Footer
