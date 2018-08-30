import React from 'react';

export default function (props) {
  return (
    <form className="signIn" onSubmit={props.onSubmit}> {/* 登录*/}
      <div className="row">
        <label>
        <input type="text" value={props.formData.username}
          placeholder = "用户名" 
          onChange={props.onChange.bind(null, 'username')}/>
        </label>
      </div>
      <div className="row">
        <label>
        <input type="password" value={props.formData.password}
          placeholder = "密码" 
          onChange={props.onChange.bind(null, 'password')}/>
          </label>
      </div>
      <div>
      <a href="#" className = "forgetpassword" onClick={props.onForgotPassword} >忘记密码了？</a>
      </div>
      <div className="row actions">
      <input type ="submit" value = "登陆" className='button'/>
      </div>
    </form>
  )
}