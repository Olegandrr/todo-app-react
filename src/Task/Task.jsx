import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';


export const Task =({ item, dataCreated, 
                      deleteTask, editTask, 
                      completedTask, taskComplete })=>{
  
  const timeCreation = formatDistanceToNow(dataCreated, { 
      includeSeconds: true,
      addSuffix: true,
    }
  );

  const [editingToggle, setEditingToggle] = useState(false);
  
  const toggleEditTask = ()=>{
    if(!taskComplete) setEditingToggle ((editingToggle)=>editingToggle=!editingToggle);
    }

  return (
    <li className={ taskComplete? "completed" : "" || editingToggle? "editing" : "" }>
      <div className="view" >
        <input 
          className="toggle" 
          type="checkbox" 
          onClick={ completedTask }
          defaultChecked={ taskComplete? true : false } 
          />
        <label>
          <span className="description">{ item }</span>
          <span className="created">created { timeCreation }</span>
        </label>
        <button 
          className="icon icon-edit"
          onClick={ toggleEditTask }></button>
        <button 
          className="icon icon-destroy"
          onClick={ deleteTask }
        ></button>
      </div>
      <input 
        type="text" 
        className="edit" 
        display={ editingToggle? "block": "none" } 
        onKeyDown={ editTask }
      />
    </li>
    
  )
}