import React, { Component } from 'react';
class TodoInput extends Component{
    render(){
        console.log('intodoinput');
        console.log(this.props.content);
        return <input type = "text" defaultValue ={this.props.content}/>
    }
}
export default TodoInput;