import { useState } from 'react'

import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import TaskList from '../TaskList'
import './App.css'

const stylesFooter = {
  footer: 'footer',
  span: 'todo-count',
  ul: 'filters',
  buttonAll: 'selected',
  buttonClear: 'clear-completed',
}

let TaskID = 100

function App() {
  const [inputValue, setInputValue] = useState({ newTask: '', minutes: '', seconds: '' })
  const [list, setList] = useState([])
  const [completedFlag, setCompletedFlag] = useState(false)
  const [activeFlag, setActiveFlag] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInputValue({ ...inputValue, [name]: value })
  }
  // handleInputKeyDown для обработки ввода (Enter) в инпут при создании/ таски
  // Меняет список тасок(list)[[введенное значание, дата создания, ключ, таска выполнена/не выполнена, минуты, секунды]].
  const handleInputKeyDown = (e) => {
    const { newTask, minutes, seconds } = inputValue
    if (e.key === 'Enter' && newTask !== '') {
      e.preventDefault()
      setList([...list, [newTask, new Date(), (TaskID += 1), false, minutes || 0, seconds || 0]])
      setInputValue({ newTask: '', minutes: '', seconds: '' })
    }
  }

  const handleDeleteTask = (key) => {
    const index = list.findIndex((el) => el[2] === key)
    const tasksItemDelete = list.filter((i, ind) => ind !== index)
    setList(tasksItemDelete)
  }

  const handleCompletedTasks = (key) => {
    const index = list.findIndex((el) => el[2] === key)
    const newList = list.map((item, ind) =>
      ind !== index ? item : [...item.slice(0, 3), !item[3], ...item.slice(4, 6)]
    )
    setList(newList)
  }

  // функции для обработки "кнопок" в футере, меняют состояние (completedFlag/activeFlag) для отрисовки нужных тасок в зависимости от кнопки.
  const filterAll = () => {
    setActiveFlag(false)
    setCompletedFlag(false)
  }

  const filterActive = () => {
    setActiveFlag(true)
    setCompletedFlag(false)
  }

  const filterComplete = () => {
    setCompletedFlag(true)
    setActiveFlag(false)
  }

  const clearCompleted = () => {
    const clearList = list.filter((item) => !item[3])
    setList(clearList)
  }
  console.log('содеражание в list: ', list)
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e, key) => handleInputKeyDown(e, key)}
        />
      </header>
      <section className="main">
        <TaskList
          list={list}
          deleteTask={(key) => handleDeleteTask(key)}
          editTask={(e, key) => handleInputKeyDown(e, key)}
          completedTask={(key) => handleCompletedTasks(key)} // нужна ли она там? посмотреть
          completedFlag={completedFlag}
          activeFlag={activeFlag}
        />
        <Footer
          className={stylesFooter}
          list={list}
          filterComplete={filterComplete}
          filterActive={filterActive}
          filterAll={filterAll}
          clearCompleted={clearCompleted}
          completedFlag={completedFlag}
          activeFlag={activeFlag}
        />
      </section>
    </section>
  )
}

export default App
