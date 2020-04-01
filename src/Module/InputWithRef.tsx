import React, {forwardRef ,useState, useRef} from 'react';

// forwardRef 可以在父组件中操作子组件的 ref 对象
// forwardRef 可以将父组件中的 ref 对象转发到子组件中的 dom 元素上
// 子组件接受 props 和 ref 作为参数
const Child2Ref = forwardRef(Child2);

function Parent() {
    const [number, setNumber] = useState(0);
    const inputRef = useRef<any>();

    return (
        <>
            <Child />
            <button onClick={() => setNumber(number + 1)}>+</button><br />
            <Child2Ref ref={inputRef} number={number}/>
            <button onClick={() => inputRef.current.focus()}>获取input2焦点</button>
        </>
    )
}

function Child() {
    const inputRef = useRef<any>([] as any);

    const getFocus = () => {
        inputRef.current.focus()
    }

    return (
        <>
            <input type="text" ref={inputRef} />
            <button onClick={getFocus}>获得焦点</button>
        </>
    )
}

function Child2(props, ref) {
    return <input type="text" ref={ref} value={props.number}/>
}

export default Parent;