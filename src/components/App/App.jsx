import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import TaskList from '../TaskList'
import './App.css'

class App extends Component {
  state = {
    inputValue: { newTask: '', minutes: '', seconds: '' },
    list: [],
    completedFlag: false,
    activeFlag: false,
  }

  handleInputChange = (e) => {
    const { name, value } = e.target
    this.setState({ inputValue: { newTask: value, [name]: Math.abs(value) || value } })
  }

  // handleInputKeyDown для обработки ввода (Enter) в форме создания таски
  // Меняет список тасок(list)[[введенное значание, дата создания, ключ, таймер пользователя в секундах, таска выполнена/не выполнена]].

  handleInputKeyDown = (e) => {
    const { inputValue } = this.state
    const { newTask, minutes, seconds } = inputValue
    const { list } = this.state
    if (e.key === 'Enter' && e.target.value.trim().length !== 0) {
      e.preventDefault()
      const validMinutes = parseInt(minutes, 10) || 0
      const validSeconds = parseInt(seconds, 10) || 0
      const userTimerSeconds = validMinutes * 60 + validSeconds
      this.setState({ list: [...list, [newTask, new Date(), uuidv4(), userTimerSeconds, false]] })
      this.setState({ inputValue: { newTask: '', minutes: '', seconds: '' } })
    }
  }

  handleDeleteTask = (key) => {
    const { list } = this.state
    const index = list.findIndex((el) => el[2] === key)
    const tasksItemDelete = list.filter((_, ind) => ind !== index)
    this.setState({ list: tasksItemDelete })
  }

  handleCompletedTasks = (key) => {
    const { list } = this.state
    const index = list.findIndex((el) => el[2] === key)
    const newList = list.map((item, ind) => (ind !== index ? item : [...item.slice(0, 4), !item[4]]))
    this.setState({ list: newList })
  }

  // функции для обработки "кнопок" в футере, меняют состояние (completedFlag/activeFlag) для отрисовки нужных тасок в зависимости от кнопки и удаления исполненных.
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

  clearCompleted = () => {
    const { list } = this.state
    const clearList = list.filter((item) => !item[4])
    this.setState({ list: clearList })
  }

  render() {
    const { inputValue, list, completedFlag, activeFlag } = this.state
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm
            value={inputValue}
            onChange={this.handleInputChange}
            onKeyDown={(e) => this.handleInputKeyDown(e)}
          />
        </header>
        <section className="main">
          <TaskList
            list={list}
            deleteTask={(key) => this.handleDeleteTask(key)}
            completedTask={(key) => this.handleCompletedTasks(key)}
            completedFlag={completedFlag}
            activeFlag={activeFlag}
          />
          <Footer
            list={list}
            filterComplete={this.filterComplete}
            filterActive={this.filterActive}
            filterAll={this.filterAll}
            clearCompleted={this.clearCompleted}
            completedFlag={completedFlag}
            activeFlag={activeFlag}
          />
        </section>
      </section>
    )
  }
}

export default App

// function App() {
//   const [inputValue, setInputValue] = useState({ newTask: '', minutes: '', seconds: '' })
//   const [list, setList] = useState([])
//   const [completedFlag, setCompletedFlag] = useState(false)
//   const [activeFlag, setActiveFlag] = useState(false)

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setInputValue({ ...inputValue, [name]: Math.abs(value) || value })
//   }

//   // handleInputKeyDown для обработки ввода (Enter) в форме создания таски
//   // Меняет список тасок(list)[[введенное значание, дата создания, ключ, таймер пользователя в секундах, таска выполнена/не выполнена]].

//   const handleInputKeyDown = (e) => {
//     const { newTask, minutes, seconds } = inputValue
//     if (e.key === 'Enter' && e.target.value.trim().length !== 0) {
//       e.preventDefault()
//       const validMinutes = parseInt(minutes, 10) || 0
//       const validSeconds = parseInt(seconds, 10) || 0
//       const userTimerSeconds = validMinutes * 60 + validSeconds
//       setList([...list, [newTask, new Date(), uuidv4(), userTimerSeconds, false]])
//       setInputValue({ newTask: '', minutes: '', seconds: '' })
//     }
//   }

//   const handleDeleteTask = (key) => {
//     const index = list.findIndex((el) => el[2] === key)
//     const tasksItemDelete = list.filter((_, ind) => ind !== index)
//     setList(tasksItemDelete)
//   }

//   const handleCompletedTasks = (key) => {
//     const index = list.findIndex((el) => el[2] === key)
//     const newList = list.map((item, ind) => (ind !== index ? item : [...item.slice(0, 4), !item[4]]))
//     setList(newList)
//   }

//   // функции для обработки "кнопок" в футере, меняют состояние (completedFlag/activeFlag) для отрисовки нужных тасок в зависимости от кнопки и удаления исполненных.
//   const filterAll = () => {
//     setActiveFlag(false)
//     setCompletedFlag(false)
//   }

//   const filterActive = () => {
//     setActiveFlag(true)
//     setCompletedFlag(false)
//   }

//   const filterComplete = () => {
//     setCompletedFlag(true)
//     setActiveFlag(false)
//   }

//   const clearCompleted = () => {
//     const clearList = list.filter((item) => !item[4])
//     setList(clearList)
//   }
//   return (
//     <section className="todoapp">
//       <header className="header">
//         <h1>todos</h1>
//         <NewTaskForm value={inputValue} onChange={handleInputChange} onKeyDown={(e) => handleInputKeyDown(e)} />
//       </header>
//       <section className="main">
//         <TaskList
//           list={list}
//           deleteTask={(key) => handleDeleteTask(key)}
//           completedTask={(key) => handleCompletedTasks(key)}
//           completedFlag={completedFlag}
//           activeFlag={activeFlag}
//         />
//         <Footer
//           list={list}
//           filterComplete={filterComplete}
//           filterActive={filterActive}
//           filterAll={filterAll}
//           clearCompleted={clearCompleted}
//           completedFlag={completedFlag}
//           activeFlag={activeFlag}
//         />
//       </section>
//     </section>
//   )
// }

// export default App
