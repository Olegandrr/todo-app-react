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
  }

  componentDidMount() {
    console.log(' Маунт компонента!')
  }

  componentDidUpdate() {
    console.log(' апдейт компонента!')
  }

  timeCreation = () => {
    const time = formatDistanceToNow(this.props.dataCreated, {
      includeSeconds: true,
      addSuffix: true,
    })
    return time
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
    }
    return className
  }

  render() {
    const { item, id, deleteTask, editTask, completedTask, taskComplete } = this.props
    const { inputValueEdit } = this.state
    return (
      <li className={this.liClassName()}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={completedTask} defaultChecked={!!taskComplete} id={id} />
          <label htmlFor={id}>
            <span className="title">{item}</span>
            <span className="description">
              <button className="icon icon-play" aria-label="Play" type="button" />
              <button className="icon icon-pause" aria-label="Pause" type="button" /> 12:25
            </span>
            <span className="description">`created {this.timeCreation()}`</span>
          </label>
          <button className="icon icon-edit" onClick={this.toggleEditTask} aria-label="Edit" type="button" />
          <button className="icon icon-destroy" onClick={deleteTask} aria-label="Destroy" type="button" />
        </div>
        <input
          type="text"
          className="edit"
          onKeyDown={editTask}
          onChange={(e) => this.setState({ inputValueEdit: e.target.value })}
          value={inputValueEdit}
          autoFocus
        />
      </li>
    )
  }
}

export default Task
