import React from 'react';
import useNumber from './Hooks/useNumber';

function Counter1() {
    const [number, setNumber] = useNumber();

    return <div>
        <button onClick={() => setNumber(number)}>{number}</button>
    </div>
}

export default Counter1;