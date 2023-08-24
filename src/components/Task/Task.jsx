/* eslint-disable react/state-in-constructor */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/prefer-stateless-function */
import { formatDistanceToNow } from 'date-fns'
import { Component } from 'react'

class Task extends Component {
  state = {
    inputValueEdit: this.props.item,
    editingToggle: false,
    currentTime: formatDistanceToNow(this.props.dataCreated, {
      includeSeconds: true,
      addSuffix: true,
    }),
    timer: 0,
    timerStart: false,
  }

  componentDidMount() {
    console.log(' Маунт компонента!')
    this.timeItem = setInterval(() => this.timeCreation(), 10000)

    this.timerItem = setInterval(() => this.isTimer(), 1000)
  }

  componentDidUpdate() {
    console.log(' апдейт компонента!')
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
      this.setState((prevState) => ({
        timer: prevState.timer + 1,
      }))
    }
  }

  handleOnClick = (e) => {
    if (e.target.ariaLabel === 'Play') {
      this.setState({
        timerStart: true,
      })
    } else if (e.target.ariaLabel === 'Pause') {
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
    const { inputValueEdit, currentTime, timer, timerStart } = this.state
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
              {`${Math.floor(timer / 60) < 10 ? '0' : ''}${Math.floor(timer / 60)} : ${timer % 60 < 10 ? '0' : ''}${
                timer % 60
              }`}
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
          autoFocus
        />
      </li>
    )
  }
}

export default Task
