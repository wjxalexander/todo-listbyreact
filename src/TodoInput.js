import React, { Component } from 'react';
class TodoInput extends Component{
    render(){
        return <input type = "text" value ={this.props.cotent}/>
    }
}
export default TodoInput;