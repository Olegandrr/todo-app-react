import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import TaskList from '../TaskList'
import './App.css'

function App() {
  const [list, setList] = useState([])
  const [filters, setFilters] = useState({ completedFlag: false, activeFlag: false })
  const { activeFlag, completedFlag } = filters

  const handleInputKeyDown = (newTask, userTimerSeconds) => {
    setList([...list, [newTask, new Date(), uuidv4(), userTimerSeconds, false]])
  }

  const handleDeleteTask = (tasksItemDelete) => {
    setList(tasksItemDelete)
  }

  const handleCompletedTasks = (newList) => {
    setList(newList)
  }
  const filterAll = (filtersToggle) => {
    setFilters(filtersToggle)
  }

  const filterActive = (filtersToggle) => {
    setFilters(filtersToggle)
  }

  const filterComplete = (filtersToggle) => {
    setFilters(filtersToggle)
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
          filterComplete={(filtersToggle) => filterComplete(filtersToggle)}
          filterActive={(filtersToggle) => filterActive(filtersToggle)}
          filterAll={(filtersToggle) => filterAll(filtersToggle)}
          clearCompleted={(clearList) => clearCompleted(clearList)}
        />
      </section>
    </section>
  )
}

export default App
