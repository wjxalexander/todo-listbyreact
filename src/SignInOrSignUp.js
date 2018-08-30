import React, {Component} from 'react';
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
 export default class SignInOrSignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 'signUp'
    }
  }
   switch (e) {//来回切换的函数
    this.setState({
      selected: e.target.id//通过id来确认选中的值
    })
    console.log("selected", this.state.selected)
  }

   render () {
    return (
      <div className="signInOrSignUp">
        <nav>
          <label>
            <a id = "signUp" className = {this.state.selected === 'signUp'? "activetab" : "deactivetab"}
            onClick = {this.switch.bind(this)}
            >注册</a>
            {/* <input type="radio" value="signUp"
              checked={this.state.selected === 'signUp'}
              onChange={this.switch.bind(this)}
               /> 注册*/}
            </label>
          <label>
          <a id = "signIn" className = {this.state.selected === 'signIn'? "activetab" : "deactivetab"}
            onClick = {this.switch.bind(this)}
            >登陆</a>
            </label>
        </nav>
        <div className="panes">
          {this.state.selected === 'signUp' ?
            <SignUpForm formData={this.props.formData}
              onSubmit={this.props.onSignUp}
              onChange={this.props.onChange}
            />
            : null}
          {this.state.selected === 'signIn' ?
            <SignInForm formData={this.props.formData}
              onChange={this.props.onChange}
              onSubmit={this.props.onSignIn}
              onForgotPassword={this.props.onForgotPassword}
            />
            : null}
        </div>
      </div>
    )
  }
}