import React, { Component } from 'react';
import './UserDialog.css'
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud'

import ForgotPasswordForm from './ForgotPasswordForm'
import SignInOrSignUp from './SignInOrSignUp'


export default class UserDialog extends Component{
  constructor(props){
        super(props)
        this.state = {
          selectedTab: 'signInOrSignUp', // 'forgotPassword'
          formData:{
              email: '',
              username: '',
              password:'',
              emailStatus: false
          }
        }
      }

      signUp(e){
        e.preventDefault()
        let {email, username, password} = this.state.formData//这里加正则
        {console.log('1')}
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
    //验证Email
    var reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(reg.test(this.state.formData.email)){
      this.state.formData.emailStatus = true;
    }else{
      this.state.formData.emailStatus = false;
    }
    //验证密码
      console.log(this.state)
      console.log(typeof(this.render))
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
        {
            this.state.selectedTab === 'signInOrSignUp' ?
              <SignInOrSignUp
                formData={this.state.formData}
                onSignIn={this.signIn.bind(this)}
                onSignUp={this.signUp.bind(this)}
                onChange={this.changeFormData.bind(this)}
                onForgotPassword={this.showForgotPassword.bind(this)}
              /> :
        <ForgotPasswordForm 
          formData = {this.state.formData}
          onSubmit={this.resetPassword.bind(this)}
          onChange={this.changeFormData.bind(this)}
          onSignIn={this.returnToSignIn.bind(this)}
          />
          }
        </div>
      </div>
    )
  }
  showForgotPassword(){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'forgotPassword'
    this.setState(stateCopy)
  }
  resetPassword(e){
    e.preventDefault();
    sendPasswordResetEmail(this.state.formData.email)
   }
   returnToSignIn(){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'signInOrSignUp'
    this.setState(stateCopy)
   }
}
