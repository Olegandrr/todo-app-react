import { Task } from "../Task/Task";

export const TaskList=({ list, deleteTask, editTask, completedTask })=>{
 //console.log('лист из таск лист= ',list)
  return (
    
      <ul className="todo-list">
        { list.map((item)=>(
           <Task 
            item={item[0]} 
            dataCreated={item[1]} 
            key={ item[2] } 
            deleteTask = {()=>deleteTask(item[2])} 
            editTask = {(e)=>editTask(e, item[2])} 
            completedTask={ ()=>completedTask(item[2])}
            taskComplete={ item[3] }
            /> 
           ))}
       
      </ul>
     
  )
}



