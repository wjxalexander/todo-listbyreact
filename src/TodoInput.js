import React, { Component } from 'react';
class TodoInput extends Component{
    render(){
        console.log('intodoinput');
        console.log(this.props.content);
        return <input type = "text" defaultValue ={this.props.content}
            onKeyPress={this.submit}/>
    }
    submit(e){
        if(e.key === 'Enter'){
            console.log('回车')
        }
    }
}
export default TodoInput;