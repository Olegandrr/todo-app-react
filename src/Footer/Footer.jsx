import { TasksFilter } from "../TasksFilter/TasksFilter";

export const Footer = (props)=>{
  //console.log(props)
  return(
    <footer className={ props.className.footer }>
      <span className={ props.className.span }>1 items left</span>
      <TasksFilter className={ [props.className.ul, props.className.buttonAll] } />  
      <button className={ props.className.buttonClear }>Clear completed</button>
    </footer>
  )
}