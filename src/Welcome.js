import React from 'react';

class Welcome extends React.Component{
    constructor(props){
        super(props)//super关键字用于访问和调用一个对象的父对象上的函数。就是Component中的props
        this.state = {date: new Date()}
    }
    componentDidMount(){
        console.log("The componentDidMount() hook runs after the component output has been rendered to the DOM. This is a good place to set up a timer")
        this.timerId = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount(){
        clearInterval(this.timerId);
    }
    tick(){
        this.setState({
            date: new Date()
        });
    }

    render(){
        //return <h1> hello,Component</h1>
        console.log(this.props.name);
        return (
        <div>
            <h1> hello,{this.props.name}</h1>
            <h2> It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>)
    }
}
export default Welcome 
/* 
动手题
1. 为什么要 import React:
猜测：
a. 为了在代码中使用ReactjS，webpack一节中jQuery就是这么引入的。import j from 'jquery'
b. 有点类似C语言的#include <stdio.h>引入一个库

参考MDN 
2. 为什么要export：export语句用于在创建JavaScript模块时，从模块中导出函数、对象或原始值，以便其他程序可以通过 import 语句使用它们。
2. 为什么要加default：有两种不同的导出方式：命名导出和默认导出。
命名导出对导出多个值很有用。在导入期间，必须使用相应对象的相同名称。
但是，可以使用任何名称导入默认导出，例如
export default k = 12; // in file test.js
import m from './test' // note that we got the freedom to use import m instead of import k, because k was default export
console.log(m);        // will log 12
*/ 