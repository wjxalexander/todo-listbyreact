import React, {Component} from "react";
export default class ForgotPasswordForm extends Component {
    render(){
        return(
        <div className="forgotPassword">
          <h3>
            重置密码
          </h3>
          <form className="forgotPassword" onSubmit={this.props.onSubmit}> {/* 登录*/}
            <div className="row">
              <label>
              <input type="text" value={this.props.formData.email}
                placeholder = "邮箱"
                onChange={this.props.onChange.bind(null, 'email')}/>
              </label>
            </div>
            <p className = {this.props.formData.emailStatus ? "nondisplay" : "display"}>请输入正确的邮件地址</p>
            <div className="row actions">
              <button type="submit">发送重置邮件</button>
            </div>
          </form>
        </div>
        )
  }
}