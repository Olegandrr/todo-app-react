import { Task } from "../Task/Task";
import PropTypes from 'prop-types';

export const TaskList=({ list, deleteTask, editTask, completedTask, completedFlag, activeFlag })=>{
  
  if(completedFlag){
    return (    
      <ul className="todo-list">
        { list.filter(item=>item[3]).map((item)=>(
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
    } else if (activeFlag) {
      return (    
        <ul className="todo-list">
          { list.filter(item=>!item[3]).map((item)=>(
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

    } else {
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
}

TaskList.defaultProps = {
  list: []
};

TaskList.propTypes = {
  list: PropTypes.array
};



