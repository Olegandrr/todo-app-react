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

let keyID = 100;

function App() {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim().length!==0) {
      setList([...list, [inputValue, new Date(), keyID++]]);
      setInputValue("");
    } else if(e.key === "Enter" && inputValue.trim().length===0) {
      setInputValue("");
    }
  };

  const deleteLi = (key)=>{
    const index = list.findIndex((el)=>el[2] === key);
    let before = list.slice(0, index);
    let after = list.slice(index+1);
    setList([...before, ...after]);
  };

  const editTask = (e, key)=> {
    if (e.key === "Enter" && e.target.value.trim().length!==0){
      const index = list.findIndex((el)=>el[2] === key);
      const newList = list.map((item, ind)=>ind !== index? item : [e.target.value, new Date(), key *= 2]);
      setList(newList)
    }
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
          onKeyDown={handleInputKeyDown}
          autoFocus 
         />
      </header>
      <section className="main">
        <TaskList 
          list={ list } 
          deleteTask={ (key)=>deleteLi(key) } 
          editTask={ (e, key)=>editTask(e, key) }
        />
        <Footer 
          className={ stylesFooter } 
          itemsLeft={ list.length } 
        />
      </section>
    </section>
  );
}

export default App;

