/* eslint-disable react/destructuring-assignment */
import { formatDistanceToNow } from 'date-fns'
import { useState, useRef, useEffect } from 'react'

function Task({
  item,
  userTimerSeconds,
  dataCreated,
  taskComplete,
  handleDeleteTask,
  id,
  list,
  handleCompletedTasks,
  completedFlag,
  activeFlag,
}) {
  const [inputValueEdit, setInputValueEdit] = useState(item)
  const [changeInputValueEdit, setChangeInputValueEdit] = useState(item)
  const [editingToggle, setEditingToggle] = useState(false)
  const [timer, setTimer] = useState(userTimerSeconds)
  const [timerStart, setTimerStart] = useState(false)
  const inputRef = useRef()

  const isTimer = () => {
    if (userTimerSeconds === 0) {
      setTimer((prevTimer) => prevTimer + 1)
    } else {
      setTimer((prevTimer) => prevTimer - 1)
    }
  }

  useEffect(() => {
    let timerItem
    if (timerStart) {
      timerItem = setInterval(() => isTimer(), 1000)
    }
    return () => clearInterval(timerItem)
  }, [timerStart])

  useEffect(() => {
    inputRef.current.focus()
  }, [editingToggle])

  const formatTimer = () => {
    if (timer >= 0) {
      return `${Math.floor(timer / 60) < 10 ? '0' : ''}${Math.floor(timer / 60)} : ${timer % 60 < 10 ? '0' : ''}${
        timer % 60
      }`
    }
    return `${Math.floor(Math.abs(timer / 60)) < 10 ? '-0' : '-'}${Math.floor(Math.abs(timer / 60))} : ${
      Math.abs(timer % 60) < 10 ? '0' : ''
    }${Math.abs(timer % 60)}`
  }

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && changeInputValueEdit.trim().length !== 0) {
      setEditingToggle(false)
      setInputValueEdit(changeInputValueEdit)
    }
    if (e.key === 'Escape') {
      setEditingToggle(false)
      setChangeInputValueEdit(inputValueEdit)
    }
  }

  const handleChange = (e) => {
    setChangeInputValueEdit(e.target.value)
  }

  const handleBlur = () => {
    setEditingToggle(false)
    setChangeInputValueEdit(inputValueEdit)
  }

  const timeCreation = () => {
    const time = formatDistanceToNow(dataCreated, {
      includeSeconds: true,
      addSuffix: true,
    })
    return time
  }

  const buttonsClickAction = {
    Play: () => setTimerStart(true),
    Pause: () => setTimerStart(false),
    Edit: () => !taskComplete && setEditingToggle(true),
    Destroy: () => {
      const index = list.findIndex((el) => el[2] === id)
      const tasksItemDelete = list.filter((_, ind) => ind !== index)
      handleDeleteTask(tasksItemDelete)
    },
    Completed: () => {
      const index = list.findIndex((el) => el[2] === id)
      const newList = list.map((it, ind) => (ind !== index ? it : [...it.slice(0, 4), !it[4]]))
      handleCompletedTasks(newList)
    },
  }

  const handleOnClick = (e) => {
    const { ariaLabel } = e.target
    buttonsClickAction[ariaLabel]()
  }

  const liClassName = () => {
    if (taskComplete) {
      return activeFlag ? 'completed hidden' : 'completed'
    }
    if (editingToggle) {
      return 'editing'
    }
    if (completedFlag) {
      return 'hidden'
    }
    return ''
  }

  return (
    <li className={liClassName()}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onClick={handleOnClick}
          defaultChecked={!!taskComplete}
          aria-label="Completed"
          id={id}
        />
        <label htmlFor={id}>
          <span className="title">{inputValueEdit}</span>
          <span className={timer >= 0 ? 'description' : 'timer-expired'}>
            <button
              className={timerStart ? 'icon icon-pause' : 'icon icon-play'}
              aria-label={timerStart ? 'Pause' : 'Play'}
              type="button"
              onClick={handleOnClick}
            />
            {formatTimer()}
          </span>
          <span className="description"> created {timeCreation()}</span>
        </label>
        <button className="icon icon-edit" onClick={handleOnClick} aria-label="Edit" type="button" />
        <button className="icon icon-destroy" onClick={handleOnClick} aria-label="Destroy" type="button" />
      </div>
      <input
        type="text"
        className="edit"
        onKeyDown={handleInputKeyDown}
        onChange={handleChange}
        onBlur={handleBlur}
        value={changeInputValueEdit}
        ref={inputRef}
      />
    </li>
  )
}

export default Task
