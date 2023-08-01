import { NewTaskForm } from './NewTaskForm/NewTaskForm';
import { Footer } from './Footer/Footer';
import { TaskList } from './TaskList/TaskList';
import { formatDistanceToNow } from 'date-fns';
import './App.css';

const propsFooter={
  footer: "footer",
  span: "todo-count",
  ul: "filters",
  buttonAll: "selected",
  buttonClear: "clear-completed",
};


function App() {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm className="new-todo" placeholder="What needs to be done?" autoFocus />
      </header>
      <section className="main">
        <TaskList data={ formatDistanceToNow }/>
        <Footer className={ propsFooter } />
      </section>
      
    </section>
  );
}

export default App;
