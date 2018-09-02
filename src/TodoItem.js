import React, {Component} from 'react';
import './TodoItem.css'
export default class TodoItem extends Component{    
    render(){
        return(
        <div className = "TodoItem">
        <a onClick={this.toggle.bind(this)}>
        <i className="far fa-check-circle" id = {this.props.todo.status === 'completed'? "completedcheck" : "uncompletedcheck"}></i>
        </a>
            {this.props.todo.title}
            <a className = 'deleteitem' onClick={this.delete.bind(this)}>
            <i className="fas fa-trash-alt"></i>
            </a>
      </div>//z这里构造了三样东西，1.一个checkbox 2. 输入的的内容（.title）3 删除键
    )
    
    }
    toggle(e){
        console.log("toggletodois",e, this.props.todo)
        this.props.onToggle(e, this.props.todo)
    }
    delete(e){
        console.log("deletetodois",e, this.props.todo)
        this.props.onDelete(e, this.props.todo)
    }

}

