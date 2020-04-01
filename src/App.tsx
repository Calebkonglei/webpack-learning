import React, { Component } from 'react';
import './style.less';
import Button from './components/button';
import Counter from './Module/Counter';
import CounterWithReducer from './Module/CounterWithReducer';
// import ColorWithLayout from './Module/ColorWithLayout';
import InputWithRef from './Module/InputWithRef';
import Numbers from './Module/Numbers';

class App extends Component {
    render() {
        return <div className="main">
            Hello React
            <Button label="Click me" />
            <Counter /><br />
            <CounterWithReducer />
            {/* <ColorWithLayout /> */}
            <InputWithRef /><br />
            <Numbers />
        </div>
    }
}

export default App;