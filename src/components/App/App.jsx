import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import TaskList from '../TaskList'
import './App.css'

class App extends Component {
  state = {
    list: [],
    completedFlag: false,
    activeFlag: false,
  }

  handleInputKeyDown = (newTask, userTimerSeconds) => {
    const { list } = this.state
    this.setState({ list: [...list, [newTask, new Date(), uuidv4(), userTimerSeconds, false]] })
  }

  handleDeleteTask = (tasksItemDelete) => {
    this.setState({ list: tasksItemDelete })
  }

  handleCompletedTasks = (newList) => {
    this.setState({ list: newList })
  }

  filterAll = () => {
    this.setState({
      activeFlag: false,
      completedFlag: false,
    })
  }

  filterActive = () => {
    this.setState({
      activeFlag: true,
      completedFlag: false,
    })
  }

  filterComplete = () => {
    this.setState({
      activeFlag: false,
      completedFlag: true,
    })
  }

  clearCompleted = (clearList) => {
    this.setState({ list: clearList })
  }

  render() {
    const { list, completedFlag, activeFlag } = this.state
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm
            handleInputKeyDown={(newTask, userTimerSeconds) => this.handleInputKeyDown(newTask, userTimerSeconds)}
          />
        </header>
        <section className="main">
          <TaskList
            list={list}
            handleDeleteTask={(tasksItemDelete) => this.handleDeleteTask(tasksItemDelete)}
            handleCompletedTasks={(newList) => this.handleCompletedTasks(newList)}
            completedFlag={completedFlag}
            activeFlag={activeFlag}
          />
          <Footer
            list={list}
            filterComplete={this.filterComplete}
            filterActive={this.filterActive}
            filterAll={this.filterAll}
            clearCompleted={(clearList) => this.clearCompleted(clearList)}
          />
        </section>
      </section>
    )
  }
}

export default App
