import React, { Component } from 'react';
import './App.css';
import TodoInput from '/TodoInput'
import TodoItem from './TodoItem'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newToDo: 'test',
      toDoList: [
        {id: 1, title: '第一个代办'},
        {id: 2, title: '第一个代办'},
        {id: 3, title: '第一个代办'},
      ]
    }
  }
  render() {
    let todos = this.state.toDoList.map((item,index)=>{
      return (// // 为什么这里要加个括号？这是动手题3 在JS中JavaScript 会自动给行末添加分号。如果 return 后面换行不加括号就会变成 return; 当然不换行一步写完也是可以的，只是难以阅读
      <li>
        <TodoItem todo = {item}/>
      </li>);
    });
    
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
        <TodoInput content ={this.state.newToDo}/>
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    )
  }
}

export default App;
