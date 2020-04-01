import React, {useReducer} from 'react';

const initialState = 0;
// 如果你希望初始状态是一个{number:0}
// 可以在第三个参数中传递一个这样的函数 ()=>({number:initialState})
// 这个函数是一个惰性初始化函数，可以用来进行复杂的计算，然后返回最终的 initialState

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {number: state.number + 1};
        case 'decrement':
            return {number: state.number - 1};
        default:
            throw new Error()
    }
}

function init(initialState) {
    return {number: initialState}
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState, init);

    return (
        <>
            Count: {state.number}
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        </>
    )
}

export default Counter;
