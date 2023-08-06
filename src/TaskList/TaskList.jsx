import { Task } from "../Task/Task";

export const TaskList=({ list, handleDeleteTask, editTask, completedTask, completedFlag, activeFlag })=>{
  if(completedFlag){
    return (    
      <ul className="todo-list">
        { list.filter(item=>item[3]).map((item)=>(
           <Task 
            item={item[0]} 
            dataCreated={item[1]} 
            key={ item[2] } 
            handleDeleteTask = {()=>handleDeleteTask(item[2])} 
            editTask = {(e)=>editTask(e, item[2])} 
            completedTask={ ()=>completedTask(item[2])}
            taskComplete={ item[3] }
            /> 
        ))}
      </ul>
    )
    } else if (activeFlag) {
      return (    
        <ul className="todo-list">
          { list.filter(item=>!item[3]).map((item)=>(
             <Task 
              item={item[0]} 
              dataCreated={item[1]} 
              key={ item[2] } 
              handleDeleteTask = {()=>handleDeleteTask(item[2])} 
              editTask = {(e)=>editTask(e, item[2])} 
              completedTask={ ()=>completedTask(item[2])}
              taskComplete={ item[3] }
              /> 
          ))}
        </ul>
      )

    } else {
      return (    
        <ul className="todo-list">
          { list.map((item)=>(
             <Task 
              item={item[0]} 
              dataCreated={item[1]} 
              key={ item[2] } 
              handleDeleteTask = {()=>handleDeleteTask(item[2])} 
              editTask = {(e)=>editTask(e, item[2])} 
              completedTask={ ()=>completedTask(item[2])}
              taskComplete={ item[3] }
              /> 
          ))}
        </ul>
      )
    }
}



