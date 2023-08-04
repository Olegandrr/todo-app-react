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

  const deleteLi = (keyID)=>{
    const index = list.findIndex((el)=>el[2] === keyID);
    let before = list.slice(0, index);
    let after = list.slice(index+1);
    setList([...before, ...after]);
  };

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
        <TaskList list={ list } deleteTask={ (keyID)=>deleteLi(keyID) } />
        <Footer className={ stylesFooter } itemsLeft = { list.length } />
      </section>
      
    </section>
  );
}

export default App;

