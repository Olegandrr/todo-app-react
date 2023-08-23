import { formatDistanceToNow } from 'date-fns'
import { useState, useRef, useEffect } from 'react'

function Task({ item, dataCreated, id, deleteTask, editTask, completedTask, taskComplete }) {
  const timeCreation = formatDistanceToNow(dataCreated, {
    includeSeconds: true,
    addSuffix: true,
  })
  const [inputValueEdit, setInputValueEdit] = useState(item)
  const [editingToggle, setEditingToggle] = useState(false)

  const toggleEditTask = () => {
    if (!taskComplete) setEditingToggle(true)
  }

  const inputEditing = useRef()
  useEffect(() => {
    inputEditing.current.focus()
  }, [editingToggle])

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
        <input className="toggle" type="checkbox" onClick={completedTask} defaultChecked={!!taskComplete} id={id} />
        <label htmlFor={id}>
          <span className="title">{item}</span>
          <span className="description">
            <button className="icon icon-play" aria-label="Play" type="button" />
            <button className="icon icon-pause" aria-label="Pause" type="button" />
            12:25
          </span>
          <span className="description">created {timeCreation}</span>
        </label>
        <button className="icon icon-edit" onClick={toggleEditTask} aria-label="Edit" type="button" />
        <button className="icon icon-destroy" onClick={deleteTask} aria-label="Destroy" type="button" />
      </div>
      <input
        type="text"
        className="edit"
        onKeyDown={editTask}
        onChange={(e) => setInputValueEdit(e.target.value)}
        value={inputValueEdit}
        ref={inputEditing}
      />
    </li>
  )
}

export default Task
