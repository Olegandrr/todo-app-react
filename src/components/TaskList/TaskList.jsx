import PropTypes from 'prop-types'

import Task from '../Task'

function TaskList({ list, deleteTask, completedTask, completedFlag, activeFlag }) {
  return (
    <ul className="todo-list">
      {list.map((item) => (
        <Task
          item={item[0]}
          dataCreated={item[1]}
          key={item[2]}
          id={item[2]}
          deleteTask={() => deleteTask(item[2])}
          completedTask={() => completedTask(item[2])}
          taskComplete={item[3]}
          completedFlag={completedFlag}
          activeFlag={activeFlag}
          minutes={item[4]}
          seconds={item[5]}
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