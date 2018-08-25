import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import './reset.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newToDo: '',
      toDoList: [
        
      ]
    }
  }
  render() {
    let todos = this.state.toDoList.map((item,index)=>{
      return (// 为什么这里要加个括号？这是动手题3 在JS中JavaScript 会自动给行末添加分号。如果 return 后面换行不加括号就会变成 return; 当然不换行一步写完也是可以的，只是难以阅读
      <li key={index}>
        <TodoItem todo = {item} onToggle={this.toggle.bind(this)}/>
      </li>);
    });
    console.log(todos);

    return (
      <div className="App">
        <h1>My to-do list</h1>
        <div className = 'inputWrapper'>
        {/*两个注意的点：
        1. If a tag is empty, you may close it immediately with />, like XML
        2. Don’t put quotes around curly braces when embedding a JavaScript expression in an attribute. 
        You should either use quotes (for string values) or curly braces (for expressions), but not both in the same attribute.
          <input type = "text" value ={this.state.newToDo}/>
        */}
         <TodoInput content={this.state.newTodo} 
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    )
  }
  toggle(e,todo){
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state) 
  }
  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(event){
    console.log('add a todo');
    this.state.toDoList.push({
      id: idMaker(),
      title: event.target.value,
      status:null,
      delete: false
    })
    this.setState({
      newToDo:'',
      toDoList:this.state.toDoList
    })
  }
}
export default App;
let id = 0;
function idMaker(){
  id++;
  return id
}