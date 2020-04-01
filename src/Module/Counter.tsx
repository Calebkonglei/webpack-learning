import React, {memo, useState, useCallback, useMemo} from 'react';

function SubCounter({onClick,data}) {
    console.log('SubCounter render');

    return (
        <button onClick={onClick}>{data.number}</button>
    )
}

let oldData;
const SubCounters = memo(SubCounter);

function Counter() {
    const [name,setName] = useState('计数器');
    const [number,setNumber] = useState(0);
    const data = useMemo(() => ({number}), [number]);

    console.log('oldData===newData', oldData, data);
    oldData = data;

    const addClick = useCallback(()=>{
        setNumber(number + 1);
    }, [number]);

    return (
        <>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            <SubCounters data={data} onClick={addClick}/>
        </>
    )
}

export default Counter;