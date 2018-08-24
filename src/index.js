import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <App/>,
    //组件不能修改它得到的 props.为什么不能？为了让 bug 更少，这是一种经验，也是 React 推荐的观点。
    document.getElementById('root')
)
registerServiceWorker();
