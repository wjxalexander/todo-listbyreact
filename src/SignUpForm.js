import React from 'react';

export default function (props) {
  return (
    <form className="signUp" onSubmit={props.onSubmit.bind(this)}> {/* 注册*/}
      <div className="row">
        <label>
        <i class="far fa-envelope"></i>
        <input type="text" value={props.formData.email}
          placeholder = "邮箱地址"
          onChange={props.onChange.bind(null, 'email')}/>
        </label>
      </div>
      <p className = {props.formData.emailStatus ? "nondisplay" : "display"}>请输入正确的邮件地址</p>
      <div className="row">
        <label>
        <i className="fas fa-user"></i>
        <input type="text" value={props.formData.username}
        placeholder = "用户名"
          onChange={props.onChange.bind(null, 'username')}/>
        {/* bind 不仅可以绑定 this，还可以绑定第一个参数 */}
        </label>
      </div>
      
      <p className = {props.formData.nameStatus ? "nondisplay" : "display"}>用户名必须大于三个字符</p>
      <div className="row">
        <label>
        <i class="fas fa-key"></i>
        <input type="password" value={props.formData.password}
          placeholder = "密码"
          onChange={props.onChange.bind(null, 'password')}/>
        </label>
      </div>
      <p className = {props.formData.passwordStatus ? "nondisplay" : "display"}>密码必须大于三个字符</p>
      <div className="row actions">
        <input type ="submit" value = "注册" className='button'/>
      </div>
    </form>
  )
}