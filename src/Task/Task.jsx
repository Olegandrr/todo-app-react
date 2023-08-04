import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';


export const Task =({ item, dataCreated, deleteTask, editTask, completedTask, taskComplete })=>{
  
  const data = formatDistanceToNow(dataCreated, { 
      includeSeconds: true,
      addSuffix: true,
    }
  );

  let [editingTask, setEditingTask] = useState(false);
  
  const handleEditTask = ()=>{
    if(!taskComplete) setEditingTask ((editingTask)=>editingTask=!editingTask);
    }
    

  return (
    <li className={ taskComplete? "completed" : "" || editingTask? "editing": "" }>
      <div className="view" >
        <input 
          className="toggle" type="checkbox" 
          onClick={completedTask}
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
        onKeyDown={ editTask }
      
      />
    </li>
    
  )
}