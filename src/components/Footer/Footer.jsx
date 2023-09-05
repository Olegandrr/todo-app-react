import PropTypes from 'prop-types'
import { Component } from 'react'

import TasksFilter from '../TasksFilter'

class Footer extends Component {
  itemsLeft = () => {
    const { list } = this.props
    return list.length !== 0 ? list.filter((item) => !item[4]).length : 0
  }

  handleClickCompleted = () => {
    const { list, clearCompleted } = this.props
    const clearList = list.filter((item) => !item[4])
    clearCompleted(clearList)
  }

  render() {
    const { filterComplete, filterActive, filterAll } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{this.itemsLeft()} items left</span>
        <TasksFilter filterComplete={filterComplete} filterActive={filterActive} filterAll={filterAll} />
        <button className="clear-completed" onClick={this.handleClickCompleted} type="button">
          Clear completed
        </button>
      </footer>
    )
  }
}

Footer.defaultProps = {
  list: [],
}

Footer.propTypes = {
  list: PropTypes.instanceOf(Array),
}

export default Footer
