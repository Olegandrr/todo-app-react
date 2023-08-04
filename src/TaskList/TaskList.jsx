import { Task } from "../Task/Task";

export const TaskList=({ list, deleteTask })=>{
 // console.log(list)
  return (
    
      <ul className="todo-list">
        { list.map((item, index)=>(
           <Task item={item[0]} dataCreated={item[1]} key={ item[2] } deleteTask = {()=>deleteTask(item[2])}/> 
           ))}
       
      </ul>
     
  )
}



