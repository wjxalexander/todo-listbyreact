import React from 'react';

export default function (props) {
  return (
    <form className="signUp" onSubmit={props.onSubmit.bind(this)}> {/* 注册*/}
      <div className="row">
        <label>邮箱</label>
        <input type="text" value={props.formData.email}
          onChange={props.onChange.bind(null, 'email')}/>
      </div>
      <p className = {props.formData.emailStatus ? "nondisplay" : "display"}>请输入正确的邮件地址</p>
      <div className="row">
        <label>用户名</label>
        <input type="text" value={props.formData.username}
          onChange={props.onChange.bind(null, 'username')}/>
        {/* bind 不仅可以绑定 this，还可以绑定第一个参数 */}
      </div>
      <p className = {props.formData.nameStatus ? "nondisplay" : "display"}>用户名必须大于三个字符</p>
      <div className="row">
        <label>密码</label>
        <input type="password" value={props.formData.password}
          onChange={props.onChange.bind(null, 'password')}/>
      </div>
      <p className = {props.formData.passwordStatus ? "nondisplay" : "display"}>密码必须大于三个字符</p>
      <div className="row actions">
        <button type="submit">注册</button>
      </div>
    </form>
  )
}