import { TasksFilter } from "../TasksFilter/TasksFilter";

export const Footer = ({ className, list, filterComplete, filterActive, filterAll, clearCompleted, completedFlag, activeFlag })=>{
  
  const itemsLeft = (list)=>{
    return list.length!==0? list.filter(item=>!item[3]).length : 0;
  }
 
  return(
    <footer className={ className.footer }>
      <span className={ className.span }>{ itemsLeft(list) } items left</span>
      <TasksFilter 
        className={ [className.ul, className.buttonAll] } 
        filterComplete = { filterComplete } 
        filterActive={ filterActive } 
        filterAll = { filterAll }
        completedFlag={ completedFlag }
        activeFlag = {activeFlag}
        />  
      <button className={ className.buttonClear } onClick={clearCompleted}>Clear completed</button>
    </footer>
  )
}