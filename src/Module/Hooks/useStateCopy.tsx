import React from 'react';
import ReactDOM from 'react-dom';

let firstWorkInProgressHook = {memorizedState: null, next: null};
let workInProgressHook;

function useState(initState) {
    let currentHook = workInProgressHook.next ? workInProgressHook.next : {memorizedState: initState, next: null};

    function setState(newState) {
        currentHook.memorizedState = newState;
        render();
    }

    // 这就是为什么 useState 书写顺序很重要的原因
    // 假如某个 useState 没有执行，会导致指针移动出错，数据存取出错

    if (workInProgressHook.next) {
        workInProgressHook = workInProgressHook.next;
    } else {
        workInProgressHook.next = currentHook;
        workInProgressHook = currentHook;
    }

    return [currentHook.memorizedState, setState];
}

function Counter() {
    // 每次组件重新渲染的时候，这里的 useState 都会重新执行
    const [name, setName] = useState('计数器');
    const [number, setNumber] = useState(0);

    return (
        <>
            <p>{name}:{number}</p>
            <button onClick={() => setName('新计数器' + Date.now())}>新计数器</button>
            <button onClick={() => setNumber(number + 1)}>+</button>
        </>
    )
}

function render() {
    workInProgressHook = firstWorkInProgressHook;
    ReactDOM.render(<Counter />, document.getElementById('root'));
}

render()