import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import './reset.css'
import UserDialog from './UserDialog';
import {getCurrentUser, signOut} from './leanCloud'
import AV from './leanCloud'

  // 声明类型
  var TodoFolder = AV.Object.extend('TodoFolder');
  // 新建对象
  var todoFolder = new TodoFolder();
  // 设置名称
  todoFolder.set('name','工作');
  // 设置优先级
  todoFolder.set('priority',1);
  todoFolder.save().then(function (todo) {
    console.log('objectId is ' + todo.id);
  }, function (error) {
    console.error(error);
  });
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: getCurrentUser()||{},
      newToDo: '',
      toDoList:[]//初始化为[]
    }
  }

  render() {
    let todos = this.state.toDoList
      .filter((item)=>!item.delete)//获取delete属性
      .map((item,index)=>{
      return (// 为什么这里要加个括号？这是动手题3 在JS中JavaScript 会自动给行末添加分号。如果 return 后面换行不加括号就会变成 return; 当然不换行一步写完也是可以的，只是难以阅读
      <li key={index}>
        <TodoItem todo = {item} 
        onToggle = {this.toggle.bind(this)}
        onDelete = {this.delete.bind(this)}/>
      </li>);
    });
    console.log("todo now is",todos);

    return (
      <div className="App">
        <h1>{this.state.user.username||'我'}的待办
          {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button> : null}
        </h1>
        <div className = 'inputWrapper'>
        {/*两个注意的点：
        1. If a tag is empty, you may close it immediately with />, like XML
        2. Don’t put quotes around curly braces when embedding a JavaScript expression in an attribute. 
        You should either use quotes (for string values) or curly braces (for expressions), but not both in the same attribute.
          <input type = "text" value ={this.state.newToDo}/>
        */}
         <TodoInput content={this.state.newTodo} 
            onChange={this.changeTitle.bind(this)}//与
            onSubmit={this.addTodo.bind(this)} />
            {/*App 传一个函数给 TodoInput*/}
        </div>
        <ol className = "todoList">
          {todos}
        </ol>
        {this.state.user.id ? 
          null : 
          <UserDialog 
            onSignUp={this.onSignUpOrSignIn.bind(this)} 
            onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
      </div>
    )
  }
  deepCopy(){
    return JSON.parse(JSON.stringify(this.state))
  }
  signOut(){
    signOut()
    this.deepCopy().user = {}
    this.setState(this.deepCopy())
  }

  onSignUpOrSignIn(user){
    this.deepCopy().user = user
    this.setState(this.deepCopy())
  }
  componentDidUpdate(){
  }

  toggle(e,todo){
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state) 
  }
  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      toDoList: this.state.toDoList
    })
  }
  addTodo(event){
    console.log('add a todo');
    this.state.toDoList.push({//这里添加数组的内容
      id: idMaker(),
      title: event.target.value,
      status:null, 
      delete: false
    })
    this.setState({
      newToDo:'',
      toDoList: this.state.toDoList//更新todolist,state 是不能直接修改的
    })
    console.log('修改后的todolist是',this.state.toDoList)
  }
  delete(event, todo){
    console.log("我要删除了")
    todo.delete = true
    this.setState(this.state)
  }
}
export default App;
let id = 0;
function idMaker(){
  id++;
  return id
}
/*
动手题1： import React from 'react'; // 为什么要 import React
class Welcome extends React.Component {
  render() {
    return <h1>Hello, Component</h1>;
  }
}
export default Welcome // 为什么要 export，为什么要加 default
答: 
为什么要 import React: 
引入react 库，使用react的功能和语法等等
为什么要 export，为什么要加 default
不加export就无法在其他地方引用。
关于default
来自ES6语法。根据MDN：
If we want to export a single value or to have a fallback value for our module, we could use a default export:
如果我们要导出一个值或模块中的返回值，就可以使用默认导出：
If a module defines a default export:
export default function() { console.log("hello!") }
then you can import that default export by omitting the curly braces:
import foo from "foo";
foo(); // hello!
因为是默认倒出，因此在import的时候任何命名都是一样的

很奇怪，input 里的文字用 input.value 就可以获得了，为什么还要用 newTodo 来容纳呢？看完教程你就懂了。
方便setState,每添加一个todolist只需要改newtodo就好了

为什么这里要加个括号？这是动手题3 
在JS中JavaScript 会自动给行末添加分号。如果 return 后面换行不加括号就会变成 return; 当然不换行一步写完也是可以的，只是难以阅读

*/