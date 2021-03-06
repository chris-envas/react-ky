## react es6 推荐默认写法
```js
import React, {Component} from 'react';

const defaultProps = {
    userName: 'name'
}
class App extends Component {
    // 类型检查
    static propTypes = {
        // ...
    };
    // 默认类型
    static defaultProps = {
        // ...
    };
    constructor(props) {
        super(props);   // 调用基类的所有的初始化方法
        this.state = {
            // ...
        };
    }

    //组件将要加载
    componentWillMount(){

    }

    //组件加载完成执行的动作(第一轮执行)
    componentDidMount() {
        // ...
    }

    /* 以下是4个是组件更新过程的生命周期 */
    componentWillReceiveProps(nextProps) {
        //props更新，用于设置state(第二轮开始执行)
        //注意，这里setState并不会引发新的一轮更新
        // this.setState({})
    }
    shouldComponentUpdate(nextProps, nextState) {
        //决定组件是否更新(第二轮开始执行)

        // return true;
    }
    componentWillUpdate(nextProps, nextState) {
        // 准备更新
    }
    componentDidUpdate(prevProps, prevState) {
        // 更新完成
    }

    // 组件的卸载
    componentWillMount() {
        // ...
    }

    // 箭头函数写法
    // 使用箭头函数后就不用bind(this)了
    onChange = (val) => {

    }

    // 普遍写法
    onHandle(val){

    }

    render() {
        return <div>This is a demo.</div>;
    }
}

App.propTypes = {
    sidebar: PropTypes.element,  //抽屉里的内容
}

// 默认的定义props值
App.defaultProps = defaultProps;

```
## 子级调用父级函数
```js
//子级调用父级函数
numItemChangeHandle = (val) => {
    this.props.numItem(this.props.index, val);
}
onChange={this.numItemChangeHandle}

// 与上面功能一样
onChange={(val)=>{this.props.numItem(this.props.index, val)}}
```

// 在子页面往父页面传递参数，只能通过函数调用的方式
子页面：
onChange={this.props.handleValue}

父页面：
handleValue(event){
    this.setState({
        value: event.target.value
    })
}
<Child {...this.props} handleValue={this.handleValue.bind(this)} />

## 传递参数
```js
onChange={this.numItemChangeHandle.bind(this, 参数一，参数二,...)}

//接收
numItemChangeHandle(参数一，参数二, e){

}
```

## react  无状态组件的写法
```js
const HelloBenson = (props) => <div>Hello {props.name}</div>
```

## 可复用组件
```js
 // props验证   https://github.com/facebook/prop-types
 BodyChild.propTypes = {
     userId: PropTypes.number
 }
```

## 组件 Refs
```js
// 原始获取方式：
var mySumbitButton = document.getElementById('submitButton');
ReactDom.findDOMNode(mySumbitButton).style.color = 'red';

// Refs
<input ref="submitButton"/>
this.refs.submitButton
this.refs.submitButton.style.color = 'red'
```

## Mixins
https://github.com/brigand/react-mixin
```js
// minins.js
const MixinLog = {
    componentDidMount(){
        console.log('MixinLog componentDidMount')
    }
    log(){
        console.log('')
    }
}

export default MixinLog;

// 调用
var reactMixin = require('react-mixin');
var Minins = require('minins');
class Foo extends React.Component {
    render: function(){ return <div /> }
}
reactMixin(Foo.prototype, Minins);
```
