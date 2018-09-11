import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import './reset.css'
import UserDialog from './UserDialog';
import {getCurrentUser, signOut, TodoModel} from './leanCloud'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: getCurrentUser()||{},
      newToDo: '',
      toDoList:[],//初始化为[]
      whichpannel: "currentpannel",
      planlist:[]

    }
  
  let user = getCurrentUser()
  if (user) {
    TodoModel.getByUser(user, (todos) => {
      let stateCopy = JSON.parse(JSON.stringify(this.state))
      stateCopy.toDoList = todos
      this.setState(stateCopy)
    })
  }
}

  render() {
    let todos = this.state.toDoList
      .filter((item)=>!item.deleted)//获取delete属性
      .map((item,index)=> {
      return (// 在JS中JavaScript 会自动给行末添加分号。如果 return 后面换行不加括号就会变成 return; 当然不换行一步写完也是可以的，只是难以阅读
      <li key={index}>
         <TodoItem todo={item} 
          onToggle={this.toggle.bind(this)}
          onDelete = {this.delete.bind(this)}/>
      </li>);
    });
    let planlists = this.state.planlist
      .map((item,index) => {
        console.log('item',item)
        return (
          <li onClick={this.createnewlist.bind(this)} key={index}>
          <i className="fas fa-list-ul"></i>
          {item.title+item.id}
          </li>
        )
      })

    return (
      <div className="App">
        <div className='topbar'>
        <h1>{this.state.user.username||'我'}的待办</h1>
        <p>{new Date().toLocaleDateString()}</p>
        <li className='navbar'>
          <i class="fas fa-ellipsis-h"></i>
          <ul className = 'child'>
          <li>
            <a className='deleallbutton' onClick = {this.deleteall.bind(this)}>
              <i class="fas fa-minus-circle"></i>
              Delete All
            </a>
          </li>
          <li>
          {this.state.user.id ? 
              <a className= 'signoutbtn' onClick={this.signOut.bind(this)}>
              <i className="fas fa-sign-out-alt"></i>
              Sign out
              </a> : null}
          </li>
          </ul>
        </li>
        
     </div>
        <div className = 'inputWrapper'>
        {/*两个注意的点：
        1. If a tag is empty, you may close it immediately with />, like XML
        2. Don’t put quotes around curly braces when embedding a JavaScript expression in an attribute. 
        You should either use quotes (for string values) or curly braces (for expressions), but not both in the same attribute.
          <input type = "text" value ={this.state.newToDo}/>
        */}
         <TodoInput content={this.state.newToDo} 
            onChange={this.changeTitle.bind(this)}//与
            onSubmit={this.addTodo.bind(this)} />

            {/*App 传一个函数给 TodoInput*/}
        </div>
        <div className = 'showpanel'>
        {this.state.whichpannel === 'currentpannel' ? 
          <ol className = "todoList">
          {todos}
          </ol> : null}
          {this.state.whichpannel === 'oldpanel' ? 
          <ol className = "todoList">
          {todos}
          </ol> : null}
          <div className='showlists'>
          <ul className='planlists'>
          {planlists}
          </ul>
            <div className = "createdtodoList">
            <a className='creatnew' onClick =  {this.createpara.bind(this)}>
            <i class="fas fa-plus"></i>
              新建清单
            </a>
            </div>
          </div>
        </div>
        
        {/* 登陆框 */}
        {this.state.user.id ? 
          null : 
          <UserDialog 
            onSignUp={this.onSignUpOrSignIn.bind(this)} 
            onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
      </div>
    )
  }
  createnewlist(){
    this.resetalllists()
  }
  deleteall(){
    let stateCopy = this.deepCopy();
    stateCopy.toDoList = [];
    this.setState(stateCopy)
  }
 switchpannels(){
   this.state.whichpannel='oldpanel'
   let length = this.state.toDoList.length;
    for(var i =0; i <length; i++){
      this.state.toDoList[i].deleted = false;
    }
   this.setState(this.state)
 }
  resetalllists(){
    console.log("我要全部删除了")
    this.state.whichpannel = 'currentpannel'
    let length = this.state.toDoList.length;
    for(var i =0; i <length; i++){
      this.state.toDoList[i].deleted = true;
    }
    this.setState(this.state);    
  }

  deepCopy(){
    return JSON.parse(JSON.stringify(this.state))
  }
  signOut(){
    signOut()
    let stateCopy = this.deepCopy();
    stateCopy.user = {};
    this.setState(stateCopy)
    // let stateCopy = JSON.parse(JSON.stringify(this.state))
    // stateCopy.user = {}
    // this.setState(stateCopy)
  }
  onSignUpOrSignIn(user){
    let stateCopy = this.deepCopy();
    stateCopy.user = user;
    this.setState(stateCopy)
  }
  componentDidUpdate(){
  }
  toggle(e,todo){
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
    TodoModel.update(todo, () => {
      this.setState(this.state)
    }, (error) => {
      todo.status = oldStatus
      this.setState(this.state)
    }) 
  }
  changeTitle(event){//重置title
    this.setState({
      newToDo: event.target.value,
      toDoList: this.state.toDoList
    })
  }
  createpara(e){
    console.log(e,'add para')
    this.state.planlist.push({
      id: idMaker(),
      title: "代办"
    })
    this.setState({planlist: this.state.planlist})

  }
  addTodo(event){
    console.log('add a todo',event.target.value);
    let newToDo={
      title: event.target.value,
      status:'', 
      deleted: false
    }
    TodoModel.create(newToDo, (id) => {
      console.log("todomodel")
      newToDo.id = id
      this.state.toDoList.push(newToDo)
      this.setState({
        newToDo: '',
        toDoList: this.state.toDoList
      })
    }, (error) => {
      console.log(error)
    })
}
  delete(event, todo){
    console.log("我要删除了")
    TodoModel.destroy(todo.id, () => {
      todo.deleted = true
      this.setState(this.state)
    })
  }
}
export default App;
let listid = 0
 function idMaker(){
  listid += 1
  return listid
}
/*
import React from 'react'; // 为什么要 import React
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

input 里的文字用 input.value 就可以获得了，为什么还要用 newTodo 来容纳？
方便setState,每添加一个todolist只需要改newtodo就好了

*/
