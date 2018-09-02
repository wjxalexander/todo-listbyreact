import React, {Component} from 'react';
import './TodoItem.css'
export default class TodoItem extends Component{    
    render(){
        return(
        <div className = "TodoItem">
        <input type="checkbox" checked={this.props.todo.status === 'completed'}
            onChange={this.toggle.bind(this)}/> 
            {this.props.todo.title}
            <button onClick={this.delete.bind(this)}>删除</button>
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

