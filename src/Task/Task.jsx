import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'

function Task({ item, dataCreated, deleteTask, editTask, completedTask, taskComplete }) {
  const timeCreation = formatDistanceToNow(dataCreated, {
    includeSeconds: true,
    addSuffix: true,
  })
  const [inputValueEdit, setInputValueEdit] = useState(item)
  const [editingToggle, setEditingToggle] = useState(false)

  const toggleEditTask = () => {
    if (!taskComplete) setEditingToggle(true)
  }

  function liClassName() {
    let className = ''
    if (taskComplete) {
      className = 'completed'
    } else if (editingToggle) {
      className = 'editing'
    }
    return className
  }

  return (
    <li className={liClassName()}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={completedTask} defaultChecked={!!taskComplete} id="Label" />
        <label htmlFor="Label">
          <span className="description">{item}</span>
          <span className="created">created {timeCreation}</span>
        </label>
        <button className="icon icon-edit" onClick={toggleEditTask} aria-label="Edit" type="button" />
        <button className="icon icon-destroy" onClick={deleteTask} aria-label="Destroy" type="button" />
      </div>
      <input
        type="text"
        className="edit"
        display={editingToggle ? 'block' : 'none'}
        onKeyDown={editTask}
        onChange={(e) => setInputValueEdit(e.target.value)}
        value={inputValueEdit}
      />
    </li>
  )
}

export default Task
