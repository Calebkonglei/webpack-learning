import React, { useState, useLayoutEffect, useEffect } from 'react';

function LayoutEffect() {
    const [color, setColor] = useState('red');

    useLayoutEffect(() => {
        // 浏览器layout之后，painting前执行
        alert(color)
    });

    useEffect(() => {
        // 全部渲染后执行
        console.log('color', color);
    })

    return (
        <>
            <div id="myDiv" style={{ background: color }}>颜色</div>
            <button onClick={() => setColor('red')}>红</button>
            <button onClick={() => setColor('yellow')}>黄</button>
            <button onClick={() => setColor('blue')}>蓝</button>
        </>
    )
}

export default LayoutEffect;