import React, { Component } from 'react';
import './UserDialog.css'
import {signUp, signIn} from './leanCloud'
export default class UserDialog extends Component{
  constructor(props){
        super(props)
        this.state = {
          selected: 'signUp',
          formData:{
              email: '',
              username: '',
              password:'',
          }
        }
      }
      switch(e){
        this.setState({
          selected: e.target.value
        })
      }
      signUp(e){
        e.preventDefault()
        let {email, username, password} = this.state.formData
        let success = (user)=>{
          this.props.onSignUp.call(null, user)
      }
      let error = (error)=>{
      console.log(error)
      switch(error.code){
        case 202:
          alert('用户名已被占用')
          break
        default:
          alert(error)
          break
      }
    }
    signUp(email,username, password, success, error)
  }
  signIn(e){
    e.preventDefault()
    let {username, password} = this.state.formData
    let success = (user)=>{
      this.props.onSignIn.call(null, user)
    }
    let error = (error)=>{
      switch(error.code){
        case 210:
          alert('用户名与密码不匹配')
          break
        default:
          alert(error)
          break
      }
    }
    signIn(username, password, success, error)
  }
      changeFormData(key,e){
        // this.state.formData.username = e.target.value
        // this.setState(this.state)
        // 像上面这样写会看到一个警告 warning  Do not mutate state directly. Use setState()
        let stateCopy = JSON.parse(JSON.stringify(this.state))  // 用 JSON 深拷贝
        stateCopy.formData[key] = e.target.value;
        this.setState(stateCopy)
    }
  render(){
      let signUpForm = (
        <form className="signUp" onSubmt={this.signUp.bind(this)}> {/* 注册*/}
        <div className="row">
          <label>电子邮件</label> 
          <input type="text" value={this.state.formData.email}
            onChange={this.changeFormData.bind(this,'email')}/>
        </div>
        <div className="row">
          <label>用户名</label> 
          <input type="text" value={this.state.formData.username}
            onChange={this.changeFormData.bind(this,'username')}/>
        </div>
        <div className="row">
          <label>密码</label>
          <input type="password" value ={this.state.formData.password}
            onChange={this.changeFormData.bind(this,'password')}/>
        </div>
        <div className="row actions">
          <button type="submit">注册</button>
        </div>
      </form>
      )
      let signInForm =(
        <form className="signIn" onSubmt={this.signIn.bind(this)}> {/* 登录*/}
        <div className="row">
          <label>用户名</label>
          <input type="text" value ={this.state.formData.username}
            onChange={this.changeFormData.bind(this,'username')}/>
        </div>
        <div className="row">
          <label>密码</label>
          <input type="password"  value ={this.state.formData.password}
            onChange={this.changeFormData.bind(this,'password')}/>
        </div>
        <div className="row actions">
          <button type="submit">登录</button>
        </div>
        <div className="row">
          <a href="javascript">忘记密码？</a>
        </div>
      </form>
      )
      console.log(this.state)
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          <nav onChange ={this.switch.bind(this)}>
            <label><input type="radio" value="signUp" checked={this.state.selected === 'signUp'}/> 注册</label>
            <label><input type="radio" value="signIn" checked={this.state.selected === 'signIn'}/> 登录</label>
          </nav>
          <div className="panes">
            {this.state.selected === 'signUp' ? signUpForm : signInForm}
          </div>
        </div>
      </div>
    )
  }
}