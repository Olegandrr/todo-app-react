import { useState } from 'react';
import { NewTaskForm } from './NewTaskForm/NewTaskForm';
import { Footer } from './Footer/Footer';
import { TaskList } from './TaskList/TaskList';
import './App.css';

const stylesFooter={
  footer: "footer",
  span: "todo-count",
  ul: "filters",
  buttonAll: "selected",
  buttonClear: "clear-completed",
}

let TaskID = 100;

function App() {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [completedFlag, setCompletedFlag] = useState(false);
  const [activeFlag, setActiveFlag] = useState(false);  

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e, key) => {
    if (e.key === "Enter" && e.target.value.trim().length!==0 ) {
      if(key === 'newTask') {
        setList([...list, [inputValue, new Date(), TaskID++, false]]);
        setInputValue ("");
      } else {
          const index = list.findIndex((el)=>el[2] === key);
          const newList = list.map((item, ind)=>(
            ind !== index? item : [e.target.value, item[1], key *= 2, false]
            ));
          setList(newList)
        } 
    }
  };

  const handleDeleteTask = (key)=>{
    const index = list.findIndex((el)=>el[2] === key);
    const tasksItemDelete = list.filter((i, ind)=>ind!==index);
    setList(tasksItemDelete)
  };

  const handleCompletedTasks = (key)=>{
    const index = list.findIndex((el)=>el[2] === key);
    const newList = list.map((item, ind)=>(
          ind !== index? item : [...item.slice(0,3), item[3]? false : true ]
          ));
    setList(newList)
  }

  const filterAll=()=>{
    setActiveFlag(false);
    setCompletedFlag(false);
  }

  const filterActive = ()=>{
    setActiveFlag(true);
    setCompletedFlag(false);
  }

  const filterComplete = ()=>{
      setCompletedFlag(true);
      setActiveFlag(false);
  }

  const clearCompleted =()=>{
    const clearList = list.filter(item=>!item[3]);
    setList(clearList);
  }
  
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm 
          className="new-todo"
          placeholder="What needs to be done?"  
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e)=> handleInputKeyDown(e, 'newTask')}
          autoFocus 
         />
      </header>
      <section className="main">
        <TaskList 
          list={ list } 
          deleteTask = { (key)=>handleDeleteTask(key) } 
          editTask={ (e, key)=>handleInputKeyDown(e, key) }
          completedTask={ (key)=>handleCompletedTasks(key) }
          completedFlag={ completedFlag }
          activeFlag = {activeFlag}
          
        />
        <Footer 
          className={ stylesFooter } 
          list={ list } 
          filterComplete = { filterComplete }
          filterActive = { filterActive }
          filterAll = {filterAll}
          clearCompleted = {clearCompleted}
          completedFlag={ completedFlag }
          activeFlag = {activeFlag}
        />
      </section>
    </section>
  );
}

export default App;

