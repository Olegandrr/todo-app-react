
export const Task =(props)=>{
  const data = props.data(new Date(), { // будет передаваться при создании таски
      includeSeconds: true,
      addSuffix: true,
    }
    );
    console.log(data)
 
  return (
    <>
      <li className="completed">
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description">Completed task</span>
            <span className="created">created { data }</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
      </li>
      <li className="editing">
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description">Editing task</span>
            <span className="created">created { data }</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
        <input type="text" className="edit" defaultValue="Editing task" />
      </li>
      <li>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description">Active task</span>
            <span className="created">created { data }</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
      </li>
    </>
  )
}