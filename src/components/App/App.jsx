import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import TaskList from '../TaskList'
import './App.css'

function App() {
  const [list, setList] = useState([])
  const [activeFlag, setActiveFlag] = useState(false)
  const [completedFlag, setCompletedFlag] = useState(false)

  const handleInputKeyDown = (newTask, userTimerSeconds) => {
    setList([...list, [newTask, new Date(), uuidv4(), userTimerSeconds, false]])
  }

  const handleDeleteTask = (tasksItemDelete) => {
    setList(tasksItemDelete)
  }

  const handleCompletedTasks = (newList) => {
    setList(newList)
  }
  const filterAll = () => {
    setActiveFlag(false)
    setCompletedFlag(false)
  }

  const filterActive = () => {
    setActiveFlag(true)
    setCompletedFlag(false)
  }

  const filterComplete = () => {
    setActiveFlag(false)
    setCompletedFlag(true)
  }
  const clearCompleted = (clearList) => {
    setList(clearList)
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm
          handleInputKeyDown={(newTask, userTimerSeconds) => handleInputKeyDown(newTask, userTimerSeconds)}
        />
      </header>
      <section className="main">
        <TaskList
          list={list}
          handleDeleteTask={(tasksItemDelete) => handleDeleteTask(tasksItemDelete)}
          handleCompletedTasks={(newList) => handleCompletedTasks(newList)}
          completedFlag={completedFlag}
          activeFlag={activeFlag}
        />
        <Footer
          list={list}
          filterComplete={filterComplete}
          filterActive={filterActive}
          filterAll={filterAll}
          clearCompleted={(clearList) => clearCompleted(clearList)}
        />
      </section>
    </section>
  )
}

export default App
