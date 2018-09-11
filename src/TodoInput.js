import React  from 'react';
import './TodoInput.css'
function submit (props, e) {
    if (e.key === 'Enter') {
        if (e.target.value.trim() !== '') {
            props.onSubmit(e);
          }
      }
}
function changeTitle (props, e) {
    props.onChange(e)
  }
   // bind：
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
   export default function (props) {
    console.log('in-todoinput', props)
    return <input type="text" value={props.content}
      className="TodoInput"
      onChange={changeTitle.bind(null, props)}
      onKeyPress={submit.bind(null, props)}/>
    }
    
