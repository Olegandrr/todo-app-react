/* eslint-disable react/destructuring-assignment */
import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

class TasksFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      completedFlag: false,
      activeFlag: false,
    }

    this.button = [{ name: 'All' }, { name: 'Active' }, { name: 'Completed' }]
  }

  handleClickButton = ({ target: { name } }) => {
    const { filterAll, filterActive, filterComplete } = this.props
    if (name === 'All') {
      this.setState({
        completedFlag: false,
        activeFlag: false,
      })
      filterAll()
    } else if (name === 'Active') {
      this.setState({
        completedFlag: false,
        activeFlag: true,
      })
      filterActive()
    } else if (name === 'Completed') {
      this.setState({
        completedFlag: true,
        activeFlag: false,
      })
      filterComplete()
    }
  }

  classNameSelectedButton = (name) => {
    const { completedFlag, activeFlag } = this.state
    const all = !completedFlag && !activeFlag
    if (completedFlag && name === 'Completed') {
      return 'selected'
    }
    if (activeFlag && name === 'Active') {
      return 'selected'
    }
    if (all && name === 'All') {
      return 'selected'
    }
    return ''
  }

  render() {
    return (
      <ul className="filters">
        <li>
          {this.button.map((item) => (
            <button
              key={uuidv4()}
              className={this.classNameSelectedButton(item.name)}
              name={item.name}
              type="button"
              onClick={this.handleClickButton}
            >
              {item.name}
            </button>
          ))}
        </li>
      </ul>
    )
  }
}

export default TasksFilter
