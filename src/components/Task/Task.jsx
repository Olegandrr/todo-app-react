/* eslint-disable react/state-in-constructor */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/prefer-stateless-function */
import { formatDistanceToNow } from 'date-fns'
import { Component, createRef } from 'react'

class Task extends Component {
  state = {
    inputValueEdit: this.props.item,
    editingToggle: false,
    currentTime: formatDistanceToNow(this.props.dataCreated, {
      includeSeconds: true,
      addSuffix: true,
    }),
    timer: parseInt(this.props.minutes, 10) * 60 + parseInt(this.props.seconds, 10),
    timerStart: false,
    userTimer: parseInt(this.props.minutes, 10) * 60 + parseInt(this.props.seconds, 10),
  }

  componentDidMount() {
    this.timeItem = setInterval(() => this.timeCreation(), 10000)

    this.timerItem = setInterval(() => this.isTimer(), 1000)

    this.inputRef = createRef()
  }

  componentDidUpdate() {
    this.inputRef.current.focus()
  }

  componentWillUnmount() {
    console.log('Анмаунт компонента!')
    clearInterval(this.timeItem)
    clearInterval(this.timerItem)
  }

  handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.trim().length !== 0) {
      this.setState({ editingToggle: false })
      this.setState({ inputValueEdit: e.target.value })
    }
  }

  timeCreation = () => {
    const time = formatDistanceToNow(this.props.dataCreated, {
      includeSeconds: true,
      addSuffix: true,
    })
    this.setState({ currentTime: time })
  }

  isTimer = () => {
    if (this.state.timerStart) {
      if (this.state.userTimer < 1) {
        this.setState((prevState) => ({
          timer: prevState.timer + 1,
        }))
      } else {
        console.log('prevState: ', this.state)
        this.setState((prevState) =>
          prevState.timer !== 0 ? { timer: prevState.timer - 1 } : { timerStart: false, timer: 0, userTimer: 0 }
        )
      }
    }
  }

  formatTimer = () => {
    const { timer } = this.state
    return `${Math.floor(timer / 60) < 10 ? '0' : ''}${Math.floor(timer / 60)} : ${timer % 60 < 10 ? '0' : ''}${
      timer % 60
    }`
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

  liClassName = () => {
    let className = ''
    if (this.props.taskComplete) {
      className = 'completed'
    } else if (this.state.editingToggle) {
      className = 'editing'
    } else if (this.props.completedFlag) {
      className = 'hidden'
    }
    if (className === 'completed' && this.props.activeFlag) {
      className += ' hidden'
    }
    return className
  }

  render() {
    const { id, deleteTask, completedTask, taskComplete } = this.props
    const { inputValueEdit, currentTime, timerStart } = this.state
    return (
      <li className={this.liClassName()}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={completedTask} defaultChecked={!!taskComplete} id={id} />
          <label htmlFor={id}>
            <span className="title">{inputValueEdit}</span>
            <span className="description">
              <button
                className={timerStart ? 'icon icon-pause' : 'icon icon-play'}
                aria-label={timerStart ? 'Pause' : 'Play'}
                type="button"
                onClick={this.handleOnClick}
              />{' '}
              {this.formatTimer()}
            </span>
            <span className="description">created {currentTime}</span>
          </label>
          <button className="icon icon-edit" onClick={this.toggleEditTask} aria-label="Edit" type="button" />
          <button className="icon icon-destroy" onClick={deleteTask} aria-label="Destroy" type="button" />
        </div>
        <input
          type="text"
          className="edit"
          onKeyDown={this.handleInputKeyDown}
          onChange={(e) => this.setState({ inputValueEdit: e.target.value })}
          value={inputValueEdit}
          ref={this.inputRef}
          autoFocus
        />
      </li>
    )
  }
}

export default Task
