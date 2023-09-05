/* eslint-disable react/destructuring-assignment */
import { formatDistanceToNow } from 'date-fns'
import { Component, createRef } from 'react'

class Task extends Component {
  state = {
    inputValueEdit: this.props.item,
    editingToggle: false,
    timer: this.props.userTimerSeconds,
    timerStart: false,
  }

  componentDidMount() {
    this.timerItem = setInterval(() => this.isTimer(), 1000)
    this.inputRef = createRef()
  }

  componentDidUpdate() {
    this.inputRef.current.focus()
  }

  componentWillUnmount() {
    clearInterval(this.timerItem)
  }

  handleInputKeyDown = (e) => {
    const { value } = e.target
    if (e.key === 'Enter' && value.trim().length !== 0) {
      this.setState({ editingToggle: false, inputValueEdit: value })
    }
  }

  timeCreation = () => {
    const { dataCreated } = this.props
    const time = formatDistanceToNow(dataCreated, {
      includeSeconds: true,
      addSuffix: true,
    })
    return time
  }

  isTimer = () => {
    const { timerStart } = this.state
    const { userTimerSeconds } = this.props
    if (timerStart) {
      if (userTimerSeconds === 0) {
        this.setState((prevState) => ({
          timer: prevState.timer + 1,
        }))
      } else {
        this.setState((prevState) => ({ timer: prevState.timer - 1 }))
      }
    }
  }

  formatTimer = () => {
    const { timer } = this.state
    if (timer >= 0) {
      return `${Math.floor(timer / 60) < 10 ? '0' : ''}${Math.floor(timer / 60)} : ${timer % 60 < 10 ? '0' : ''}${
        timer % 60
      }`
    }
    return `${Math.floor(Math.abs(timer / 60)) < 10 ? '-0' : '-'}${Math.floor(Math.abs(timer / 60))} : ${
      Math.abs(timer % 60) < 10 ? '0' : ''
    }${Math.abs(timer % 60)}`
  }

  handleOnClick = (e) => {
    const { ariaLabel } = e.target
    if (ariaLabel === 'Play') {
      this.setState({
        timerStart: true,
      })
    } else if (ariaLabel === 'Pause') {
      this.setState({
        timerStart: false,
      })
    }
  }

  toggleEditTask = () => {
    if (!this.props.taskComplete) this.setState({ editingToggle: true })
  }

  deleteTask = () => {
    const { handleDeleteTask, id, list } = this.props
    const index = list.findIndex((el) => el[2] === id)
    const tasksItemDelete = list.filter((_, ind) => ind !== index)
    handleDeleteTask(tasksItemDelete)
  }

  completedTask = () => {
    const { handleCompletedTasks, id, list } = this.props
    const index = list.findIndex((el) => el[2] === id)
    const newList = list.map((item, ind) => (ind !== index ? item : [...item.slice(0, 4), !item[4]]))
    handleCompletedTasks(newList)
  }

  liClassName = () => {
    const { taskComplete, completedFlag, activeFlag } = this.props
    const { editingToggle } = this.state
    let className = ''
    if (taskComplete) {
      className = 'completed'
    } else if (editingToggle) {
      className = 'editing'
    } else if (completedFlag) {
      className = 'hidden'
    }
    if (className === 'completed' && activeFlag) {
      className += ' hidden'
    }
    return className
  }

  render() {
    const { id, taskComplete } = this.props
    const { inputValueEdit, timerStart, timer } = this.state
    return (
      <li className={this.liClassName()}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={this.completedTask}
            defaultChecked={!!taskComplete}
            id={id}
          />
          <label htmlFor={id}>
            <span className="title">{inputValueEdit}</span>
            <span className={timer >= 0 ? 'description' : 'timer-expired'}>
              <button
                className={timerStart ? 'icon icon-pause' : 'icon icon-play'}
                aria-label={timerStart ? 'Pause' : 'Play'}
                type="button"
                onClick={this.handleOnClick}
              />
              {this.formatTimer()}
            </span>
            <span className="description">created {this.timeCreation()}</span>
          </label>
          <button className="icon icon-edit" onClick={this.toggleEditTask} aria-label="Edit" type="button" />
          <button className="icon icon-destroy" onClick={this.deleteTask} aria-label="Destroy" type="button" />
        </div>
        <input
          type="text"
          className="edit"
          onKeyDown={this.handleInputKeyDown}
          onChange={(e) => this.setState({ inputValueEdit: e.target.value })}
          value={inputValueEdit}
          ref={this.inputRef}
        />
      </li>
    )
  }
}

export default Task
