import PropTypes from 'prop-types'

import Task from '../Task'

function TaskList({ list, deleteTask, editTask, completedTask, completedFlag, activeFlag }) {
  return (
    <ul className="todo-list">
      {list.map((item) => (
        <Task
          item={item[0]}
          dataCreated={item[1]}
          key={item[2]}
          id={item[2]}
          deleteTask={() => deleteTask(item[2])}
          editTask={(e) => editTask(e, item[2])}
          completedTask={() => completedTask(item[2])}
          taskComplete={item[3]}
          completedFlag={completedFlag}
          activeFlag={activeFlag}
        />
      ))}
    </ul>
  )
}

TaskList.defaultProps = {
  list: [],
}

TaskList.propTypes = {
  list: PropTypes.instanceOf(Array),
}

export default TaskList
