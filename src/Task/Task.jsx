import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';


export const Task =({ item, dataCreated, deleteTask })=>{
  
  const data = formatDistanceToNow(dataCreated, { 
      includeSeconds: true,
      addSuffix: true,
    }
  );

  let [completedTask, setCompletedTask] = useState(false);
  
  const handleCheckbox = ()=>{
    setCompletedTask ((completedTask)=>completedTask=!completedTask);
    }

  let [editingTask, setEditingTask] = useState(false);
  
  const handleEditTask = ()=>{
    if(!completedTask) setEditingTask ((editingTask)=>editingTask=!editingTask);
    }
    

  return (
    <li className={ completedTask? "completed" : "" || editingTask? "editing": "" }>
      <div className="view" >
        <input 
          className="toggle" type="checkbox" 
          onClick={handleCheckbox}
          />
        <label>
          <span className="description">{ item }</span>
          <span className="created">created { data }</span>
        </label>
        <button 
          className="icon icon-edit"
          onClick={handleEditTask}></button>
        <button 
          className="icon icon-destroy"
          onClick={ deleteTask }
        ></button>
      </div>
      <input 
        type="text" 
        className="edit" 
        display={ editingTask? "block": "none" } 
      
      />
    </li>
    
  )
}