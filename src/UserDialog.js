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
              emailStatus: true,//用于email验证
              nameStatus: true,//用于名字验证
              passwordStatus: true//用于密码验证
          }
        }
      }

      signUp(e){
        e.preventDefault()
        let {email, username, password,emailStatus,nameStatus,passwordStatus} = this.state.formData
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
    if(emailStatus&&nameStatus&&passwordStatus){//必须满足三个条件才能提交
      signUp(email,username, password, success, error)
    }else{//否则不可以提交
      return false;
    }
    
    console.log('insignup',this.state.formData)
  }
  signIn(e){
    e.preventDefault()
    let {username, password,nameStatus,passwordStatus} = this.state.formData
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
    if(nameStatus&&passwordStatus){
      signIn(username, password, success, error)
    }else{
      return false;
    }
  }
  changeFormData(key,e){
        // this.state.formData.username = e.target.value
        // this.setState(this.state)
        // 像上面这样写会看到一个警告 warning  Do not mutate state directly. Use setState()
        var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
        let stateCopy = JSON.parse(JSON.stringify(this.state))  // 用 JSON 深拷贝
        stateCopy.formData[key] = e.target.value;
        console.log("stateCopyis",stateCopy,typeof(stateCopy));
        console.log(reg.test(stateCopy.formData.emailStatus))
        //email验证
        if(reg.test(stateCopy.formData.email)){
          stateCopy.formData.emailStatus = true;
        }else{
          stateCopy.formData.emailStatus = false;
        }
        //用户名认证:用户名必须大于三个字符
        if(stateCopy.formData.username.length >= 3){
          stateCopy.formData.nameStatus = true;
        }else{
          stateCopy.formData.nameStatus = false;
        }
        // 密码认证：密码必须不小于6个字符
        if(stateCopy.formData.password.length >= 6){
          stateCopy.formData.passwordStatus = true;
        }else{
          stateCopy.formData.passwordStatus = false;
        }
        this.setState(stateCopy)
    }
 
    
  render(){
    //验证Email
    
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
    var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
    let emailStatus = false;
    if(!reg.test(this.formData.email)){
      emailStatus = false;
    }else{
      emailStatus = true;
    }
    if(emailStatus){
      sendPasswordResetEmail(this.state.formData.email)
    }
    else{
      return false;
    }
   }
   returnToSignIn(){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'signInOrSignUp'
    this.setState(stateCopy)
   }
}
