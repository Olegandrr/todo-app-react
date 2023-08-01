import { Task } from "../Task/Task";

export const TaskList=(props)=>{
  return(
    <>
      <ul className="todo-list">
        <Task data={ props.data }/>
      </ul>
     </>
  )
}